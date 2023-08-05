import React, { useEffect, useState } from 'react'
import { Router } from './Router'
import { DarkModeProvider, SettingsProvider, WalletProvider } from './context'
import ThemeProvider from './theme'
import './App.less'
import { USER_CONFIG_CACHE } from './types/app_params'
import queryString from 'query-string'
function diffArray(a: HTMLImageElement[], b: HTMLImageElement[]) {
  function diff(a: HTMLImageElement[], b: HTMLImageElement[]) {
    return a.filter((element) => !b.includes(element))
  }
  return [...diff(a, b), ...diff(b, a)]
}
export default function AppInner(): JSX.Element {
  const existingUserCache: USER_CONFIG_CACHE | null = JSON.parse(window.localStorage.getItem('gfx-user-cache'))
  const [init, setInit] = useState<boolean | null>(null)
  useEffect(() => {
    if (existingUserCache === null || existingUserCache?.jwtToken === undefined) {
      setInit(true)
      window.localStorage.setItem(
        'gfx-user-cache',
        JSON.stringify({
          hasDexOnboarded: false,
          hasAggOnboarded: false,
          hasSignedTC: false,
          endpointName: null,
          endpoint: null,
          jwtToken: null
        })
      )
    }

    const values = queryString.parse(window.location?.search)
    if (values.r && !localStorage.getItem('referrer')) {
      localStorage.setItem('referrer', values.r)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement
            if (!image.dataset.src) return
            image.src = image.dataset.src
            // loaded in, stop observing
            observer.unobserve(image)
          }
        })
      },
      {
        rootMargin: '0px 0px 100% 0px',
        threshold: 0
      }
    )

    const images: HTMLImageElement[] = []
    const interval = setInterval(() => {
      const domImages = Array.from(document.querySelectorAll('img[data-src]')) as HTMLImageElement[]
      const intersection = diffArray(images, domImages)
      if (images.length === domImages.length && intersection.length === 0) {
        return
      }
      //cleanup previous images observed - or append new ones
      intersection.forEach((image) => {
        const index = images.indexOf(image)
        if (index !== -1) {
          observer.unobserve(image)
          images.splice(index, 1)
        } else {
          observer.observe(image)
          images.push(image)
        }
      })
    }, 1000)
    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  useEffect(() => console.log('** GFX Application Init **'), [init])

  return (
    existingUserCache !== null && (
      <DarkModeProvider>
        <ThemeProvider>
          <SettingsProvider>
            <WalletProvider>
              <Router />
            </WalletProvider>
          </SettingsProvider>
        </ThemeProvider>
      </DarkModeProvider>
    )
  )
}

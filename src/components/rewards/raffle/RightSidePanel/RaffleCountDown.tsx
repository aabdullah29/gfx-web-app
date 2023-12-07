/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useMemo, useState } from 'react'
import useTimer from '../../../../hooks/useTimer'
import tw from 'twin.macro'
import Button from '../../../twComponents/Button'
import useBoolean from '../../../../hooks/useBoolean'
import { Loader } from '../../../Loader'
import { useConnectionConfig } from '../../../../context'
import { BONK_MINT_PUBKEY, claimPrize, getClaimProgram, getUserClaimableAmount } from './claimPrize'
import { useWallet } from '@solana/wallet-adapter-react'

const Countdown: FC<{ endTimeStamp: number; showRevealModal }> = ({ endTimeStamp, showRevealModal }) => {
  const [isLoading, setIsLoading] = useBoolean(false)
  const raffleEnded = useMemo(() => endTimeStamp < Date.now() / 1000, [endTimeStamp])
  const [buttonDisabled, setButtonDisabled] = useBoolean(false)
  const [prizeClaimable, setPrizeClaimable] = useState(null)
  const { wallet } = useWallet()
  const wal = useWallet()
  const publicKey = useMemo(() => wallet?.adapter?.publicKey, [wallet?.adapter, wallet?.adapter?.publicKey])
  const { connection } = useConnectionConfig()
  const program = getClaimProgram(connection, wal)

  useEffect(() => {
    ;(async () => {
      const prize = await getUserClaimableAmount(publicKey, BONK_MINT_PUBKEY, program)
      setPrizeClaimable(prize)
    })()
  }, [publicKey])

  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const targetDate = new Date(endTimeStamp * 1000).getTime() // Fix: Convert targetDate to number using getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft('Started')
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${days > 0 ? days + `D:` : ``} ${hours > 0 ? hours + 'H:' : ``} ${minutes} Min`)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTimeStamp])

  const fakeLoad = () => {
    setIsLoading.on()
    // CHANGE BONK_MINT_PUBKEY
    claimPrize(program, publicKey, BONK_MINT_PUBKEY)
    setTimeout(setIsLoading.off, 2000)
    showRevealModal.on()
  }

  const buttonText = useMemo(() => {
    if (endTimeStamp > Date.now() / 1000) return timeLeft
    if (prizeClaimable === null) return 'Better Luck Next Time'
    if (prizeClaimable === 0) {
      setButtonDisabled.on()
      return 'Claimed'
    }
    if (prizeClaimable > 0 && raffleEnded) return 'Reveal the Prize'
    return 'Enter Raffle'
  }, [endTimeStamp, raffleEnded, timeLeft, prizeClaimable])

  useEffect(() => {
    if (prizeClaimable > 0) {
      setButtonDisabled.off()
    } else {
      setButtonDisabled.on()
    }
  }, [prizeClaimable, raffleEnded])

  return (
    <Button
      cssClasses={[
        tw`bg-white flex justify-center w-[320px] h-10 text-blue-1 font-semibold text-average`,
        buttonDisabled && tw`opacity-50`
      ]}
      disabled={isLoading || buttonDisabled}
      onClick={fakeLoad}
    >
      {isLoading ? <Loader zIndex={2} color={'#5855FF'} /> : buttonText}
    </Button>
  )
}

export default Countdown

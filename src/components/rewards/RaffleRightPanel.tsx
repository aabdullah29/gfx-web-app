/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import 'styled-components/macro'
import { getRaffleDetails } from '../../api/rewards'
import { RaffleContest } from '../../types/raffle_details'
import { Button } from '../Button'
import PastTopPrizesPopup from './modals/PastTopPrizesPopup'

const RaffleRightPanel = (): ReactElement => {
  const [raffleDetails, setRaffleDetails] = useState<RaffleContest>()
  const [showPastPrize, setShowPastPrize] = useState(false)

  useEffect(() => {
    ;(async () => {
      const raffle: RaffleContest = await getRaffleDetails()
      setRaffleDetails(raffle)
    })()
  }, [])

  const prizeToken = useMemo(() => raffleDetails?.contestPrizes.fixedPrizes.tokenName, [raffleDetails])

  const getPriceUtil = useCallback(
    (denominator: number) => {
      const totalFixedPrice = raffleDetails?.contestPrizes.fixedPrizes.totalFixedPrize
      const price = Number(totalFixedPrice) * (denominator / 100)
      return Math.floor(price) || 0 // Ensure the return is a number, not NaN
    },
    [raffleDetails]
  )

  const getFixedPrizes = useCallback(() => {
    if (!raffleDetails) return { firstPrize: 0, secondPrize: 0, thirdPrize: 0 }
    const priceSplit = raffleDetails?.contestPrizes.fixedPrizes.prizeSplit
    const firstPrize = getPriceUtil(priceSplit[0])
    const secondPrize = getPriceUtil(priceSplit[1])
    const thirdPrize = getPriceUtil(priceSplit[2])
    return { firstPrize, secondPrize, thirdPrize }
  }, [raffleDetails, getPriceUtil])

  const { firstPrize, secondPrize, thirdPrize } = getFixedPrizes()
  const buttonText = useMemo(() => {
    if (!raffleDetails) return 'Enter Raffle'
    const raffleStartTime = raffleDetails?.contestStartTimestamp
    if (raffleStartTime > Date.now() / 1000) return 'Raffle Starts in ${}'
    // const raffleEndTime = raffleDetails?.contestEndTimestamp;
    // if (raffleEndTime < Date.now()) return 'Raffle Ended'

    return 'Enter Raffle'
  }, [raffleDetails])

  const showModals = useMemo(() => {
    if (showPastPrize)
      return <PastTopPrizesPopup showPastPrize={showPastPrize} setShowPastPrize={setShowPastPrize} />
  }, [showPastPrize])

  return (
    <div tw="border h-full w-full">
      {showModals}
      <div tw="text-average font-semibold flex items-center justify-center">{raffleDetails?.contestName}</div>
      <div>
        <div tw="flex items-center w-full justify-center mt-8">
          <PrizeItem prizeAmount={firstPrize} tokenImage={`/img/crypto/${prizeToken}.svg`} />
          <PrizeItem prizeAmount={secondPrize} tokenImage={`/img/crypto/${prizeToken}.svg`} />
          <PrizeItem prizeAmount={thirdPrize} tokenImage={`/img/crypto/${prizeToken}.svg`} />
        </div>

        <div tw="mt-8 text-white font-semibold text-average text-center flex justify-center">
          And 20,000 GOFX Distributed to <br /> winners from #4 to #20!
        </div>

        <div tw="mt-8 text-white font-semibold text-average flex justify-center">Next Raffle Starts In:</div>

        <div tw="flex items-center justify-center mt-2.5">
          <Button cssStyle={tw`flex justify-center w-[320px] h-10 text-blue-1 font-semibold text-average`}>
            {<Countdown timestamp={raffleDetails?.contestStartTimestamp} />}
          </Button>
        </div>
        <div
          onClick={() => setShowPastPrize(true)}
          tw="underline text-white font-semibold text-regular mt-2.5 flex
        justify-center cursor-pointer"
        >
          See Past Top Prices
        </div>
      </div>
    </div>
  )
}

const PrizeItem: FC<{ prizeAmount: number; tokenImage: string }> = ({ prizeAmount, tokenImage }) => (
  <div tw="flex flex-col items-center ml-5 mr-5">
    <div tw="h-20 w-20 rounded-full  bg-black-1">
      <img tw="p-2 h-full w-full" src={tokenImage} />
    </div>
    <div tw="text-white text-regular font-semibold mt-2.5">{prizeAmount.toLocaleString()}</div>
    <div tw="text-white text-regular font-semibold">{'GOFX'}</div>
  </div>
)
export default RaffleRightPanel

const Countdown: FC<{ timestamp: number }> = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const targetDate = new Date(timestamp * 1000).getTime() // Fix: Convert targetDate to number using getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft('Started')
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

        setTimeLeft(`${days} D : ${hours} H : ${minutes} Min`)
      }
    }, 3 * 1000)

    return () => clearInterval(interval)
  }, [timestamp])

  return <div>{timeLeft}</div>
}

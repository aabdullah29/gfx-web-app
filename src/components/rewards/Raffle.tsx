import { useWallet } from '@solana/wallet-adapter-react'
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react'
import tw from 'twin.macro'
import 'styled-components/macro'
import { useDarkMode } from '../../context'
import { Connect } from '../../layouts'
import { getMyRecentWinnings } from '../../api/rewards'
import styled from 'styled-components'
const Wrapper = styled.div`
  .hideScrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`

const Raffle = (): ReactElement => {
  const { wallet } = useWallet()
  const publicKey = useMemo(() => wallet?.adapter?.publicKey, [wallet?.adapter, wallet?.adapter?.publicKey])
  const [myRecentWinnings, setMyRecentWinnings] = useState()

  useEffect(() => {
    // make api call to get raffle info
    ;(async () => {
      const myRecentWinnings = await getMyRecentWinnings()
      setMyRecentWinnings(myRecentWinnings)
    })()
  }, [publicKey])

  const noPrizesSoFar = false
  if (!publicKey) return <RaffleForWalletNotConnected />

  return (
    <>
      <Wrapper tw="w-full h-full">
        {noPrizesSoFar ? <NoPrizesSoFar /> : <MyRecentWinnings myRecentWinnings={myRecentWinnings} />}
      </Wrapper>
    </>
  )
}

const RaffleForWalletNotConnected = (): ReactElement => {
  const { mode } = useDarkMode()
  return (
    <div tw="flex flex-col">
      <div css={[tw`mt-10 flex items-center `]}>
        <img src={`/img/assets/rewardsProgram${mode}.svg`} />
        <div tw="ml-4 font-semibold !text-lg dark:text-grey-5 text-black-4">
          Start earning points and start winning!
        </div>
      </div>
      <div tw="mt-5">
        <Connect customButtonStyle={[tw`w-[520px] !max-w-[520px] !h-[40px]`]} />
      </div>
      <div tw="mt-5 text-regular dark:text-grey-2 text-grey-1 font-semibold">
        To generate points start by trading on our perps platform. The more transactions you do, the more chances
        you have to win our weekly prizes.
      </div>
    </div>
  )
}

const NoPrizesSoFar = (): ReactElement => {
  const { mode } = useDarkMode()
  return (
    <div tw="flex flex-col items-center mt-10">
      <img css={[tw`h-[90px] w-[98px]`]} src={`/img/assets/noPrizes${mode}.svg`} />
      <div tw="text-grey-1 text-regular font-semibold text-center mt-5">
        No prices so far, sell, buy and trade NFTs to start <br /> earning points and start wining!
      </div>
    </div>
  )
}

const MyRecentWinnings: FC<{ myRecentWinnings }> = ({ myRecentWinnings }): ReactElement => (
  <div tw="flex flex-col pt-2">
    <div tw="flex justify-start text-[18px] font-semibold">My Recent Prizes</div>
    <div tw="overflow-y-auto h-[400px]" className="hideScrollbar">
      {myRecentWinnings?.length &&
        myRecentWinnings.map((winning, index) => <RecentWinningRow key={index} winning={winning} />)}
    </div>
  </div>
)
const RecentWinningRow: FC<{ winning }> = ({ winning }): ReactElement => (
  <div tw="flex h-[47px] mt-3.5 items-center">
    <div>
      <img src={`/img/crypto/${winning.currency}.svg`} tw="h-10 w-10" />
    </div>
    <div tw="flex flex-col justify-center ml-3 ">
      <div tw="text-black-4 text-average font-semibold dark:text-grey-5 text-black-4">
        {winning.amount.toLocaleString()} {winning.currency}
      </div>
      <div tw="text-grey-1 text-xs text-regular font-semibold dark:text-grey-2 text-grey-1">{winning.date}</div>
    </div>

    <div tw="ml-auto">
      <img src="/img/assets/Aggregator/Solscan.svg" className="solscan" />
    </div>
  </div>
)
export default Raffle

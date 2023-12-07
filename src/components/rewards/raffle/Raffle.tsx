/* eslint-disable @typescript-eslint/no-unused-vars */
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import 'styled-components/macro'
import { getUserRafflePrizes } from '../../../api/rewards'
import RaffleForWalletNotConnected from './RaffleForWalletConnected'
import NoPrizesSoFar from './RaffleNoPrizesSoFar'
import MyRecentPrizes from './RaffleRecentWinnings'
import TopLinks from '../v2/TopLinks'
import HowItWorksButton from '../v2/HowItWorksButton'
import CombinedRewardsTopLinks from '../v2/CombinedRewardsTopLinks'
import RewardsLeftLayout from '../layout/RewardsLeftLayout'
import RewardsRightLayout from '../layout/RewardsRightLayout'
import RaffleRightPanel from './RightSidePanel/RaffleRightSidePanel'
import tw from 'twin.macro'
import useBreakPoint from '../../../hooks/useBreakPoint'
import { useConnectionConfig } from '../../../context'
import { toPublicKey } from '@metaplex-foundation/js'
import { BONK_MINT_PUBKEY, getUserClaimPDA } from './RightSidePanel/claimPrize'
import { getTokenNameFromMintAddress } from '../../../web3'

function Raffle(): JSX.Element {
  const { wallet } = useWallet()
  const publicKey = useMemo(() => wallet?.adapter?.publicKey, [wallet?.adapter, wallet?.adapter?.publicKey])
  const [userRecentPrizes, setUserRecentPrizes] = useState(null)
  const { isMobile, isTablet } = useBreakPoint()
  const { connection } = useConnectionConfig()

  const getWalletAddressPastPrizes = useCallback(async () => {
    try {
      const pastPrizes = []
      const userPDA = getUserClaimPDA(publicKey, BONK_MINT_PUBKEY) // TODO Find other tokens as well
      const transactionList = await connection.getSignaturesForAddress(userPDA)
      const signatureList = transactionList.map((transaction) => transaction.signature)
      const transactionDetails = await connection.getParsedTransactions(signatureList, {
        maxSupportedTransactionVersion: 0
      })

      transactionList.forEach((transaction, i) => {
        if (!transactionDetails[i].meta?.preTokenBalances[0]?.mint) return
        const preBalance = transactionDetails[i].meta.preTokenBalances
        const postBalance = transactionDetails[i].meta.postTokenBalances
        const mintAddr = transactionDetails[i].meta?.preTokenBalances[0]?.mint
        const balanceChange = preBalance[0].uiTokenAmount.uiAmount - postBalance[0].uiTokenAmount.uiAmount

        const token = getTokenNameFromMintAddress(mintAddr)
        pastPrizes.push({
          timestamp: transaction.blockTime * 1000,
          signature: transaction.signature,
          token,
          amount: balanceChange
        })
      })
      return pastPrizes
    } catch (e) {
      console.log('Error getting past prizes', e)
    }
  }, [publicKey])

  useEffect(() => {
    ;(async () => {
      if (publicKey) {
        const pastPrizes = await getWalletAddressPastPrizes()
        setUserRecentPrizes(pastPrizes)
      }
    })()
  }, [publicKey])

  const noPrizesSoFar = useMemo(() => userRecentPrizes?.length === 0, [publicKey, userRecentPrizes])

  return (
    <>
      <RewardsLeftLayout className={'no-scrollbar '}>
        <CombinedRewardsTopLinks>
          <TopLinks />
          <div css={[tw`flex gap-4 items-center`]}>
            <p css={[tw`hidden min-md:block`]}>Points:&nbsp;0</p>
            <HowItWorksButton
              link={'linkToWinDocs'}
              cssClasses={[(isMobile || isTablet) && tw`rounded-full w-[35px] h-[35px] text-lg font-bold`]}
            >
              {isMobile || isTablet ? '?' : 'How it works'}
            </HowItWorksButton>
          </div>
        </CombinedRewardsTopLinks>

        {!publicKey ? (
          <RaffleForWalletNotConnected />
        ) : noPrizesSoFar ? (
          <NoPrizesSoFar />
        ) : (
          <MyRecentPrizes myRecentPrizes={userRecentPrizes} />
        )}
      </RewardsLeftLayout>
      <RewardsRightLayout cssStyles={[tw`bg-gradient-to-r to-blue-gradient-1 from-primary-gradient-2 `]}>
        <RaffleRightPanel userRecentPrizes={userRecentPrizes} />
      </RewardsRightLayout>
    </>
  )
}

// const Raffle1 = (): ReactElement => {
//   const {wallet} = useWallet()
//   const publicKey = useMemo(() => wallet?.adapter?.publicKey, [wallet?.adapter, wallet?.adapter?.publicKey])
//   const [myRecentWinnings, setMyRecentWinnings] = useState()
//
//   useEffect(() => {
//     // make api call to get raffle info
//     ;(async () => {
//       const myRecentWinnings = await getMyRecentWinnings()
//       setMyRecentWinnings(myRecentWinnings)
//     })()
//   }, [publicKey])
//
//   const noPrizesSoFar = false
//   if (!publicKey) return <RaffleForWalletNotConnected/>
//
//   return (
//     <>
//       <TopLinks/>
//       <Wrapper tw="w-full h-full">
//         {noPrizesSoFar ? <NoPrizesSoFar/> : <MyRecentWinnings myRecentWinnings={myRecentWinnings}/>}
//       </Wrapper>
//     </>
//   )
// }

export default Raffle

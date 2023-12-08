import { useWallet } from '@solana/wallet-adapter-react'
import React, { FC, useState, ReactNode, createContext, useContext, useMemo, useEffect, useCallback } from 'react'
import {
  BONK_MINT_PUBKEY,
  getClaimProgram,
  getUserClaimPDA,
  getUserClaimableAmount
} from '../components/rewards/raffle/RightSidePanel/claimPrize'
import { useConnectionConfig } from './settings'
import { getTokenNameFromMintAddress } from '../web3'
interface IRaffleToggleConfig {
  prizeClaimable: number
  fetchUpdatedUserStats: () => void
  userRecentPrizes: any
}

const RaffleContext = createContext<IRaffleToggleConfig | null>(null)
export const RaffleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { wallet } = useWallet()
  const publicKey = useMemo(() => wallet?.adapter?.publicKey, [wallet?.adapter, wallet?.adapter?.publicKey])
  const wal = useWallet()
  const { connection } = useConnectionConfig()
  const program = getClaimProgram(connection, wal)

  const [prizeClaimable, setPrizeClaimable] = useState(null)
  const [userRecentPrizes, setUserRecentPrizes] = useState(null)

  const fetchUpdatedUserStats = useCallback(async () => {
    console.log('fetching prize claimable and past prize')
    getWalletAddressPastPrizes()
    const prize = await getUserClaimableAmount(publicKey, BONK_MINT_PUBKEY, program)
    setPrizeClaimable(prize)
  }, [publicKey, connection])

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
      setUserRecentPrizes(pastPrizes)
    } catch (e) {
      console.log('Error getting past prizes', e)
    }
  }, [publicKey, connection])

  useEffect(() => {
    if (publicKey) {
      fetchUpdatedUserStats()
      getWalletAddressPastPrizes()
    }
  }, [publicKey, connection])

  return (
    <RaffleContext.Provider
      value={{
        prizeClaimable: prizeClaimable,
        fetchUpdatedUserStats: fetchUpdatedUserStats,
        userRecentPrizes: userRecentPrizes
      }}
    >
      {children}
    </RaffleContext.Provider>
  )
}
export const useRaffleContext = (): IRaffleToggleConfig => {
  const context = useContext(RaffleContext)

  if (!context) {
    throw new Error('Missing nav collapse context')
  }
  return context
}

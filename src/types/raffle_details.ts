export interface RaffleContest {
  contestType: string
  contestId: string
  contestName: string
  contestStartTimestamp: number
  contestEndTimestamp: number
  contestClaimPrizeEnabled: boolean
  contestRafflePointsWeights: ContestRafflePointsWeights
  contestPrizes: IContestPrizes
  contestWinners?: ContestWinner[]
}

interface IContestResults {
  contestPoints: number
  totalPoints: number
  claimedPrize: boolean
  signature: string
  contestRank: number
  prizeType: 'FIXED' | 'RAFFLE'
  prizeShare: number
  prizeAmount: number
  tokenName: string
  tokenMint: string
}

export interface IPrizeWinnings {
  contestId: number
  winnings: IContestResults
}

interface ContestRafflePointsWeights {
  totalPointsWeight: string
  contestPointsWeight: string
}

interface IContestPrizes {
  fixedPrizes: IFixedPrizes
  rafflePrizes?: RafflePrizes
}

export interface IFixedPrizes {
  numPrizes: number
  tokenName: string
  tokenMint: string
  prizeSplit: number[]
  totalFixedPrize: string
}

interface RafflePrizes {
  numPrizes: number
  tokenName: string
  tokenMint: string
  totalRafflePrize: string
}

interface ContestWinner {
  walletAddress: string
  contestPoints: string
  totalPoints: string
  claimedPrize: boolean
  contestRank: string
  prizeType: string
  prizeShare: string
  prizeAmount: string
  tokenName: string
  tokenMint: string
}

export interface RaffleDetails {
  raffleId: string
  prizes: Prize[]
}

interface Prize {
  amount: number
  currency: string
  date: string
}

// If you are expecting an array of RaffleDetails
export interface IPastPrizes {
  raffleDetails: RaffleDetails[]
}

import { SuccessSSLMessage, TransactionErrorMsgSSL } from '../../components'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

interface Message {
  type?: string
  message: string | JSX.Element
}

export type Faq = {
  question: string
  answer: string | JSX.Element
}

export type Pool = {
  index: number
  name: string
  desc: string
}

export type LiquidityAccount = {
  amountDeposited: BN
  createdAt: BN
  lastClaimed: BN
  lastObservedTap?: BN
  mint?: PublicKey
  owner?: PublicKey
  poolRegistry?: PublicKey
  space?: number[]
  totalEarned?: BN
}

export type SSLToken = {
  token: string
  name: string
  address: PublicKey
  assetType?: number
  bump?: number
  mathParams?: any
  mint?: PublicKey
  mintDecimals?: number
  oraclePriceHistories?: number[]
  pad0?: number[]
  pad1?: number[]
  space?: number[]
  status?: number
  totalAccumulatedLpReward?: BN
  totalLiquidityDeposits?: BN
  cappedDeposit?: number
}

export type SSLTableData = {
  apy: string
  fee: number
  volume: number
  volume7D: number
}

export const poolType = {
  stable: {
    index: 3,
    name: 'Stable',
    desc: 'More stable returns.'
  },
  primary: {
    index: 1,
    name: 'Primary',
    desc: 'Medium to high returns.'
  },
  hyper: {
    index: 2,
    name: 'Hyper',
    desc: 'Higher returns with more risk.'
  },
  all: {
    index: 4,
    name: 'All',
    desc: 'Explore all our different pools.'
  }
}

export const ADDRESSES: {
  [network in WalletAdapterNetwork]: SSLToken[]
} = {
  'mainnet-beta': [
    {
      token: 'USDT',
      name: 'USDT Coin',
      address: new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
      cappedDeposit: 125000
    },
    {
      token: 'USDC',
      name: 'USDC coin',
      address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      cappedDeposit: 125000
    },
    {
      token: 'SOL',
      name: 'Solana',
      address: new PublicKey('So11111111111111111111111111111111111111112'),
      cappedDeposit: 100000
    },
    {
      token: 'MSOL',
      name: 'MSOL',
      address: new PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
      cappedDeposit: 100000
    },
    {
      token: 'BONK',
      name: 'BONK',
      address: new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
      cappedDeposit: 75000
    }
  ],
  devnet: [
    {
      token: 'USDT',
      name: 'USDT Coin',
      address: new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
      cappedDeposit: 125000
    },
    {
      token: 'USDC',
      name: 'USDC coin',
      address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      cappedDeposit: 125000
    },
    {
      token: 'SOL',
      name: 'Solana',
      address: new PublicKey('So11111111111111111111111111111111111111112'),
      cappedDeposit: 100000
    },
    {
      token: 'MSOL',
      name: 'MSOL',
      address: new PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
      cappedDeposit: 100000
    },
    {
      token: 'BONK',
      name: 'BONK',
      address: new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
      cappedDeposit: 75000
    }
  ],
  testnet: [
    {
      token: 'USDT',
      name: 'USDT Coin',
      address: new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB')
    },
    {
      token: 'USDC',
      name: 'USDC coin',
      address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    },
    {
      token: 'SOL',
      name: 'Solana',
      address: new PublicKey('So11111111111111111111111111111111111111112')
    },
    {
      token: 'MSOL',
      name: 'MSOL',
      address: new PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So')
    },
    {
      token: 'BONK',
      name: 'BONK',
      address: new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263')
    }
  ]
}

export const faqs = [
  {
    question: 'What is single-sided liquidity?',
    answer: (
      <div>
        Single-sided liquidity is a revolutionary AMM which allows you to deposit a single asset to earn
        auto-compounded yield. The yield is derived from the arbitrage profit from the spread between the quoted
        oracle and pool price and the swap fee.
      </div>
    )
  },
  {
    question: 'How is APY calculated?',
    answer: (
      <div>
        APY is calculated based on the swap fees generated by the liquidity pools. The APY provides an indication
        of the potential returns that LPs might earn over a year. It is calculated on a weekly basis and then
        annualized. For more information see our docs.
      </div>
    )
  },
  {
    question: 'What is the difference between stable, primary, and hyper pools?',
    answer: (
      <div>
        The distinction among stable, primary, and hyper pools lies in the types of assets they hold. Stable pools
        are composed of stablecoins, primary pools house prevalent ecosystem tokens, while hyper pools cater to
        more volatile assets.
      </div>
    )
  },
  {
    question: 'What are the risks?',
    answer: (
      <div>
        The risks associated with single-sided liquidity are price inventory risk which is common for any market
        maker. This risk occurs when the price of the assets used for market making decline in value in excess of
        the fees generated. In periods of high volatility certain pools may become imbalanced. While no actual
        losses occur users may have to wait until the pool rebalances itself to fully withdraw their total earned
        amount.
      </div>
    )
  },
  {
    question: 'How are LP fees distributed?',
    answer: <div>Fees and arbitrage profits are auto-compounded and are earned in the deposited asset.</div>
  }
]

export const ModeOfOperation = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw'
}

export const insufficientSOLMsg = (): Message => ({
  type: 'error',
  message: 'You need minimum of 0.000001 SOL in your wallet to perform this transaction'
})

export const invalidDepositErrMsg = (tokenBalance: number, name: string): Message => ({
  type: 'error',
  message: `Please give valid input from 0.00001 to ${tokenBalance?.toFixed(3)} ${name}`
})

export const invalidWithdrawErrMsg = (tokenBalance: number, name: string): Message => ({
  type: 'error',
  message: `You can withdraw a maximum of ${tokenBalance?.toFixed(3)} ${name}`
})

export const invalidInputErrMsg = (name: string): Message => ({
  type: 'error',
  message: `Please give valid input greater than 0.00001 ${name}`
})

export const genericErrMsg = (error: string): Message => ({
  type: 'error',
  message: error
})

export const sslSuccessfulMessage = (operation: string, price: string | number, name: string): Message => ({
  message: <SuccessSSLMessage operation={operation} amount={price} token={name} />
})

export const sslErrorMessage = (): Message => ({
  type: 'error',
  message: <TransactionErrorMsgSSL />
})

export const TOKEN_NAMES = {
  SOL: 'SOL',
  GOFX: 'GOFX',
  GMT: 'GMT',
  USDT: 'USDT',
  USDC: 'USDC'
}

export const GET_24_CHANGES = '/ssl-apis/get24hChanges'
export const TOTAL_METRICS = 'ssl-apis/getTotalMetrics'
export const IS_WHITELIST = '/wallet-apis/isWhitelist'
export const SSL_CHARTS = '/ssl-apis/charts/prices/'
export const BONK_MINT = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'

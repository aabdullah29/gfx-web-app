import { Fractional } from '../perps/dexterity/types'
import * as anchor from '@project-serum/anchor'
import { MarketType } from '../../../context'

// export const DEX_ID = 'AEWt3M4zHBPXGieh6Y1PXAFnEZpz1pF1EUuUWyXtdkfd'

// export const INSTRUMENTS_ID = '2bEbbbQ9exihNsik8CUyeqN9BsFKWbdjPNhE7a9xDVqy'

// export const FEES_ID = 'C5PSiaCxUk3YpLxYEJ3VRBHBFeV2WbK3xEHPyXMdAozN'

// export const RISK_ID = 'GDQCED2bSKi7fsHFPANQt3vBAFREbAYw7otCxt5rw7sY'

// export const ORDERBOOK_P_ID = 'A83oDxWdJBDE5LdDXDDcZeuZZSQtV1X1YnbFRDHQjBeZ'

export const DEX_ID = '2JyQDmR1dTWizTCxq83tUPqWvuf3NNWwpusoaPqv4zLG'

export const INSTRUMENTS_ID = 'DUppZTUGAKKfpqjCsBLuUHGm8V7Q5jU6wM22y49UEtYB'

export const FEES_ID = '8cwLfjisP5wrbfZe2nmHSW3VoLdCYJzu3FvRqt9oMXNT'

export const RISK_ID = 'GqCTcq7c5RgNxZZXQR9rF96Hk7T3RpTJwS5ExtgX9S1Z'

export const ORDERBOOK_P_ID = 'A83oDxWdJBDE5LdDXDDcZeuZZSQtV1X1YnbFRDHQjBeZ'

export const VAULT_SEED = 'market_vault'

export const FEES_SEED = 'fee_model_config_acct'

export const DERIVATIVE_SEED = 'derivative'

export const TRADER_FEE_ACCT_SEED = 'trader_fee_acct'

export const VALIDATE_ACCOUNT_HEALTH_DISCRIMINANT = new Uint8Array([39, 180, 199, 236, 99, 54, 132, 232])
export const VALIDATE_ACCOUNT_LIQUIDATION_DISCRIMINANT = new Uint8Array([48, 105, 196, 158, 218, 122, 149, 186])
export const CREATE_RISK_STATE_ACCOUNT_DISCRIMINANT = new Uint8Array([200, 248, 111, 36, 67, 124, 215, 7])
export const VALIDATE_ACCOUNT_HEALTH_DISCRIMINANT_LEN = 8
export const VALIDATE_ACCOUNT_LIQUIDATION_DISCRIMINANT_LEN = 1
export const FIND_FEES_DISCRIMINANT = 0
export const FIND_FEES_DISCRIMINANT_LEN = 1
export const MINT_DECIMALS = 6

export const VAULT_MINT = 'Bg2f3jstf2Co4Hkrxsn7evzvRwLbWYmuzaLUPGnjCwAA'

//export const MPG_ID = '7EUw8KH3KHoNNtMrKGswab3gWwM5tBqBbHKZ8eUiSQWP'
//export const MPG_ID = '33dgY7mZmMybc5CKEmnPk9G5T2Njr1oBJTeiG9aVfoRB'
//export const RISK_OUTPUT_REGISTER = '6bsx3FYadj5UaUegNdSFnJ27RrWvHAN9REGq9suNuvDJ'
// export const FEE_OUTPUT_REGISTER = 'GChviJ5JKFzEnnxG2cQvZVTdfGsEEgA4FgcWvVmZFajk'
// export const RISK_MODEL_CONFIG_ACCT = 'F9GZrXtg9Ssk4tDx3CBaWxyVXYin9zYgyJWDrY3FgNAj'
// export const MPG_ID = 'Ft1NJVw1oTdk1DhqSE4cwDqpteMcZQeKraq5vy43Ed9b'

// export const RISK_OUTPUT_REGISTER = 'CVLyxaB5c6cNScbVBHnB9Wg6ux4916N4PfjVhn7cnthz'
// export const FEE_OUTPUT_REGISTER = '8wca9RPSqBURHo2VU2gDaz5pmnYpj2dXPkS88mVdfoTy'
// export const RISK_MODEL_CONFIG_ACCT = '9uEGTZRoDwZa4N1asf1p1pnF4HEuUtG2BZBVY26feBDM'

export const MPG_ID = '9q4HYkhAsjoxFRDAq17hNFBExqT3EeYTqNuxcE9L6Hev'

export const RISK_OUTPUT_REGISTER = '3LhYV1KtryV98x53BxT87VN279YvcQ2Tga8zjcxxig6K'
export const FEE_OUTPUT_REGISTER = '3dqBonHeZCnLDzL2bPrG426G9p5L2Zxaq47M29vJ1wNi'
export const RISK_MODEL_CONFIG_ACCT = 'Bcj7phVjdogznuUNq5oraqFQRByqj28NsZHEff3g1q7y'

export const MPG_ACCOUNT_SIZE = 143864
export const OUT_REGISTER_SIZE = 432

export const PYTH_MAINNET = 'AHtgzX45WTKfkPG53L6WYhGEXwQkN1BVknET3sVsLL8J'

export const PYTH_DEVNET = '38xoQ4oeJCBrcVvca2cGk7iV1dAfrmTR1kmhSCJQ8Jto'

export const PERPS_COLLATERAL = [
  {
    token: 'USDC',
    type: 'perps' as MarketType,
    marketAddress: 'Bg2f3jstf2Co4Hkrxsn7evzvRwLbWYmuzaLUPGnjCwAA',
    pythProduct: 'Crypto.USDT/USD'
  }
  // {
  //   token: 'ETH',
  //   type: 'perps' as MarketType,
  //   marketAddress: 'HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J'
  // },
  // {
  //   token: 'GOFX',
  //   type: 'perps' as MarketType,
  //   marketAddress: 'Bg2f3jstf2Co4Hkrxsn7evzvRwLbWYmuzaLUPGnjCwAA'
  // },
  // {
  //   token: 'USDC',
  //   type: 'perps' as MarketType,
  //   marketAddress: 'AHtgzX45WTKfkPG53L6WYhGEXwQkN1BVknET3sVsLL8J'
  // }
]

//export const MPs = [
//  {
//    id: '8kbdxTuwRbNnGzjgkyNh6P2VjqC6KrkgVjh9pQuKJifz',
//    orderbook_id: 'GJsUqB5wmBUMsfJXJCVyUP5NV9TanwkrLQfsUnqW5uUF',
//    bids: 'F6fZs5XeJPGWJC3LUiAZnS8uvUfSfRAgTBV7cttDc9Fi',
//    asks: 'JA9T2Fd5zpfz8Z6NAyrn2D68kP4PcucGMrzBahcZw1DT',
//    event_queue: '6wQqi6Ud3NNazAin8y4RHffivyMncDG9RciEiei97CSv',
//    tick_size: 100,
//    decimals: 7
//  }
//]

export const MPs = [
  {
    id: 'Bbb84T89tSCDEbTkhp2tMWmod7bZaZ6g51LHgr7LWv4c',
    orderbook_id: 'CmmpoD874B9C3Zix39UccRad16Eo86hSovLd8L1Rcgh7',
    bids: '7YtHJXYriza9eT82QSu7rptF8bhi5hEURoM9Dri8oNdf',
    asks: '5bRfbYtUsv5sgYTTaiEAvH7bGEKZ8MRMU2uaorCZmEBy',
    event_queue: '22d46KWgYoXfuhpC4ZqAbpxuA3Pd6oZCgYQqD5X8ebQE',
    tick_size: 100,
    decimals: 5
  }
]

export const PERPS_FEES = [
  {
    tier: 'Tier',
    stake: 'Stake',
    taker: 'Taker',
    maker: 'Maker'
  },
  {
    tier: '1',
    stake: '100 GOFX',
    taker: '0.05%',
    maker: '0%'
  },
  {
    tier: '2',
    stake: '1,000 GOFX',
    taker: '0.04%',
    maker: '0%'
  },
  {
    tier: '3',
    stake: '10,000 GOFX',
    taker: '0.03%',
    maker: '0%'
  },
  {
    tier: '4',
    stake: '100,000 GOFX',
    taker: '0.02%',
    maker: '0%'
  },
  {
    tier: '5',
    stake: '1,000,000 GOFX',
    taker: '0.01%',
    maker: '0%'
  }
]

export const MAX_FRACTIONAL_M_LENGTH = 17
export const ZERO_FRACTIONAL = new Fractional({ m: new anchor.BN(0), exp: new anchor.BN(0) })
export const ALPHA = new Fractional({ m: new anchor.BN(9), exp: new anchor.BN(1) })
export const BETA = new Fractional({ m: new anchor.BN(2), exp: new anchor.BN(1) })
export const GAMMA = new Fractional({ m: new anchor.BN(1), exp: new anchor.BN(1) })
export const GET_ORDERBOOK = '/perps-apis/getOrderBook'
export const GET_OPEN_ORDERS = '/perps-apis/getAllOpenOrders'

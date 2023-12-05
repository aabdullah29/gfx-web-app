import axios from 'axios'
import { IPastPrizes } from '../../types/raffle_details'
import { localhost } from '../analytics'
import { GET_LATEST_CONTEST } from '../../pages/TradeV3/perps/perpsConstants'

// const getMyRecentWinningsAPI = () => ({
//   data: [
//     {
//       transactionId: 'TXN987654321',
//       date: 'August 27, 2023',
//       amount: 2000,
//       currency: 'USDC',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN123456789',
//       date: 'August 27, 2023',
//       amount: 100000,
//       currency: 'BONK',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN123456789',
//       date: 'August 27, 2023',
//       amount: 100000,
//       currency: 'BONK',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN123456789',
//       date: 'August 27, 2023',
//       amount: 100000,
//       currency: 'BONK',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN123456789',
//       date: 'August 27, 2023',
//       amount: 100000,
//       currency: 'BONK',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN123456789',
//       date: 'August 27, 2023',
//       amount: 100000,
//       currency: 'BONK',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN123456789',
//       date: 'August 27, 2023',
//       amount: 100000,
//       currency: 'BONK',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN123456789',
//       date: 'August 27, 2023',
//       amount: 100000,
//       currency: 'BONK',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN1029384756',
//       date: 'August 27, 2023',
//       amount: 100000,
//       currency: 'GOFX',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN5647382910',
//       date: 'August 27, 2023',
//       amount: 50000,
//       currency: 'BONK',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN0192837465',
//       date: 'August 27, 2023',
//       amount: 2000,
//       currency: 'USDC',
//       transactionType: 'winning'
//     },
//     {
//       transactionId: 'TXN1122334455',
//       date: 'August 27, 2023',
//       amount: 100000,
//       currency: 'GOFX',
//       transactionType: 'winning'
//     }
//   ]
// })

const getRafflePastPrizeAPI = () => ({
  raffleDetails: [
    {
      raffleId: 'Raffle#2',
      prizes: [
        {
          amount: 2000,
          currency: 'USDC',
          date: 'October 4, 2023',
          participants: 45,
          ticketsSold: 312
        },
        {
          amount: 2000,
          currency: 'USDC',
          date: 'October 4, 2023'
        },
        {
          amount: 2000,
          currency: 'USDC',
          date: 'October 4, 2023'
        }
      ]
    },
    {
      raffleId: 'Raffle#1',
      prizes: [
        {
          amount: 2000,
          currency: 'USDC',
          date: 'October 4, 2023',
          participants: 45,
          ticketsSold: 312
        },
        {
          amount: 2000,
          currency: 'USDC',
          date: 'October 4, 2023'
        },
        {
          amount: 2000,
          currency: 'USDC',
          date: 'October 4, 2023'
        }
      ]
    }
  ]
})
export const getMyRecentWinnings = async (): Promise<any> => {
  try {
    const { data } = await axios.get(localhost + GET_LATEST_CONTEST)
    return data
  } catch (err) {
    console.log(err)
    return err
  }
}

export const getRaffleDetails = async (): Promise<any> => {
  try {
    const { data } = await axios.get(localhost + GET_LATEST_CONTEST)
    return data
  } catch (err) {
    console.log(err)
    return err
  }
}

export const getRafflePastPrizes = async (): Promise<IPastPrizes> => {
  try {
    const data = await getRafflePastPrizeAPI()
    return data
  } catch (err) {
    console.log(err)
  }
}

import React, { ReactElement } from 'react'
import tw from 'twin.macro'
import { Connect } from '../../../layouts'
import { useDarkMode } from '../../../context'

const RaffleForWalletNotConnected = (): ReactElement => {
  const { mode } = useDarkMode()
  return (
    <div tw="flex flex-col justify-center items-center  border-solid">
      <div css={[tw`mt-10 flex items-center w-[580px]`]}>
        <img src={`/img/assets/rewardsProgram${mode}.svg`} />
        <div tw="ml-4 font-semibold !text-lg dark:text-grey-5 text-black-4">
          Start earning points and start winning with our Raffle!
        </div>
      </div>
      <div tw="mt-5">
        <Connect customButtonStyle={[tw`w-[580px] !max-w-[580px] !h-[40px]`]} />
      </div>
      <div tw="mt-5 text-regular dark:text-grey-2 text-grey-1 font-semibold w-[580px]">
        To generate points start by trading on our perps platform. The more transactions you do, the more chances
        you have to win our weekly prizes.
      </div>
    </div>
  )
}

export default RaffleForWalletNotConnected

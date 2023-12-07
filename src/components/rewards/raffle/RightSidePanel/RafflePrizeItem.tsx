import React, { FC } from 'react'
import tw from 'twin.macro'
import { numberFormatter } from '../../../../utils'
import useBreakPoint from '../../../../hooks/useBreakPoint'
interface PrizeItemProps {
  prizeAmount: number
  token: string
  position: string
}
const PrizeItem: FC<PrizeItemProps> = ({ prizeAmount, token, position }) => {
  const { isMobile, isTablet } = useBreakPoint()
  return (
    <div tw="flex flex-1 flex-col items-center min-md:gap-2.5 gap-1.25">
      <div tw="w-10 h-10 min-md:h-15 min-md:w-15 rounded-full  bg-black-1 relative flex">
        <img css={[tw`m-auto `]} src={`/img/crypto/${token}.svg`} />
        <img
          css={[tw`w-[21px] h-[24px] min-md:w-[31px] min-md:h-[35px] absolute top-[-8px] left-[-8px]`]}
          src={`/img/assets/win_${position}.svg`}
        />
      </div>
      <div css={[tw`flex font-poppins min-md:flex-col items-center`]}>
        <div tw="text-white font-poppins text-average font-semibold ">{numberFormatter(prizeAmount)}</div>
        {isMobile || isTablet ? <>&nbsp;</> : null}
        <h6 tw="text-white text-average font-semibold">{token}</h6>
      </div>
    </div>
  )
}
export default PrizeItem

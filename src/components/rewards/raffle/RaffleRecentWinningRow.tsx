import React, { FC, ReactElement } from 'react'
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import tw from 'twin.macro'
import { numberFormatter } from '../../../utils'

const RecentPrizeRow: FC<{ prize }> = ({ prize }): ReactElement => {
  if (!prize.signature) return <></>
  return (
    <div>
      <div tw="flex flex-1 h-[47px] items-center gap-3">
        <img src={`/img/crypto/${prize.token}.svg`} tw="h-10 w-10" />
        <div tw="flex flex-col justify-center">
          <p tw="text-black-4 text-average font-semibold dark:text-grey-5 text-black-4 text-justify">
            {numberFormatter(prize.amount)} {prize.token}
          </p>
          <p tw="text-grey-1 text-xs text-regular font-semibold dark:text-grey-2 text-grey-1 ">
            {new Date(prize?.timestamp).toLocaleString()}
          </p>
        </div>

        {prize.signature && (
          <div tw="ml-auto cursor-pointer">
            <a href={`https://solscan.io/tx/${prize.signature}`} target="_blank" rel="noreferrer">
              <img src="/img/assets/Aggregator/Solscan.svg" className="solscan" css={[tw`ml-auto`]} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
export default RecentPrizeRow

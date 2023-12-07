import React, { FC, ReactElement } from 'react'
import RecentPrizeRow from './RaffleRecentWinningRow'
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import tw from 'twin.macro'
const MyRecentPrizes: FC<{ myRecentPrizes }> = ({ myRecentPrizes: myRecentPrizes }): ReactElement => (
  <div tw="flex justify-center flex-col pt-2 w-full mt-3.75 gap-3.75 pb-3.75 ">
    <div>
      <h3 tw="mb-0 text-average font-poppins font-semibold">My Recent Prizes</h3>
    </div>
    <div tw="flex flex-col overflow-y-auto max-h-[330px] gap-3.75" className="hideScrollbar">
      {myRecentPrizes?.length &&
        myRecentPrizes.map((prize, index) => <RecentPrizeRow key={index} prize={prize} />)}
    </div>
  </div>
)

export default MyRecentPrizes

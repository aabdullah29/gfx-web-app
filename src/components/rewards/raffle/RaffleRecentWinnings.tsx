import React, { FC, ReactElement } from 'react'
import RecentWinningRow from './RaffleRecentWinningRow'
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import tw from 'twin.macro'
const MyRecentWinnings: FC<{ myRecentWinnings }> = ({ myRecentWinnings }): ReactElement => (
  <div tw="flex justify-center flex-col pt-2 w-full mt-3.75 gap-3.75 pb-3.75 ">
    <div>
      <h3 tw="mb-0 text-average font-semibold">My Recent Prizes</h3>
    </div>
    <div
      tw="flex flex-col overflow-y-auto max-h-[330px] gap-3.75 absolute bottom-0 w-[56.5%]"
      className="hideScrollbar"
    >
      {myRecentWinnings?.length &&
        myRecentWinnings.map((winning, index) => <RecentWinningRow key={index} winning={winning} />)}
    </div>
  </div>
)

export default MyRecentWinnings

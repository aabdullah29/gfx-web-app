import React, { FC, useMemo } from 'react'
import styled from 'styled-components'
import { MainButton } from '../../../components'
import { useMarket, useOrder } from '../../../context'

const BUTTON = styled(MainButton)`
  width: 100%;
`

export const PlaceOrder: FC = () => {
  const { getAskFromSymbol, selectedMarket } = useMarket()
  const { order } = useOrder()

  const asset = useMemo(() => getAskFromSymbol(selectedMarket.symbol), [getAskFromSymbol, selectedMarket])
  const buttonText = useMemo(() => `${order.side === 'buy' ? 'Buy' : 'Sell'} ${asset}`, [asset, order.side])

  return (
    <div>
      {order.price > 0 && <span>You will receive</span>}
      <BUTTON status="initial">
        <span>{buttonText}</span>
      </BUTTON>
    </div>
  )
}

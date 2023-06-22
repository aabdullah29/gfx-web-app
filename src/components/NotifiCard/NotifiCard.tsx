import React, { FC } from 'react'
import '@notifi-network/notifi-react-card/dist/index.css'

import { SolanaNotifiContextWrapper } from '../../context'
import './NotifiCard.css'
import { SolanaCard } from './SolanaCard'

export const NotifiCard: FC = () => (
  <SolanaNotifiContextWrapper>
    <SolanaCard />
  </SolanaNotifiContextWrapper>
)

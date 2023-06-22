import React from 'react'
import { SolanaFrontendClient } from './SolanaFrontendClient'

enum ESupportedViews {
  Solana = 'Solana'
}

const supportedViews: Record<ESupportedViews, React.ReactNode> = {
  [ESupportedViews.Solana]: <SolanaFrontendClient />
}

const FrontendClient: React.FC = () => {
  const [view, setView] = React.useState<React.ReactNode>(<SolanaFrontendClient />)

  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as ESupportedViews
    const v = supportedViews[selected]
    if (v === undefined) {
      throw new Error('Unsupported type')
    }

    setView(v)
  }

  return (
    <div className="container">
      <select onChange={handleViewChange}>
        {Object.keys(supportedViews).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      {view}
    </div>
  )
}

export default FrontendClient

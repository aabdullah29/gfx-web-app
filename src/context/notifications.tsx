import React, { PropsWithChildren, useMemo } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletConnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { NotifiContext } from '@notifi-network/notifi-react-card'
import { MemoProgramHardwareLoginPlugin } from '@notifi-network/notifi-solana-hw-login'
import '@notifi-network/notifi-react-card/dist/index.css'

export const SolanaNotifiContextWrapper: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const { connection } = useConnection()
  const { wallet, sendTransaction, signMessage } = useWallet()
  const adapter = useMemo(() => wallet?.adapter, [wallet?.adapter])
  const publicKey = useMemo(() => adapter?.publicKey?.toBase58() ?? null, [adapter?.publicKey])
  const hwLoginPlugin = useMemo(
    () =>
      new MemoProgramHardwareLoginPlugin({
        walletPublicKey: publicKey ?? '',
        connection,
        sendTransaction
      }),
    [publicKey, connection, sendTransaction]
  )

  return (
    <div>
      {publicKey && signMessage ? (
        <NotifiContext
          dappAddress={`L33FPEVISWP2U3KT7J9KG2E7H70JCXYD`}
          walletBlockchain="SOLANA"
          env="Production"
          walletPublicKey={publicKey}
          hardwareLoginPlugin={hwLoginPlugin}
          signMessage={signMessage}
        >
          <WalletConnectButton />
          {children}
        </NotifiContext>
      ) : (
        <WalletMultiButton />
      )}
    </div>
  )
}

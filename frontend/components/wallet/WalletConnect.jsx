import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Connector } from 'wagmi'

const WalletConnect = () => {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Filter out to only use MetaMask connector
  const metamaskConnector = connectors.find((connector) => connector.name === 'MetaMask')

  return (
    <div className="flex items-center">
      {account.status === 'connected' ? (
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 text-white bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition duration-200"
        >
          {account.addresses[0].slice(0, 6)}...{account.addresses[0].slice(-4)}
        </button>
      ) : (
        <button
          onClick={() => metamaskConnector && connect({ connector: metamaskConnector })}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition duration-200"
        >
          Connect Wallet
        </button>
      )}
    </div>

  )
}

export default WalletConnect
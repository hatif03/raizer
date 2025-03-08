'use client'

import WalletConnect from "../components/wallet/WalletConnect"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <main className="flex flex-col items-center gap-8">
        <div className="text-3xl font-bold text-center">Educhain Unitour Starter Template</div>
        <WalletConnect />
      </main>
    </div>
  )
}
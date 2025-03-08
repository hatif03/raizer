import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { headers } from "next/headers"
import { cookieToInitialState } from "wagmi"
import { Providers } from "../components/wallet/providers"
import { getConfig } from "../components/wallet/wagmi"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata = {
  title: "Educhain Unitour Starter Template",
  description: "Use it to make cook dapps on Educhain"
}

export default async function RootLayout({ children }) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  )

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  )
}

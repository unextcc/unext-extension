import React, { useState } from "react"

import App from "~App"
import SettingsContextProvider from "~store/settings-context"
import TransactionContextProvider from "~store/transaction-context"
import WalletContextProvider from "~store/wallet-context"

import "./style.css"

import type { CHAIN_CONFIG_TYPE } from "~config/chainConfig"
import type { WEB3AUTH_NETWORK_TYPE } from "~config/web3AuthNetwork"
import { Web3AuthProvider } from "~store/web3auth-context"

function IndexPopup(): JSX.Element {
  const [web3AuthNetwork, setWeb3AuthNetwork] =
    useState<WEB3AUTH_NETWORK_TYPE>("mainnet")
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("mainnet")

  return (
    <Web3AuthProvider web3AuthNetwork={web3AuthNetwork} chain={chain}>
      <SettingsContextProvider>
        <WalletContextProvider>
          <TransactionContextProvider>
            <App />
          </TransactionContextProvider>
        </WalletContextProvider>
      </SettingsContextProvider>
    </Web3AuthProvider>
  )
}

export default IndexPopup

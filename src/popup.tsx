import React, { useState } from "react"

import App from "~App"
import SettingsContextProvider from "~store/settings-context"
import TransactionContextProvider from "~store/transaction-context"
import WalletContextProvider from "~store/wallet-context"

import "./style.css"

import type { CHAIN_CONFIG_TYPE } from "~config/chainConfig"
import type { WEB3AUTH_NETWORK_TYPE } from "~config/web3AuthNetwork"
import { Web3AuthProvider } from "~store/web3auth-context"
import { Web3TKContextProvider } from "~store/web3tk-context"

function IndexPopup(): JSX.Element {
  return (
    <Web3TKContextProvider>
      <SettingsContextProvider>
        <WalletContextProvider>
          <TransactionContextProvider>
            <App />
          </TransactionContextProvider>
        </WalletContextProvider>
      </SettingsContextProvider>
    </Web3TKContextProvider>
  )
}

export default IndexPopup

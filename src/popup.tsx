import React from "react"

import App from "~App"
import SettingsContextProvider from "~store/settings-context"
import TransactionContextProvider from "~store/transaction-context"
import WalletContextProvider from "~store/wallet-context"

import "./style.css"

function IndexPopup(): JSX.Element {
  return (
    <SettingsContextProvider>
      <WalletContextProvider>
        <TransactionContextProvider>
          <App />
        </TransactionContextProvider>
      </WalletContextProvider>
    </SettingsContextProvider>
  )
}

export default IndexPopup

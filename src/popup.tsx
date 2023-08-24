import App from "~App"
import SettingsContextProvider from "~store/settings-context"
import TransactionContextProvider from "~store/transaction-context"
import WalletContextProvider from "~store/wallet-context"

import "./style.css"

import { Web3AuthProvider } from "~store/web3auth-context"

function IndexPopup(): JSX.Element {
  return (
    <Web3AuthProvider>
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

import React from "react"
import SettingsContextProvider from "~store/settings-context";
import WalletContextProvider from "~store/wallet-context";
import Settings from "~components/Settings/Settings";

function IndexOptions() {
  return (
    <SettingsContextProvider>
      <WalletContextProvider>
        <Settings />
      </WalletContextProvider>
    </SettingsContextProvider>
  )
}

export default IndexOptions

import React from "react";
import App from "~App";
import SettingsContextProvider from "~store/settings-context";
import WalletContextProvider from "~store/wallet-context";

function IndexPopup(): JSX.Element {
  return (
    <SettingsContextProvider>
      <WalletContextProvider>
        <App />
      </WalletContextProvider>
    </SettingsContextProvider>
  );
}

export default IndexPopup;

import React from "react";
import App from "~App";
import SettingsContextProvider from "~store/settings-context";

function IndexPopup(): JSX.Element {
  return (
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
  );
}

export default IndexPopup;

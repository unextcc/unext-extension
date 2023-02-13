import React, { createContext, useState } from "react";
import { useStorage } from "@plasmohq/storage/dist/hook";

// Declare settings context type
type SettingsContextType = {
  shownPage: string;
  isWalletConfigured: boolean;
  lockPassword: string;
  lockPasswordHandler: (password: string) => void;
  shownPageHandler: (page: string) => void;
}

interface Props {
  children?: React.ReactNode;
}

export const SettingsContext = createContext<SettingsContextType>({
  isWalletConfigured: false,
  lockPassword: "",
  shownPage: "",
  lockPasswordHandler: (password: string) => {},
  shownPageHandler: (page: string) => {}
})

const SettingsContextProvider: React.FC<Props> = (props) => {
  // Init storage
  const [settings, setSettings, {setRenderValue, setStoreValue, remove}] = useStorage(
    "unext-settings",
    (v) => v === undefined ? {
      shownPage: "landing",
    } : v);

  // Define settings states
  const [lockPassword, setLockPassword] = useState<string>("");
  const [isWalletConfigured, setIsWalletConfigured] = useState<boolean>(false);


  const lockPasswordHandler = (password: string) => {
    setLockPassword(password);
  };

  const shownPageHandler = async (page: string) => {
    await setSettings({shownPage: page});
  };

  const settingsContextValue: SettingsContextType = {
    isWalletConfigured: isWalletConfigured,
    lockPassword: lockPassword,
    shownPage: settings.shownPage,
    lockPasswordHandler: lockPasswordHandler,
    shownPageHandler: shownPageHandler
  };

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;

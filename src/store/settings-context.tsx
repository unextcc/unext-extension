import React, { createContext, useState } from "react";
import { useStorage } from "@plasmohq/storage/dist/hook";

// Declare settings context type
type SettingsContextType = {
  shownPage: string;
  lockPassword: string;
  lockPasswordHandler: (password: string) => void;
  shownPageHandler: (page: string) => void;
}

interface Props {
  children?: React.ReactNode;
}

export const SettingsContext = createContext<SettingsContextType>({
  lockPassword: "",
  shownPage: "",
  lockPasswordHandler: (password: string) => {},
  shownPageHandler: (page: string) => {}
})

const SettingsContextProvider: React.FC<Props> = (props) => {
  // Init storage
  const [shownPage, setShownPage] = useState<string>("dashboard");

  // Define lock password
  const [lockPassword, setLockPassword] = useStorage<string>(
    "lock-password", (v) => typeof v === "undefined" ? "": v
  );

  const lockPasswordHandler = async (password: string) => {
    await setLockPassword(password);
  };

  const shownPageHandler = async (page: string) => {
    await setShownPage(page);
  };

  const settingsContextValue: SettingsContextType = {
    lockPassword: lockPassword,
    shownPage: shownPage,
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

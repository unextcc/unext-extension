import React, { createContext, useState } from "react";
import { useStorage } from "@plasmohq/storage/hook";

// Declare settings context type
type SettingsContextType = {
  shownPage: string;
  lockPassword: {password: string; timeStamp: number};
  lockPasswordRemove: () => void
  lockPasswordHandler: (password: string, timeStamp: number) => void;
  shownPageHandler: (page: string) => void;
}

interface Props {
  children?: React.ReactNode;
}

export const SettingsContext = createContext<SettingsContextType>({
  lockPassword: {password: '', timeStamp: 0},
  lockPasswordRemove: () => {},
  shownPage: "",
  lockPasswordHandler: (password: string) => {},
  shownPageHandler: (page: string) => {}
})

const SettingsContextProvider: React.FC<Props> = (props) => {
  // Define lock password
  const [lockPassword, setLockPassword, {remove}] = useStorage(
    "lock-password", (v) => typeof v === "undefined" ? "": v
  );

  // Init storage
  const [shownPage, setShownPage] = useState<string>("settings");

  const lockPasswordHandler = async (password: string, timeStamp: number) => {
    await setLockPassword({password: password, timeStamp: timeStamp});
  };

  const shownPageHandler = async (page: string) => {
    await setShownPage(page);
  };

  const settingsContextValue: SettingsContextType = {
    lockPassword: lockPassword,
    lockPasswordRemove: remove,
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

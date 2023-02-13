import React, { createContext, useEffect, useState } from "react";

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
  shownPage: "landing",
  lockPasswordHandler: (password: string) => {},
  shownPageHandler: (page: string) => {}
})

const SettingsContextProvider: React.FC<Props> = (props) => {
  // Define settings states
  const [lockPassword, setLockPassword] = useState<string>("");
  const [isWalletConfigured, setIsWalletConfigured] = useState<boolean>(true);
  const [shownPage, setShownPage] = useState<string>("");

  const lockPasswordHandler = (password: string) => {
    setLockPassword(password);
  };

  const shownPageHandler = (page: string) => {
    console.log(shownPage);
    setShownPage(page);
  };

  useEffect(() => {
    if (!isWalletConfigured) {
      setShownPage('landing');
    } else {
      setShownPage('landing');
    }
  }, [isWalletConfigured]);

  const settingsContextValue: SettingsContextType = {
    isWalletConfigured: isWalletConfigured,
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

import React, { useContext, useEffect } from "react";
import { SettingsContext } from "~store/settings-context";
import { Container, Grid } from "@mui/material";
import LockPassword from "~components/LockPassword/LockPassword";
import Landing from "~components/Landing/Landing";
import ConfigureWallet from "~components/Landing/ConfigureWallet";
import { WalletContext } from "~store/wallet-context";
import Settings from "~components/Settings/Settings";
import Dashboard from "~components/Dashboard/Dashboard";
import settings from "~components/Settings/Settings";
import CreateNewWallet from "~components/Landing/CreateNewWallet";
import Transactions from "~components/Transaction/Transactions";


const App = () => {
  const settingsContext = useContext(SettingsContext);
  const walletContext = useContext(WalletContext);

  let isLockPasswordSet = settingsContext.lockPassword.password !== '';

  const shownPageIgnoreList: string[] = [
    "configureWallet","createNewWallet","importWallet"
  ]

  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Grid
        container
        border={0}
        padding={1}
        minWidth={375}
        maxWidth={720}
        height={580}
      >
        {
          !walletContext.isWalletConfigured &&
          !shownPageIgnoreList.includes(settingsContext.shownPage) ? <Landing /> :
            !isLockPasswordSet ? <LockPassword /> :
            settingsContext.shownPage === 'configureWallet' && <ConfigureWallet /> ||
            settingsContext.shownPage === 'createNewWallet' && <CreateNewWallet /> ||
            settingsContext.shownPage === 'dashboard' && <Dashboard /> ||
            settingsContext.shownPage === 'transactions' && <Transactions /> ||
            settingsContext.shownPage === 'settings' && <Settings />
        }
      </Grid>
    </Container>
  );
};

export default App;

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

const App = () => {
  const settingsContext = useContext(SettingsContext);
  const walletContext = useContext(WalletContext);

  console.log(settingsContext.lockPassword.password);

  const isLockPasswordSet =
    settingsContext.lockPassword.password !== undefined && settingsContext.lockPassword.password !== '';


  console.log(isLockPasswordSet);

  const shownPageIgnoreList: string[] = [
    "configureWallet","createNewWallet","importWallet"
  ]

  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Grid
        container
        margin={0}
        border={0}
        spacing={0}
        padding={1}
        minWidth={375}
        maxWidth={720}
        minHeight={580}
        maxHeight={1080}
      >
        {
          !walletContext.isWalletConfigured &&
          !shownPageIgnoreList.includes(settingsContext.shownPage) ? <Landing /> :
            (!isLockPasswordSet && settingsContext.lockPassword.password !== undefined) ? <LockPassword /> :
            settingsContext.shownPage === 'configureWallet' && <ConfigureWallet /> ||
            settingsContext.shownPage === 'createNewWallet' && <CreateNewWallet /> ||
            settingsContext.shownPage === 'dashboard' && <Dashboard /> ||
            settingsContext.shownPage === 'settings' && <Settings />
        }
      </Grid>
    </Container>
  );
};

export default App;

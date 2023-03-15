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
import ShowPrivateKey from "~components/Settings/ShowPrivateKey";
import Logout from "~components/Settings/Logout";
import LockPasswordTtl from "~components/Settings/LockPasswordTtl";


const App = () => {
  const settingsContext = useContext(SettingsContext);
  const walletContext = useContext(WalletContext);

  console.log(settingsContext.lockPasswordTimeToLive);

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
            settingsContext.shownPage === 'settings' && <Settings /> ||
            settingsContext.shownPage === 'showPrivateKey' && <ShowPrivateKey /> ||
            settingsContext.shownPage === 'logout' && <Logout /> ||
            settingsContext.shownPage === 'lockPasswordTtl' && <LockPasswordTtl />
        }
      </Grid>
    </Container>
  );
};

export default App;

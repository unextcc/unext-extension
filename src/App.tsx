import { Container, Grid } from "@mui/material"
import React, { useContext } from "react"

import Account from "~components/Account/Account"
import AccountMATIC from "~components/Account/AccountMATIC"
import AccountUSDC from "~components/Account/AccountUSDC"
import Dashboard from "~components/Dashboard/Dashboard"
import ConfigureWallet from "~components/Landing/ConfigureWallet"
import CreateNewWallet from "~components/Landing/CreateNewWallet"
import ImportWallet from "~components/Landing/ImportWallet"
import Landing from "~components/Landing/Landing"
import LockPassword from "~components/LockPassword/LockPassword"
import ChangeWalletPassword from "~components/Settings/ChangeWalletPassword"
import LockPasswordTtl from "~components/Settings/LockPasswordTtl"
import Logout from "~components/Settings/Logout"
import Settings from "~components/Settings/Settings"
import settings from "~components/Settings/Settings"
import ShowPrivateKey from "~components/Settings/ShowPrivateKey"
import TransactionDetail from "~components/Transaction/TransactionDetail"
import Transactions from "~components/Transaction/Transactions"
import { SettingsContext } from "~store/settings-context"
import { WalletContext } from "~store/wallet-context"

const App = () => {
  const settingsContext = useContext(SettingsContext)
  const walletContext = useContext(WalletContext)

  let isLockPasswordSet = settingsContext.lockPassword.password !== ""

  const shownPageIgnoreList: string[] = [
    "configureWallet",
    "createNewWallet",
    "importWallet"
  ]

  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Grid
        container
        border={0}
        padding={1}
        minWidth={375}
        maxWidth={720}
        height={580}>
        {!walletContext.isWalletConfigured &&
        !shownPageIgnoreList.includes(settingsContext.shownPage) ? (
          <Landing />
        ) : !isLockPasswordSet ? (
          <LockPassword />
        ) : (
          (settingsContext.shownPage === "configureWallet" && (
            <ConfigureWallet />
          )) ||
          (settingsContext.shownPage === "createNewWallet" && (
            <CreateNewWallet />
          )) ||
          (settingsContext.shownPage === "dashboard" && <Dashboard />) ||
          (settingsContext.shownPage === "transactions" && <Transactions />) ||
          (settingsContext.shownPage === "settings" && <Settings />) ||
          (settingsContext.shownPage === "showPrivateKey" && (
            <ShowPrivateKey />
          )) ||
          (settingsContext.shownPage === "importWallet" && <ImportWallet />) ||
          (settingsContext.shownPage === "logout" && <Logout />) ||
          (settingsContext.shownPage === "lockPasswordTtl" && (
            <LockPasswordTtl />
          )) ||
          (settingsContext.shownPage === "changeWalletPassword" && (
            <ChangeWalletPassword />
          )) ||
          (settingsContext.shownPage === "account" && <Account />) ||
          (settingsContext.shownPage === "accountUSDC" && <AccountUSDC />) ||
          (settingsContext.shownPage === "accountMATIC" && <AccountMATIC />) ||
          (settingsContext.shownPage === "transactionDetail" && (
            <TransactionDetail />
          ))
        )}
      </Grid>
    </Container>
  )
}

export default App

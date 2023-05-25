import { CircularProgress, Container, Grid } from "@mui/material"
import React, { useContext } from "react"

import Account from "~components/Account/Account"
import AccountMATIC from "~components/Account/AccountMATIC"
import AccountUSDC from "~components/Account/AccountUSDC"
import Add from "~components/Actions/Add"
import Convert from "~components/Actions/Convert"
import More from "~components/Actions/More"
import Request from "~components/Actions/Request"
import Send from "~components/Actions/Send"
import SpendPage from "~components/Actions/Spend"
import Dashboard from "~components/Dashboard/Dashboard"
import Spend from "~components/Dashboard/Spend"
import ConfigureWallet from "~components/Landing/ConfigureWallet"
import CreateNewWallet from "~components/Landing/CreateNewWallet"
import ImportWallet from "~components/Landing/ImportWallet"
import Landing from "~components/Landing/Landing"
import LockPassword from "~components/LockPassword/LockPassword"
import ChangeWalletPassword from "~components/Settings/ChangeWalletPassword"
import LockPasswordTtl from "~components/Settings/LockPasswordTtl"
import Logout from "~components/Settings/Logout"
import RequirePasswordWhenSend from "~components/Settings/RequirePasswordSend"
import Settings from "~components/Settings/Settings"
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
    <React.Fragment>
      <Container style={{ margin: 0, padding: 0 }}>
        <Grid
          container
          border={0}
          padding={1}
          minWidth={375}
          maxWidth={720}
          height={580}>
          {/* first check if wallet is loaded */}
          {walletContext.isWalletConfiguredLoaded ? (
            /* if wallet is loaded, check if wallet is configured  */
            walletContext.isWalletConfigured ? (
              /* if wallet is loaded & configured, check if wallet is locked */
              isLockPasswordSet ? (
                /* if wallet is loaded, configred & is NOT locked, load pages */
                (settingsContext.shownPage === "dashboard" && <Dashboard />) ||
                (settingsContext.shownPage === "transactions" && (
                  <Transactions />
                )) ||
                (settingsContext.shownPage === "settings" && <Settings />) ||
                (settingsContext.shownPage === "showPrivateKey" && (
                  <ShowPrivateKey />
                )) ||
                (settingsContext.shownPage === "logout" && <Logout />) ||
                (settingsContext.shownPage === "lockPasswordTtl" && (
                  <LockPasswordTtl />
                )) ||
                (settingsContext.shownPage === "changeWalletPassword" && (
                  <ChangeWalletPassword />
                )) ||
                (settingsContext.shownPage === "requirePasswordWhenSend" && (
                  <RequirePasswordWhenSend />
                )) ||
                (settingsContext.shownPage === "account" && <Account />) ||
                (settingsContext.shownPage === "accountUSDC" && (
                  <AccountUSDC />
                )) ||
                (settingsContext.shownPage === "accountMATIC" && (
                  <AccountMATIC />
                )) ||
                (settingsContext.shownPage === "transactionDetail" && (
                  <TransactionDetail />
                )) ||
                (settingsContext.shownPage === "importWallet" && (
                  <ImportWallet />
                )) ||
                (settingsContext.shownPage === "add" && <Add />) ||
                (settingsContext.shownPage === "convert" && <Convert />) ||
                (settingsContext.shownPage === "spend" && <SpendPage />) ||
                (settingsContext.shownPage === "send" && <Send />) ||
                (settingsContext.shownPage === "request" && <Request />) ||
                (settingsContext.shownPage === "more" && <More />)
              ) : (
                /* if wallet is loaded, configred & is locked, load lock password page */
                <LockPassword />
              )
            ) : /* if wallet is NOT configured & loaded, check if shown page is in ignore list & load the pages*/
            shownPageIgnoreList.includes(settingsContext.shownPage) ? (
              (settingsContext.shownPage === "configureWallet" && (
                <ConfigureWallet />
              )) ||
              (settingsContext.shownPage === "createNewWallet" && (
                <CreateNewWallet />
              )) ||
              (settingsContext.shownPage === "importWallet" && <ImportWallet />)
            ) : (
              /* if wallet is NOT configured, loaded & NOT in ignore list, load landing page */
              <Landing />
            )
          ) : (
            /* Show wallet is loading*/
            <Grid
              container
              item
              xs={12}
              display="flex"
              flexDirection="row"
              alignItems="center"
              textAlign="center"
              height="100%">
              <Grid width="100%">
                <CircularProgress />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default App

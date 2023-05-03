import {
  ArrowDownwardOutlined,
  MoreHorizOutlined,
  ShoppingCartCheckout
} from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import { Grid, IconButton, Paper, Tab, Tabs, Typography } from "@mui/material"
import type React from "react"
import { useContext } from "react"

import AccountBalanceItem from "~components/Account/AccountBalanceItem"
import RecentTransactions from "~components/Dashboard/RecentTransactions"
import Spend from "~components/Dashboard/Spend"
import TabPanel from "~components/Dashboard/TabPanel"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { config } from "~contents/config"
import { useWeb3TokenBalance } from "~hooks/use-web3"
import { WalletContext } from "~store/wallet-context"

interface Props {
  children?: React.ReactNode
}

const iconButtonStyle = {
  color: "info",
  size: "small",
  sx: { border: 1, marginBottom: 1 }
}

const Account = (props: Props) => {
  const walletContext = useContext(WalletContext)
  const wallets = walletContext.wallets[0]

  const {
    balance: balanceUSDC,
    isError: isErrorUSDC,
    isLoaded: isLoadedUSDC,
    error: errorUSDC
  } = useWeb3TokenBalance(
    // @ts-ignore
    wallets[0].address,
    config.tokens[0].contractAddress,
    config.tokens[0].decimals,
    config.tokens[0].providerUrl
  )

  const {
    balance: balanceMATIC,
    isError: isErrorMATIC,
    isLoaded: isLoadedMATIC,
    error: errorMATIC
  } = useWeb3TokenBalance(
    // @ts-ignore
    wallets[0].address,
    config.cryptoTokens[0].contractAddress,
    config.cryptoTokens[0].decimals,
    config.cryptoTokens[0].providerUrl
  )

  return (
    <Grid container item xs={12}>
      <HeaderLight title={"Accounts"} />

      <Grid
        container
        item
        height={480}
        marginTop={7.5}
        display="block"
        alignItems="flex-start">
        <Grid container item xs={12} display="flex" spacing={1}>
          <AccountBalanceItem
            title={"USD"}
            balance={isLoadedUSDC ? balanceUSDC : "Loading..."}
            accountPageName="accountUSDC"
          />
          <AccountBalanceItem
            title={"MATIC"}
            balance={isLoadedMATIC ? balanceMATIC : "Loading"}
            accountPageName="accountMATIC"
          />
        </Grid>

        <Grid
          container
          item
          xs={12}
          display="flex"
          alignItems="flex-start"
          justifyContent={"flex-start"}>
          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <AddIcon color={"info"} />
            </IconButton>
            <Typography fontSize={12} textAlign="left" paddingLeft={1}>
              Add
            </Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <AutorenewIcon color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left">
              Convert
            </Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <ShoppingCartCheckout color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left" paddingLeft={0.5}>
              Spend
            </Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <ArrowDownwardOutlined color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left">
              Request
            </Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <MoreHorizOutlined color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left" paddingLeft={0.7}>
              More
            </Typography>
          </Grid>

          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>

      <Footer />
    </Grid>
  )
}
export default Account

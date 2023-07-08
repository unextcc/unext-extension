import {
  ArrowDownwardOutlined,
  MoreHorizOutlined,
  ShoppingCartCheckout
} from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import {
  Alert,
  Box,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography
} from "@mui/material"
import { AssetTransfersCategory } from "alchemy-sdk"
import React, { useContext } from "react"

import AccountBalanceItem from "~components/Account/AccountBalanceItem"
import Spend from "~components/Dashboard/Spend"
import TabPanel from "~components/Dashboard/TabPanel"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import RecentTransactions from "~components/Transaction/RecentTransactions"
import { config } from "~contents/config"
import { useAlchemyGetAssetTransfers } from "~hooks/use-alchemy"
import { useWeb3TokenBalance } from "~hooks/use-web3"
import { SettingsContext } from "~store/settings-context"
import { WalletContext } from "~store/wallet-context"

const iconButtonStyle = {
  color: "info",
  size: "small",
  sx: { border: 1, marginBottom: 1 }
}

interface Props {
  children?: React.ReactNode
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  }
}

const Dashboard = (props: Props) => {
  const settingsContext = useContext(SettingsContext)
  const walletContext = useContext(WalletContext)

  const [value, setValue] = React.useState(0)

  const wallets = walletContext.wallets[0]
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const { balance, isLoaded, error } = useWeb3TokenBalance(
    // @ts-ignore
    wallets[0].address,
    config.tokens[1].networks[1].contractAddress,
    config.tokens[1].decimals,
    config.tokens[1].networks[1].providerUrl
  )

  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactionFound,
    transactions
  } = useAlchemyGetAssetTransfers(
    wallet.address,
    [config.tokens[1].networks[1].contractAddress],
    "0x0",
    [AssetTransfersCategory.ERC20]
  )

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid container item xs={12} overflow="hidden">
      <HeaderLight title={"Dashboard"} />

      <Grid
        container
        item
        height={480}
        marginTop={7.5}
        display="block"
        alignItems="flex-start">
        {(error || errorTransactions) && (
          <Alert variant="outlined" severity="error">
            {error}
            {errorTransactions}
          </Alert>
        )}

        <Grid item xs={12} textAlign="left">
          <AccountBalanceItem
            title="USDC / USD"
            balance={isLoaded ? balance : "Loading..."}
            accountPageName="accountUSDC"
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

        <Grid container item xs={12} marginTop={2}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example">
                <Tab
                  label="Spend"
                  {...a11yProps(0)}
                  sx={{
                    textTransform: "none",
                    fontSize: 14,
                    alignItems: "self-start",
                    justifySelf: "flex-start"
                  }}
                />
                <Tab
                  label="Transactions"
                  {...a11yProps(1)}
                  sx={{
                    textTransform: "none",
                    fontSize: 14,
                    alignItems: "self-start",
                    justifySelf: "flex-start"
                  }}
                />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <Spend />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <RecentTransactions
                title={"Recent Transactions"}
                goBackPageName="dashboard"
                isLoadingTransactions={isLoadingTransactions}
                transactionFound={transactionFound}
                transactions={transactions}
              />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </Grid>
  )
}

export default Dashboard

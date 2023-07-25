import { Alert, Box, Grid, Tab, Tabs } from "@mui/material"
import { AssetTransfersCategory } from "alchemy-sdk"
import React, { useContext, useState } from "react"

import AccountBalanceItemUSDC from "~components/Account/AccountBalanceItemUSDC"
import Spend from "~components/Dashboard/Spend"
import TabPanel from "~components/Dashboard/TabPanel"
import ActionMenu from "~components/Layout/ActionMenu"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import RecentTransactions from "~components/Transaction/RecentTransactions"
import { config } from "~contents/config"
import { useAlchemyGetAssetTransfers } from "~hooks/use-alchemy"
import { SettingsContext } from "~store/settings-context"
import { WalletContext } from "~store/wallet-context"

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

  const [value, setValue] = useState(0)

  const wallets = walletContext.wallets[0]
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

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
        {errorTransactions && (
          <Alert variant="outlined" severity="error">
            {errorTransactions.split(": ")[1]}
          </Alert>
        )}

        <Grid item xs={12} textAlign="left">
          <AccountBalanceItemUSDC />
        </Grid>

        <ActionMenu />

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

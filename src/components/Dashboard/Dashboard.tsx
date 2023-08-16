import { Box, Grid, Tab, Tabs } from "@mui/material"
import React, { useState } from "react"

import AccountBalanceItemUSDC from "~components/Account/AccountBalanceItemUSDC"
import AccountNetworkBalanceItemUSDC from "~components/Account/AccountNetworkBalanceItemUSDC"
import Spend from "~components/Dashboard/Spend"
import TabPanel from "~components/Dashboard/TabPanel"
import ActionMenu from "~components/Layout/ActionMenu"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"

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
  const [value, setValue] = useState(0)

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
                  label="Accounts"
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
              <AccountNetworkBalanceItemUSDC />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </Grid>
  )
}

export default Dashboard

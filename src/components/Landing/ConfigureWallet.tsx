import { Button, Grid } from "@mui/material"
import React, { useContext } from "react"

import Header from "~components/Layout/Header"
import { SettingsContext } from "~store/settings-context"

interface Props {
  children?: React.ReactNode
}

const ConfigureWallet = (props: Props) => {
  const settingsContext = useContext(SettingsContext)

  return (
    <React.Fragment>
      <Grid container>
        <Header title={"uNeXT Wallet"} subTitle={"Configure your wallet"} />
        <Grid item xs={12} paddingTop={-8} paddingLeft={-8}>
          <Button
            variant={"outlined"}
            fullWidth
            style={{ marginBottom: 10 }}
            onClick={() => {
              settingsContext.shownPageHandler("createNewWallet")
            }}>
            Create New Wallet
          </Button>
          <Button
            variant={"outlined"}
            fullWidth
            style={{ marginBottom: 10 }}
            onClick={() => settingsContext.shownPageHandler("importWallet")}>
            Import Wallet
          </Button>
          <Button variant={"outlined"} fullWidth style={{ marginBottom: 10 }}>
            Other Options
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ConfigureWallet

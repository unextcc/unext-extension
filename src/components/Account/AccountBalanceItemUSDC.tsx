import { Grid, Link, Paper, Typography } from "@mui/material"
import type React from "react"
import { useContext } from "react"

import { SettingsContext } from "~store/settings-context"

import AccountTotalBalanceValueUSDC from "./AccountTotalBalanceValueUSDC"

interface Props {
  children?: React.ReactNode
}

const AccountBalanceItemUSDC = (props: Props) => {
  const settingContext = useContext(SettingsContext)

  return (
    <Grid item>
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          height: "84px",
          width: "160px"
        }}>
        <Typography component="p" color="primary" sx={{ fontSize: 12 }}>
          USDC / USD
        </Typography>

        <Typography component="h6" variant="h6">
          <AccountTotalBalanceValueUSDC />
        </Typography>

        <Link
          color="primary"
          sx={{ cursor: "pointer", fontSize: 12 }}
          onClick={() => settingContext.shownPageHandler("accountUSDC")}>
          View Account
        </Link>
      </Paper>
    </Grid>
  )
}

export default AccountBalanceItemUSDC

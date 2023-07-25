import { Grid, Link, Paper, Typography } from "@mui/material"
import type React from "react"
import { useContext } from "react"

import { SettingsContext } from "~store/settings-context"
import { WalletContext } from "~store/wallet-context"

interface Props {
  children?: React.ReactNode
  title: string
  balance: string
  accountPageName: string
}

const AccountBalanceItem = (props: Props) => {
  const settingContext = useContext(SettingsContext)
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

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
          {props.title}
        </Typography>

        <Typography component="h6" variant="h6">
          {props.balance}
        </Typography>

        <Link
          color="primary"
          sx={{ cursor: "pointer", fontSize: 12 }}
          onClick={() =>
            settingContext.shownPageHandler(props.accountPageName)
          }>
          View Account
        </Link>
      </Paper>
    </Grid>
  )
}

export default AccountBalanceItem

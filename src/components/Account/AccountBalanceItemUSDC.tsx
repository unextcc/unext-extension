import { Grid, Link, Paper, Typography } from "@mui/material"
import type React from "react"
import { useContext, useEffect, useState } from "react"

import { config } from "~contents/config"
import { useSnowGetAccountTokenBalance } from "~hooks/use-snow"
import { useWeb3TokenBalance } from "~hooks/use-web3"
import { SettingsContext } from "~store/settings-context"
import { WalletContext } from "~store/wallet-context"

interface Props {
  children?: React.ReactNode
}

const AccountBalanceItemUSDC = (props: Props) => {
  const settingContext = useContext(SettingsContext)
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const {
    balance: balanceUsdcAvalanche,
    error: errorUsdcAvalanche,
    status: statusUsdcAvalance,
    getAccountTokenBalance: getAccountTokenBalanceUsdcAvalanche
  } = useSnowGetAccountTokenBalance()

  const {
    balance: balanceUsdcEthereum,
    status: statusUsdcEthereum,
    error: errorUsdcEthereum,
    getTokenBalance: getTokenBalanceUsdcEthereum
  } = useWeb3TokenBalance()

  const {
    balance: balanceUsdcPolygon,
    status: statusUsdcPolygon,
    error: errorUsdcPolygon,
    getTokenBalance: getTokenBalanceUsdcPolygon
  } = useWeb3TokenBalance()

  let totalBalance = 0

  useEffect(() => {
    // avalanche
    if (config.tokens[0].networks[0].enabled) {
      getAccountTokenBalanceUsdcAvalanche(
        wallet.address,
        config.tokens[0].networks[0].snowTraceApiUrl,
        config.tokens[0].networks[0].contractAddress,
        config.tokens[0].decimals
      )

      totalBalance + balanceUsdcAvalanche
    }

    // ethereum
    if (config.tokens[0].networks[1].enabled) {
      getTokenBalanceUsdcEthereum(
        wallet.address,
        config.tokens[0].networks[1].contractAddress,
        config.tokens[0].decimals,
        config.tokens[0].networks[1].providerUrl
      )

      totalBalance + balanceUsdcEthereum
    }

    // polygon
    if (config.tokens[0].networks[2].enabled) {
      getTokenBalanceUsdcPolygon(
        wallet.address,
        config.tokens[0].networks[2].contractAddress,
        config.tokens[0].decimals,
        config.tokens[0].networks[2].providerUrl
      )

      totalBalance + balanceUsdcPolygon
    }
  }, [])

  totalBalance =
    Number(balanceUsdcAvalanche) / 10 ** config.tokens[0].decimals +
    Number(balanceUsdcEthereum) +
    Number(balanceUsdcPolygon)

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
          {statusUsdcAvalance == "done" &&
          statusUsdcEthereum == "done" &&
          statusUsdcPolygon == "done"
            ? totalBalance.toFixed(2)
            : "Loading..."}
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

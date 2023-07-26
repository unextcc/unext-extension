import { Grid, Link, Paper, Typography } from "@mui/material"
import type React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "~store/wallet-context"

import AccountTotalBalanceValueUSDC from "./AccountTotalBalanceValueUSDC"

interface Props {
  children?: React.ReactNode
}

const AccountDetailItemUSDC = (props: Props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  return (
    <Grid item>
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          display: "block",
          height: "120px"
        }}>
        <Typography component="p" color="primary" sx={{ fontSize: 12 }}>
          USDC / USD
        </Typography>

        <Typography component="h6" variant="h6">
          <AccountTotalBalanceValueUSDC />
        </Typography>

        <Typography color="primary" sx={{ fontSize: 12, marginTop: 1 }}>
          Account Address (
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(wallet.address)
              setIsCopied(true)
              setTimeout(() => {
                setIsCopied(false)
              }, 1000)
            }}>
            {isCopied ? "Address Copied!" : "Copy Address"}
          </Link>
          ):
        </Typography>
        <Typography overflow="auto" sx={{ fontSize: 14 }}>
          {wallet.address}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default AccountDetailItemUSDC

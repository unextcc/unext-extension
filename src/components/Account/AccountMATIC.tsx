import { Alert, Grid, Typography } from "@mui/material"
import React, { useContext } from "react"

import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { config } from "~contents/config"
import { useWeb3TokenBalance } from "~hooks/use-web3"
import { WalletContext } from "~store/wallet-context"

import AccountDetailItem from "./AccountDetailItem"

interface Props {
  children?: React.ReactNode
}

const AccountMATIC = (props: Props) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const { balance, isError, isLoaded, error } = useWeb3TokenBalance(
    // @ts-ignore
    wallet.address,
    config.cryptoTokens[0].contractAddress,
    config.cryptoTokens[0].decimals,
    config.cryptoTokens[0].providerUrl
  )

  return (
    <Grid container item xs={12}>
      <HeaderLight goBackPage="account" title={"MATIC Account"} />

      <Grid
        container
        item
        height={480}
        marginTop={7.5}
        display="block"
        alignItems="flex-start">
        {error && (
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        )}

        <AccountDetailItem
          accountAddress={wallet.address}
          balance={isLoaded ? balance : "Loading..."}
          title={"USD"}
        />
      </Grid>

      <Footer />
    </Grid>
  )
}

export default AccountMATIC

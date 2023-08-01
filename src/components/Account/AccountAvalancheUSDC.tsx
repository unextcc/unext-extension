import { Grid } from "@mui/material"
import type React from "react"
import { useContext, useEffect } from "react"

import ActionMenu from "~components/Layout/ActionMenu"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import RecentTransactions from "~components/Transaction/RecentTransactions"
import RecentTransactionsAvalanche from "~components/Transaction/RecentTransactionsAvalanche"
import { config } from "~contents/config"
import { useSnowGetAccountTokenTransactions } from "~hooks/use-snow"
import { WalletContext } from "~store/wallet-context"

import AccountDetailItemUSDC from "./AccountDetailItemUSDC"

interface Props {
  children?: React.ReactNode
}

const AccountAvalancheUSDC = (props: Props) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const { error, isLoading, status, transactions, transactionFound } =
    useSnowGetAccountTokenTransactions(
      config.tokens[0].networks[0].contractAddress,
      wallet.address,
      1,
      20,
      0,
      999999999,
      "desc",
      config.tokens[0].networks[0].snowTraceApiUrl
    )

  console.log(transactions)

  return (
    <Grid container item xs={12}>
      <HeaderLight
        goBackPage="accountUSDC"
        title={"USDC Account - Avalanche"}
      />

      <Grid
        container
        item
        height={480}
        marginTop={7.5}
        display="block"
        alignItems="flex-start">
        <AccountDetailItemUSDC balanceType="usdc" network="avalanche" />

        <ActionMenu />

        <Grid
          item
          xs={12}
          sx={{
            height: 10,
            borderTop: 1,
            borderColor: "lightgray",
            marginTop: 2
          }}
        />

        <RecentTransactionsAvalanche
          goBackPageName="account"
          title={"Recent Transactions"}
          isLoadingTransactions={isLoading}
          transactionFound={transactionFound}
          transactions={transactions}
        />
      </Grid>

      <Footer />
    </Grid>
  )
}

export default AccountAvalancheUSDC

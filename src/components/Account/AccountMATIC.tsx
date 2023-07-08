import { Alert, Grid } from "@mui/material"
import { AssetTransfersCategory } from "alchemy-sdk"
import { SortingOrder } from "alchemy-sdk"
import React, { useContext } from "react"

import ActionMenu from "~components/Layout/ActionMenu"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import RecentTransactions from "~components/Transaction/RecentTransactions"
import { config } from "~contents/config"
import { useAlchemyGetAssetTransfers } from "~hooks/use-alchemy"
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

  const { balance, isLoaded, error } = useWeb3TokenBalance(
    // @ts-ignore
    wallet.address,
    config.cryptoTokens[0].networks[0].contractAddress,
    config.cryptoTokens[0].decimals,
    config.cryptoTokens[0].networks[0].providerUrl
  )

  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactionFound,
    transactions
  } = useAlchemyGetAssetTransfers(
    wallet.address,
    [config.cryptoTokens[0].networks[0].contractAddress],
    "0x0",
    [AssetTransfersCategory.EXTERNAL],
    true,
    SortingOrder.DESCENDING,
    false
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
        {(error || errorTransactions) && (
          <Alert variant="outlined" severity="error">
            {error}
            {errorTransactions}
          </Alert>
        )}

        <AccountDetailItem
          accountAddress={wallet.address}
          balance={isLoaded ? balance : "Loading..."}
          title={"MATIC"}
        />

        <ActionMenu />

        <RecentTransactions
          goBackPageName="accountMATIC"
          title={"Recent Transactions"}
          isLoadingTransactions={isLoadingTransactions}
          transactionFound={transactionFound}
          transactions={transactions}
        />
      </Grid>

      <Footer />
    </Grid>
  )
}

export default AccountMATIC

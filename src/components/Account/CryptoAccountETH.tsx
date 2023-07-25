import { Alert, Grid } from "@mui/material"
import { AssetTransfersCategory } from "alchemy-sdk"
import type React from "react"
import { useContext } from "react"

import AccountBalanceItem from "~components/Account/AccountBalanceItem"
import ActionMenu from "~components/Layout/ActionMenu"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import RecentTransactions from "~components/Transaction/RecentTransactions"
import { config } from "~contents/config"
import { useAlchemyGetAssetTransfers } from "~hooks/use-alchemy"
import { useSnowGetAccountBalance } from "~hooks/use-snow"
import { useWeb3AccountBalance, useWeb3TokenBalance } from "~hooks/use-web3"
import { WalletContext } from "~store/wallet-context"

interface Props {
  children?: React.ReactNode
}

const CryptoAccountETH = (props: Props) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const { balance, error, status } = useWeb3AccountBalance(
    wallet.address,
    config.cryptoTokens[1].networks[0].providerUrl
  )

  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactionFound,
    transactions
  } = useAlchemyGetAssetTransfers(wallet.address, [], "0x0", [
    AssetTransfersCategory.EXTERNAL,
    AssetTransfersCategory.INTERNAL
  ])

  return (
    <Grid container item xs={12}>
      <HeaderLight goBackPage="settings" title={"ETH Account"} />

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
        <Grid container item xs={12} display="flex" spacing={1}>
          <AccountBalanceItem
            title={"ETH"}
            balance={status == "loading" ? "Loading..." : balance}
            accountPageName="accountETH"
          />
        </Grid>

        <ActionMenu />

        <RecentTransactions
          goBackPageName="account"
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
export default CryptoAccountETH

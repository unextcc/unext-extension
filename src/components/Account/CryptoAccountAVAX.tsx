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
import { WalletContext } from "~store/wallet-context"

interface Props {
  children?: React.ReactNode
}

const CryptoAccountAVAX = (props: Props) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const { balance, error, status } = useSnowGetAccountBalance(wallet.address)

  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactionFound,
    transactions
  } = useAlchemyGetAssetTransfers(
    wallet.address,
    [config.tokens[1].networks[1].contractAddress],
    "0x0",
    [AssetTransfersCategory.EXTERNAL]
  )

  return (
    <Grid container item xs={12}>
      <HeaderLight goBackPage="settings" title={"AVAX Account"} />

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
            title={"MATIC"}
            balance={status == "loading" ? "Loading..." : balance}
            accountPageName="accountMATIC"
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
export default CryptoAccountAVAX

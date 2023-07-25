import { Alert, Grid } from "@mui/material"
import { AssetTransfersCategory } from "alchemy-sdk"
import type React from "react"
import { useContext } from "react"

import ActionMenu from "~components/Layout/ActionMenu"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import RecentTransactions from "~components/Transaction/RecentTransactions"
import { config } from "~contents/config"
import { useAlchemyGetAssetTransfers } from "~hooks/use-alchemy"
import { WalletContext } from "~store/wallet-context"

import AccountBalanceItemUSDC from "./AccountBalanceItemUSDC"
import AccountDetailItemUSDC from "./AccountDetailItemUSDC"

interface Props {
  children?: React.ReactNode
}

const AccountUSDC = (props: Props) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactionFound,
    transactions
  } = useAlchemyGetAssetTransfers(
    wallet.address,
    [config.tokens[0].networks[1].contractAddress],
    "0x0",
    [AssetTransfersCategory.ERC20]
  )

  return (
    <Grid container item xs={12}>
      <HeaderLight goBackPage="account" title={"USDC Account"} />

      <Grid
        container
        item
        height={480}
        marginTop={7.5}
        display="block"
        alignItems="flex-start">
        {errorTransactions && (
          <Alert variant="outlined" severity="error">
            {errorTransactions}
          </Alert>
        )}

        <AccountDetailItemUSDC />

        <ActionMenu />

        <RecentTransactions
          title={"Recent Transactions"}
          goBackPageName="accountUSDC"
          isLoadingTransactions={isLoadingTransactions}
          transactionFound={transactionFound}
          transactions={transactions}
        />
      </Grid>

      <Footer />
    </Grid>
  )
}

export default AccountUSDC

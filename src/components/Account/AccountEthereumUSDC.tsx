import { Alert, Grid } from "@mui/material"
import { AssetTransfersCategory, SortingOrder } from "alchemy-sdk"
import type React from "react"
import { useContext } from "react"

import ActionMenu from "~components/Layout/ActionMenu"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import RecentTransactions from "~components/Transaction/RecentTransactions"
import { config } from "~contents/config"
import { useAlchemyGetAssetTransfers } from "~hooks/use-alchemy"
import { WalletContext } from "~store/wallet-context"

import AccountDetailItemUSDC from "./AccountDetailItemUSDC"

interface Props {
  children?: React.ReactNode
}

const AccountEthereumUSDC = (props: Props) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactionFound,
    transactions
  } = useAlchemyGetAssetTransfers(
    config.tokens[0].networks[1].alchemyApiKey,
    config.tokens[0].networks[1].alchemyNetwork,
    config.tokens[0].networks[1].alchemyMaxRetries,
    wallet.address,
    [config.tokens[0].networks[1].contractAddress],
    "0x0",
    [AssetTransfersCategory.ERC20],
    true,
    SortingOrder.DESCENDING,
    true,
    20,
    config.tokens[0].networks[1].alchemyUrl
  )

  return (
    <Grid container item xs={12}>
      <HeaderLight goBackPage="accountUSDC" title={"USDC Account - Ethereum"} />

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

        <AccountDetailItemUSDC balanceType="usdc" network="ethereum" />

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

export default AccountEthereumUSDC

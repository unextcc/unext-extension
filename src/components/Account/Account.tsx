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
import { useWeb3TokenBalance } from "~hooks/use-web3"
import { WalletContext } from "~store/wallet-context"

interface Props {
  children?: React.ReactNode
}

const Account = (props: Props) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const {
    balance: balanceUSDC,
    isError: isErrorUSDC,
    isLoaded: isLoadedUSDC,
    error: errorUSDC
  } = useWeb3TokenBalance(
    // @ts-ignore
    wallet.address,
    config.tokens[1].networks[1].contractAddress,
    config.tokens[1].decimals,
    config.tokens[1].networks[1].providerUrl
  )

  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactionFound,
    transactions
  } = useAlchemyGetAssetTransfers(
    wallet.address,
    [config.tokens[1].networks[1].contractAddress],
    "0x0",
    [AssetTransfersCategory.ERC20, AssetTransfersCategory.EXTERNAL]
  )

  return (
    <Grid container item xs={12}>
      <HeaderLight title={"Accounts"} />

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
        <Grid container item xs={12} display="flex" spacing={1}>
          <AccountBalanceItem
            title={"USDC / USD"}
            balance={isLoadedUSDC ? balanceUSDC : "Loading..."}
            accountPageName="accountUSDC"
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
export default Account

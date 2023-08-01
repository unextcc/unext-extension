import { Alert, Grid } from "@mui/material"
import { AssetTransfersCategory } from "alchemy-sdk"
import type React from "react"
import { useContext } from "react"

import ActionMenu from "~components/Layout/ActionMenu"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { config } from "~contents/config"
import { useAlchemyGetAssetTransfers } from "~hooks/use-alchemy"
import { WalletContext } from "~store/wallet-context"

import AccountBalanceItemUSDC from "./AccountBalanceItemUSDC"
import AccountNetworkBalanceItemUSDC from "./AccountNetworkBalanceItemUSDC"

interface Props {
  children?: React.ReactNode
}

const Account = (props: Props) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

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
        <Grid container item xs={12} display="flex" spacing={1}>
          <AccountBalanceItemUSDC />
        </Grid>

        <ActionMenu />

        <Grid
          item
          xs={12}
          sx={{
            height: 20,
            borderTop: 1,
            borderColor: "lightgray",
            marginTop: 2
          }}
        />

        <AccountNetworkBalanceItemUSDC />
      </Grid>

      <Footer />
    </Grid>
  )
}
export default Account

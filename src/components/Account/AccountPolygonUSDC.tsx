import { Grid } from "@mui/material"
import type React from "react"

import ActionMenu from "~components/Layout/ActionMenu"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import RecentTransactions from "~components/Transaction/RecentTransactions"
import { NetworkId, TokenId } from "~contents/config"

import AccountDetailItemUSDC from "./AccountDetailItemUSDC"

interface Props {
  children?: React.ReactNode
}

const AccountPolygonUSDC = (props: Props) => {
  return (
    <Grid container item xs={12}>
      <HeaderLight goBackPage="accountUSDC" title={"USDC Account - Polygon"} />

      <Grid
        container
        item
        height={480}
        marginTop={7.5}
        display="block"
        alignItems="flex-start">
        <AccountDetailItemUSDC balanceType="usdc" network="polygon" />

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
          networkId={NetworkId.POLYGON}
          tokenId={TokenId.USDC}
        />
      </Grid>

      <Footer />
    </Grid>
  )
}

export default AccountPolygonUSDC

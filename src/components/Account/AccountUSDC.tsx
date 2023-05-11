import {
  ArrowDownwardOutlined,
  MoreHorizOutlined,
  ShoppingCartCheckout
} from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import { Alert, Grid, IconButton, Typography } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { AssetTransfersCategory } from "alchemy-sdk"
import type React from "react"
import { useContext } from "react"

import AccountDetailItem from "~components/Account/AccountDetailItem"
import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { config } from "~contents/config"
import { useAlchemyGetAssetTransfers } from "~hooks/use-alchemy"
import { useWeb3TokenBalance } from "~hooks/use-web3"
import { WalletContext } from "~store/wallet-context"

import { iconButtonStyle } from "./Styles"

interface Props {
  children?: React.ReactNode
}

const AccountUSDC = (props: Props) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const { balance, isLoaded, error } = useWeb3TokenBalance(
    // @ts-ignore
    wallet.address,
    config.tokens[0].contractAddress,
    config.tokens[0].decimals,
    config.tokens[0].providerUrl
  )

  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactionFound,
    transactions
  } = useAlchemyGetAssetTransfers(
    wallet.address,
    [config.tokens[0].contractAddress],
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
        {(error || errorTransactions) && (
          <Alert variant="outlined" severity="error">
            {error}
            {errorTransactions}
          </Alert>
        )}

        <AccountDetailItem
          accountAddress={wallet.address}
          balance={isLoaded ? balance : "Loading..."}
          title={"USD"}
        />

        <Grid
          container
          item
          xs={12}
          display="flex"
          alignItems="flex-start"
          justifyContent={"flex-start"}>
          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <AddIcon color={"info"} />
            </IconButton>
            <Typography fontSize={12} textAlign="left" paddingLeft={1}>
              Add
            </Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <AutorenewIcon color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left">
              Convert
            </Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <ShoppingCartCheckout color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left" paddingLeft={0.5}>
              Send
            </Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <ArrowDownwardOutlined color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left">
              Request
            </Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <MoreHorizOutlined color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left" paddingLeft={0.7}>
              More
            </Typography>
          </Grid>
        </Grid>

        <Typography color="primary" sx={{ fontSize: 12, marginTop: 1 }}>
          Recent Transactions
        </Typography>

        <Grid item maxHeight={250} xs={12} sx={{ overflow: "hidden" }}>
          {isLoadingTransactions ? (
            "Loading..."
          ) : (
            <TableContainer
              sx={{
                maxHeight: 250,
                overflowX: "hidden",
                "&::-webkit-scrollbar": { width: 2 },
                "&::-webkit-scrollbar-track": { backgroundColor: "lightgray" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "gray",
                  borderRadius: 0
                }
              }}>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      key="date"
                      align="left"
                      style={{ minWidth: 170 }}>
                      Date
                    </TableCell>
                    <TableCell
                      key="amount"
                      align="right"
                      style={{ minWidth: 170 }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionFound
                    ? transactions.map((row, index) => (
                        <TableRow hover key={index}>
                          <TableCell key={"date" + index} align="left">
                            {row.blockDate}
                          </TableCell>
                          <TableCell key={"amount" + index} align="right">
                            {row.value.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))
                    : "Transaction not found!"}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>

      <Footer />
    </Grid>
  )
}

export default AccountUSDC

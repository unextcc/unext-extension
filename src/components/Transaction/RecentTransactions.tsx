import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { AssetTransfersCategory, SortingOrder } from "alchemy-sdk"
import React, { useContext, useEffect } from "react"

import { NetworkId, TokenId, config } from "~contents/config"
import { useAlchemyGetAssetTransfers } from "~hooks/use-alchemy"
import { SettingsContext } from "~store/settings-context"
import { TransactionContext } from "~store/transaction-context"
import { WalletContext } from "~store/wallet-context"

interface Props {
  children?: React.ReactNode
  goBackPageName: string
  title: string
  tokenId: number
  networkId: number
}

const RecentTransactions = (props: Props) => {
  const settingsContext = useContext(SettingsContext)
  const transactionContext = useContext(TransactionContext)
  const walletContext = useContext(WalletContext)

  //@ts-ignore
  const wallet = walletContext.wallets[0][0]

  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactionFound,
    transactions,
    getAssetTransfers
  } = useAlchemyGetAssetTransfers()

  useEffect(() => {
    if (
      transactions.length <= 0 &&
      transactionFound &&
      props.networkId === NetworkId.ETHEREUM
    ) {
      getAssetTransfers(
        config.tokens[props.tokenId].networks[props.networkId].alchemyApiKey,
        NetworkId.ETHEREUM,
        config.tokens[props.tokenId].decimals,
        config.tokens[props.tokenId].networks[props.networkId]
          .alchemyMaxRetries,
        wallet.address,
        [
          config.tokens[props.tokenId].networks[props.networkId].contractAddress
        ],
        "0x0",
        [AssetTransfersCategory.ERC20],
        true,
        SortingOrder.DESCENDING,
        true,
        20,
        config.tokens[props.tokenId].networks[props.networkId].alchemyUrl
      )
    } else if (
      transactions.length <= 0 &&
      transactionFound &&
      props.networkId === NetworkId.POLYGON
    ) {
      getAssetTransfers(
        config.tokens[props.tokenId].networks[props.networkId].alchemyApiKey,
        NetworkId.POLYGON,
        config.tokens[props.tokenId].decimals,
        config.tokens[props.tokenId].networks[props.networkId]
          .alchemyMaxRetries,
        wallet.address,
        [
          config.tokens[props.tokenId].networks[props.networkId].contractAddress
        ],
        "0x0",
        [AssetTransfersCategory.ERC20],
        true,
        SortingOrder.DESCENDING,
        true,
        20,
        config.tokens[props.tokenId].networks[props.networkId].alchemyUrl
      )
    } else if (
      transactions.length <= 0 &&
      transactionFound &&
      props.networkId === NetworkId.AVALANCE
    ) {
      // alchemy
    }
  }, [transactions])

  return (
    <React.Fragment>
      <Grid container item xs={12}>
        {props.title && (
          <Typography color="primary" sx={{ fontSize: 12, marginTop: 1 }}>
            {props.title}
          </Typography>
        )}

        <Grid item maxHeight={250} xs={12} sx={{ overflow: "hidden" }}>
          {isLoadingTransactions ? (
            "Loading..."
          ) : (
            <TableContainer
              sx={{
                maxHeight: 250,
                overflowX: "hidden",
                "&::-webkit-scrollbar": { width: 2 },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "lightgray"
                },
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
                  {transactionFound ? (
                    transactions.map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell
                          key={"date" + index}
                          align="left"
                          sx={{ verticalAlign: "middle", cursor: "pointer" }}
                          onClick={() => {
                            transactionContext.setTransactionDetailHandler(
                              props.goBackPageName,
                              row.blockDate,
                              props.networkId,
                              row.blockTime,
                              row.tokenSymbol,
                              row.hash,
                              row.tokenSymbol,
                              row.value
                            )
                            settingsContext.shownPageHandler(
                              "transactionDetail"
                            )
                          }}>
                          {row.blockDate}
                        </TableCell>
                        <TableCell
                          key={"amount" + index}
                          align="right"
                          sx={{ verticalAlign: "middle", cursor: "pointer" }}
                          onClick={() => {
                            transactionContext.setTransactionDetailHandler(
                              props.goBackPageName,
                              row.blockDate,
                              props.networkId,
                              row.blockTime,
                              row.tokenSymbol,
                              row.hash,
                              row.tokenSymbol,
                              row.value
                            )
                            settingsContext.shownPageHandler(
                              "transactionDetail"
                            )
                          }}>
                          {row.tokenSymbol}{" "}
                          {row.transactionType === "in" && "+"}
                          {row.transactionType === "out" && "-"}
                          {row.value.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>Transaction not found!</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default RecentTransactions

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
import React, { useContext } from "react"

import type { Transactions } from "~hooks/use-alchemy"
import { SettingsContext } from "~store/settings-context"
import { TransactionContext } from "~store/transaction-context"

interface Props {
  children?: React.ReactNode
  goBackPageName: string
  title: string
  isLoadingTransactions: boolean
  transactionFound: boolean
  transactions: Transactions
}

const RecentTransactions = (props: Props) => {
  const settingsContext = useContext(SettingsContext)
  const transactionContext = useContext(TransactionContext)

  return (
    <React.Fragment>
      <Grid container item xs={12}>
        {props.title && (
          <Typography color="primary" sx={{ fontSize: 12, marginTop: 1 }}>
            {props.title}
          </Typography>
        )}

        <Grid item maxHeight={250} xs={12} sx={{ overflow: "hidden" }}>
          {props.isLoadingTransactions ? (
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
                  {props.transactionFound ? (
                    props.transactions.map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell
                          key={"date" + index}
                          align="left"
                          sx={{ verticalAlign: "middle", cursor: "pointer" }}
                          onClick={() => {
                            transactionContext.setTransactionDetailHandler(
                              props.goBackPageName,
                              row.blockNum,
                              row.asset,
                              row.hash,
                              row.transactionType,
                              row.from,
                              row.to,
                              row.blockDate,
                              row.blockTime,
                              "Completed",
                              row.fiatSymbol,
                              row.value,
                              0,
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
                              row.blockNum,
                              row.asset,
                              row.hash,
                              row.transactionType,
                              row.from,
                              row.to,
                              row.blockDate,
                              row.blockTime,
                              "Completed",
                              row.fiatSymbol,
                              row.value,
                              0,
                              row.value
                            )
                            settingsContext.shownPageHandler(
                              "transactionDetail"
                            )
                          }}>
                          {row.asset} {row.transactionType === "0" && "+"}
                          {row.transactionType === "1" && "-"}
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

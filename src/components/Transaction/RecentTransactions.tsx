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
import React from "react"

import type { Transactions } from "~hooks/use-alchemy"

interface Props {
  children?: React.ReactNode
  title: string
  isLoadingTransactions: boolean
  transactionFound: boolean
  transactions: Transactions
}

const RecentTransactions = (props: Props) => {
  return (
    <React.Fragment>
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
              "&::-webkit-scrollbar-track": { backgroundColor: "lightgray" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "gray",
                borderRadius: 0
              }
            }}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell key="date" align="left" style={{ minWidth: 170 }}>
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
                {props.transactionFound
                  ? props.transactions.map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell
                          key={"date" + index}
                          align="left"
                          sx={{ verticalAlign: "middle" }}>
                          {row.blockDate} {row.transactionType === "0" && "⇲"}
                          {row.transactionType === "1" && "⇱"}
                        </TableCell>
                        <TableCell key={"amount" + index} align="right">
                          {row.asset} {row.transactionType === "0" && "+"}
                          {row.transactionType === "1" && "-"}
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
    </React.Fragment>
  )
}

export default RecentTransactions

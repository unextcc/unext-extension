import {
  Button,
  Grid,
  TableCell,
  TableContainer,
  Typography
} from "@mui/material"
import { Table, TableBody, TableRow } from "@mui/material"
import { useContext } from "react"

import HeaderLight from "~components/Layout/HeaderLight"
import { config } from "~contents/config"
import { TransactionContext } from "~store/transaction-context"

interface Props {
  children?: React.ReactNode
}

const TransactionDetail = (props: Props) => {
  const transactionContext = useContext(TransactionContext)
  const goBackPageName = transactionContext.transactionDetail.goBackPageName
  const goBackPageTitle = transactionContext.transactionDetail.title
  const transactionHash = transactionContext.transactionDetail.transactionHash
  const from = transactionContext.transactionDetail.from
  const to = transactionContext.transactionDetail.to
  const date = transactionContext.transactionDetail.date
  const time = transactionContext.transactionDetail.time
  const transactionStatus =
    transactionContext.transactionDetail.transactionStatus
  const fiatSymbol = transactionContext.transactionDetail.fiatSymbol
  const value = transactionContext.transactionDetail.value
  const networkFee = transactionContext.transactionDetail.networkFee
  const total = transactionContext.transactionDetail.total

  let transactionType
  if (transactionContext.transactionDetail.transactionType === "1") {
    transactionType = "Sent"
  } else if (transactionContext.transactionDetail.transactionType === "0") {
    transactionType = "Received"
  }

  return (
    <Grid container item xs={12}>
      <HeaderLight
        goBackPage={goBackPageName}
        goBackPageTitle={transactionType + " " + goBackPageTitle}
      />

      <Grid
        borderBottom={2}
        borderColor="lightgray"
        container
        flexDirection="row"
        item
        height={100}
        marginTop={7.5}
        display="flex"
        alignContent="center"
        alignItems="center"
        textAlign="center"
        xs={12}>
        <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
          {goBackPageTitle}
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
          {fiatSymbol}
          {value.toFixed(2)}
        </Typography>
      </Grid>

      <Grid container item height={340}>
        <TableContainer component="div">
          <Table width="100%" size="medium">
            <TableBody>
              <TableRow>
                <TableCell sx={{ borderBottom: "none", fontSize: 18 }}>
                  From
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", fontSize: 18 }}>
                  {from.substring(0, 18)} {from.length >= 18 && "..."}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderBottom: "none", fontSize: 18 }}>
                  To
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", fontSize: 18 }}>
                  {to.substring(0, 18)} {to.length >= 18 && "..."}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderBottom: "none", fontSize: 18 }}>
                  Date
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", fontSize: 18 }}>
                  {date} {time}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderBottom: "none", fontSize: 18 }}>
                  Total
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", fontSize: 18 }}>
                  {total.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid
        container
        item
        direction="column"
        height={35}
        textAlign="center"
        alignContent="center"
        alignItems="center"
        xs={12}>
        <Button
          target="_blank"
          href={config.tokens[0].scannerUrl + "/tx/" + transactionHash}
          variant="outlined"
          color="info"
          size="small">
          View on Explorer
        </Button>
      </Grid>
    </Grid>
  )
}

export default TransactionDetail

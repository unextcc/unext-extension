import {
  Button,
  Grid,
  Paper,
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
    <Grid container item xs={12} display="block">
      <HeaderLight
        goBackPage={goBackPageName}
        goBackPageTitle={transactionType + " " + goBackPageTitle}
      />

      <Grid container item xs={12} display="block">
        <Paper variant="outlined" sx={{ padding: 1 }}>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              width: "100%",
              fontSize: 14,
              marginBottom: 1
            }}>
            Amount:
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ textAlign: "center", width: "100%", marginBottom: 1 }}>
            {fiatSymbol}
            {value.toFixed(2)}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              width: "100%",
              fontSize: 14,
              marginBottom: 1
            }}>
            Receiving address:
          </Typography>

          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              textAlign: "center",
              width: "100%",
              fontSize: 14,
              marginBottom: 1
            }}>
            {to}
          </Typography>
        </Paper>
      </Grid>

      <Grid container item xs={12}>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  From:
                </TableCell>
                <TableCell align="right">
                  {from.substring(0, 6)}
                  {"..."}
                  {from.substring(38, 42)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Date:
                </TableCell>
                <TableCell align="right">{date + " " + time}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Status:
                </TableCell>
                <TableCell align="right">{transactionStatus}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Network:
                </TableCell>
                <TableCell align="right">
                  {config.tokens[0].blockchain}
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
        marginTop={2}
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

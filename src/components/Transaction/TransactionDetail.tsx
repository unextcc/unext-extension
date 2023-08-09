import {
  Button,
  Grid,
  Paper,
  TableCell,
  TableContainer,
  Typography
} from "@mui/material"
import { Table, TableBody, TableRow } from "@mui/material"
import { useContext, useEffect, useState } from "react"

import HeaderLight from "~components/Layout/HeaderLight"
import { config } from "~contents/config"
import { useAlchemyGetTransactionReceipt } from "~hooks/use-alchemy"
import { TransactionContext } from "~store/transaction-context"
import type { TransactionDetail } from "~types/transaction"

interface Props {
  children?: React.ReactNode
}

const TransactionDetail = (props: Props) => {
  const transactionContext = useContext(TransactionContext)
  const [transactionDetail, setTransactionDetail] = useState<TransactionDetail>({
    date: "",
    from: "",
    hash: "default",
    network: "",
    networkFee: 0,
    status: "",
    time: "",
    to: "",
    transactionType: "",
    value: 0
  })

  const { error, getTransactionReceipt, status, transaction: transactionEthereum } = useAlchemyGetTransactionReceipt()


  useEffect(() => {
    if (transactionContext.transactionDetail.network === "ethereum" && transactionDetail.hash === "default") {
      console.log("transactionContext.transactionDetail.network " + transactionContext.transactionDetail.network)
      getTransactionReceipt(
        transactionContext.transactionDetail.transactionHash, 
        config.tokens[0].networks[1].alchemyNetwork, 
        config.tokens[0].networks[1].alchemyMaxRetries, 
        config.tokens[0].networks[1].alchemyUrl
      )
      setTransactionDetail(transactionEthereum)
    } else if (transactionContext.transactionDetail.network === "polygon" && transactionDetail.hash === "default") {
      getTransactionReceipt(
        transactionContext.transactionDetail.transactionHash,
        config.tokens[0].networks[2].alchemyNetwork,
        config.tokens[0].networks[2].alchemyMaxRetries,
        config.tokens[0].networks[2].alchemyUrl
      )
      setTransactionDetail(transactionEthereum)
    } else if (transactionContext.transactionDetail.network === "avalanche" && transactionDetail.hash === "default") {
      // avalanche
    }
  }, [transactionEthereum])

  console.log(transactionDetail)

  return (
    <Grid container item xs={12} display="block">
      <HeaderLight
        goBackPage={transactionContext.transactionDetail.goBackPageName}
        goBackPageTitle={transactionDetail?.transactionType + " " + transactionContext.transactionDetail.tokenSymbol}
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
            {transactionDetail?.value.toFixed(2)}
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
            {transactionDetail?.to}
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
                  {transactionDetail?.from.substring(0, 6)}
                  {"..."}
                  {transactionDetail?.from.substring(38, 42)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Date:
                </TableCell>
                <TableCell align="right">{transactionDetail?.date + " " + transactionDetail?.time}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Status:
                </TableCell>
                <TableCell align="right">{transactionDetail?.status}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Network:
                </TableCell>
                <TableCell align="right">
                  {transactionDetail?.network}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Network Fee:
                </TableCell>
                <TableCell align="right">
                  {transactionDetail?.network === "ethereum" && "ETH"} 
                  {transactionDetail?.network === "polygon" && "MATIC"} 
                  {transactionDetail?.network === "avalanche" && "AVAX"}  
                  {transactionDetail?.networkFee}
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
          href={config.tokens[0].networks[0].scannerUrl + "/tx/" + transactionDetail?.hash}
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

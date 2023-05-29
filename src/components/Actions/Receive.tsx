import { CopyAll } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { QRCodeSVG } from "qrcode.react"
import { useContext } from "react"

import HeaderLight from "~components/Layout/HeaderLight"
import { WalletContext } from "~store/wallet-context"

const Receive = () => {
  const walletContext = useContext(WalletContext)
  const wallet = walletContext.wallets[0][0]

  return (
    <Grid container item xs={12}>
      <HeaderLight goBackPage="dashboard" title={"Receive"} />

      <Grid
        container
        item
        xs={12}
        display="flex"
        direction="column"
        alignContent="center"
        alignItems="center"
        textAlign="center"
        height="360"
        marginTop={10}>
        <QRCodeSVG value={wallet.address} size={250} />
      </Grid>

      <Grid
        container
        item
        xs={12}
        display="flex"
        direction="row"
        alignContent="center"
        alignItems="center"
        textAlign="center"
        height="200"
        padding={2}>
        <Grid item xs={9} textAlign="left">
          <Typography fontWeight="bold">Your Account Address:</Typography>
          <Typography fontSize={14}>
            {wallet.address.substring(0, 6)}
            {"..."}
            {wallet.address.substring(38, 42)}
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<CopyAll />}
            onClick={() => navigator.clipboard.writeText(wallet.address)}>
            COPY
          </Button>
        </Grid>

        <Grid
          container
          item
          xs={12}
          display="flex"
          direction="row"
          textAlign="center"
          marginTop={2}>
          <Typography
            component="p"
            textAlign="left"
            fontSize={14}
            sx={{ width: "100%" }}>
            Use this address to receive USDC on Polygon blockchain network.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Receive

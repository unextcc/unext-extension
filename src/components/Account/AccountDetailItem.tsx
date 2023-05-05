import { Grid, Link, Paper, Typography } from "@mui/material"
import type React from "react"
import { useState } from "react"

interface Props {
  accountAddress: string
  balance: string
  children?: React.ReactNode
  title: string
}

const AccountDetailItem = (props: Props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  return (
    <Grid item>
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          display: "block",
          height: "120px"
        }}>
        <Typography component="p" color="primary" sx={{ fontSize: 12 }}>
          {props.title}
        </Typography>

        <Typography component="h6" variant="h6">
          {props.balance}
        </Typography>

        <Typography color="primary" sx={{ fontSize: 12, marginTop: 1 }}>
          Account Address (
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(props.accountAddress)
              setIsCopied(true)
              setTimeout(() => {
                setIsCopied(false)
              }, 1000)
            }}>
            {isCopied ? "Address Copied!" : "Copy Address"}
          </Link>
          ):
        </Typography>
        <Typography overflow="auto" sx={{ fontSize: 14 }}>
          {props.accountAddress}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default AccountDetailItem

import { Alert, Grid } from "@mui/material"
import React from "react"

interface Props {
  children?: React.ReactNode
  error: string
}

const ConnectionError = (props: Props) => {
  return (
    <React.Fragment>
      <Grid container item xs={12}>
        <Alert severity="error">{props.error}</Alert>
      </Grid>
    </React.Fragment>
  )
}

export default ConnectionError

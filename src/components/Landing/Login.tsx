import { Button, Grid } from "@mui/material"
import React, { useContext } from "react"

import { Web3AuthContext } from "~store/web3auth-context"

interface Props {
  children?: React.ReactNode
}

const LoginPage = () => {
  const web3authContext = useContext(Web3AuthContext)

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant={"outlined"}
            fullWidth={true}
            onClick={() => {
              web3authContext.login()
            }}>
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default LoginPage

import { Button, Grid } from "@mui/material"
import React, { useContext } from "react"

import { Web3AuthContext } from "~store/web3auth-context"
import { Web3TKContext } from "~store/web3tk-context"

interface Props {
  children?: React.ReactNode
}

const LoginPage = () => {
  const web3TKContext = useContext(Web3TKContext)

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant={"outlined"}
            fullWidth={true}
            onClick={() => {
              web3TKContext.triggerLogin()
            }}>
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default LoginPage

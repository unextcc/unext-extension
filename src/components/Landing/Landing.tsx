import React, { useContext } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Logo60 } from "~components/logo";
import { SettingsContext } from "~store/settings-context";
import Header from "~components/Layout/Header";

interface Props {
  children?: React.ReactNode;
}
const Landing = (props: Props) => {
  const settingsContext = useContext(SettingsContext);

  return (
    <React.Fragment>
      <Header title={"uNeXT Wallet"} subTitle={"Next step for digital money"}/>

      <Grid container>
        <Grid item xs={12}>
          <Button
            variant={"outlined"}
            fullWidth={true}
            onClick={() => settingsContext.shownPageHandler('configureWallet')}
          >
            CONFIGURE WALLET
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Landing;

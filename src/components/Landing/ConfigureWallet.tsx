import React from "react";
import { Logo25, Logo40 } from "~components/logo";
import { Box, Typography, Grid } from "@mui/material";

interface Props {
  children?: React.ReactNode;
}

const ConfigureWallet = (props: Props) => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} display={"flex"}>
          <Typography variant={"h6"} color={"darkblue"} style={{ verticalAlign: "middle" }}>Configure Wallet</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Configure your wallet here</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ConfigureWallet;

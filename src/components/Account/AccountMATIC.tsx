import type React from "react";
import { Grid, Typography } from "@mui/material";
import HeaderLight from "~components/Layout/HeaderLight";
import Footer from "~components/Layout/Footer";

interface Props {
  children?: React.ReactNode;
}


const AccountMATIC = (props: Props) => {
  return (
    <Grid container item xs={12}>
      <HeaderLight title={"MATIC Account"} />

      <Typography>
        MATIC Account Page!
      </Typography>

      <Footer />
    </Grid>
  )
}

export default AccountMATIC;

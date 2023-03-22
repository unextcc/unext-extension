import React, { useContext } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { SettingsContext } from "~store/settings-context";
import HeaderLight from "~components/Layout/HeaderLight";
import Footer from "~components/Layout/Footer";

interface Props {
  children?: React.ReactNode;
}

const Dashboard = (props: Props) => {
  const settingsContext = useContext(SettingsContext);

  return (
    <React.Fragment>
      <HeaderLight title={"Dashboard"} />

      <Grid item height={480} xs={12} marginTop={8}>
        <Button
          variant={"contained"}
          onClick={()=> {settingsContext.lockPasswordHandler("", 0)}}
        >
          CLEAR PASSWORD
        </Button>
      </Grid>

      <Footer />
    </React.Fragment>
  )
}

export default Dashboard

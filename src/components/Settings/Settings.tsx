import React, { useContext } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { SettingsContext } from "~store/settings-context";
import LockPassword from "~components/LockPassword/LockPassword";
import Landing from "~components/Landing/Landing";
import ConfigureWallet from "~components/Landing/ConfigureWallet";
import HeaderLight from "~components/Layout/HeaderLight";
import Footer from "~components/Layout/Footer";

interface Props {
  children?: React.ReactNode;
}

const Settings = (props: Props) => {
  const settingsContext = useContext(SettingsContext);

  return (
    <Grid container item xs={12}>
      <HeaderLight title={"Settings"} />

      <Grid item height={480} xs={12}>
        <Button variant={"outlined"} onClick={
          () => {settingsContext.lockPasswordHandler("", 0)}
        }>
          Clear Password
        </Button>
      </Grid>

      <Footer />
    </Grid>
  );
};

export default Settings;

import React, { useContext } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  MenuList,
  ListItemText,
  MenuItem,
  Divider
} from "@mui/material";
import { SettingsContext } from "~store/settings-context";
import LockPassword from "~components/LockPassword/LockPassword";
import Landing from "~components/Landing/Landing";
import ConfigureWallet from "~components/Landing/ConfigureWallet";
import HeaderLight from "~components/Layout/HeaderLight";
import Footer from "~components/Layout/Footer";
import { Stack } from "@mui/material";

interface Props {
  children?: React.ReactNode;
}

const Settings = (props: Props) => {
  const settingsContext = useContext(SettingsContext);

  return (
    <Grid container item xs={12} display={"block"} direction={"row"} alignItems={"start"}>
      <HeaderLight title={"Settings"} />

      <Grid item xs={12}>
        <Typography variant={"h6"} marginLeft={2}>Wallet</Typography>

        <MenuList>
          <MenuItem onClick={() => settingsContext.shownPageHandler('showPrivateKey')}>
            <ListItemText>
              Show Secret Private Key
            </ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>{">"}</Typography>
          </MenuItem>

          <MenuItem>
            <ListItemText>Show Secret Recovery Phrase</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>{">"}</Typography>
          </MenuItem>
        </MenuList>

        <Divider />

        <Typography variant={"h6"} marginLeft={2}>General</Typography>

        <MenuList>
          <MenuItem>
            <ListItemText>Manage notifications</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>{">"}</Typography>
          </MenuItem>
        </MenuList>
      </Grid>

      <Footer />
    </Grid>
  );
};

export default Settings;

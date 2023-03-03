import { Grid, Link, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext } from "react";
import { SettingsContext } from "~store/settings-context";

const Footer = () => {
  const settingsContext = useContext(SettingsContext);

  return (
    <Grid
      container
      item
      height={46}
      xs={12}
      textAlign={"center"}
      display={"flex"}
      borderTop={1}
      borderColor={"lightgray"}
    >
      <Grid container item xs={3} display={"block"}>
        <Grid item xs={12}>
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() => {settingsContext.shownPageHandler('dashboard')}}>
            <DashboardIcon sx={{ fontSize: 30, color: "gray", ":hover": { color: "blue" } }} />
          </Link>
        </Grid>

        <Typography variant={"subtitle1"} sx={{fontSize: 12}}>
          Dashboard
        </Typography>
      </Grid>

      <Grid container item xs={3} display={"block"}>
        <Grid item xs={12}>
          <ReceiptIcon sx={{ fontSize: 30, color: "gray" }} />
        </Grid>

        <Typography variant={"subtitle1"} sx={{fontSize: 12}}>
          Transactions
        </Typography>
      </Grid>

      <Grid container item xs={3} display={"block"}>
        <Grid item xs={12}>
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() => {settingsContext.lockPasswordHandler("", 0)}}
          >
            <LockIcon sx={{ fontSize: 30, color: "gray", ":hover": { color: "blue" } }} />
          </Link>
        </Grid>

        <Typography variant={"subtitle1"} sx={{fontSize: 12}}>
          Lock Wallet
        </Typography>
      </Grid>

      <Grid container item xs={3} display={"block"}>
        <Grid item xs={12}>
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() => {settingsContext.shownPageHandler('settings')}}>
            <SettingsIcon sx={{ fontSize: 30, color: "gray", ":hover": { color: "blue" } }} />
          </Link>
        </Grid>

        <Typography variant={"subtitle1"} sx={{fontSize: 12}}>
          Settings
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;

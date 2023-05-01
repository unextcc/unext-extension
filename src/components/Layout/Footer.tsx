import React, { useContext, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsContext } from "~store/settings-context";

const FooterBar = () => {
  const settingsContext = useContext(SettingsContext);

  return (
    <React.Fragment>
      <Paper
        elevation={1}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: 1,
          borderColor: "lightgray",
          marginLeft: -1,
          marginRight: -1
        }}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            disableRipple
            disableTouchRipple
            aria-disabled
            label="Dashboard"
            icon={<DashboardIcon
              sx={{color: "#1976d2", "& :hover": { color: "darkblue" } }}
            />}
            onClick={() => {
              settingsContext.shownPageHandler("dashboard");
            }}
          />
          <BottomNavigationAction
            disableRipple
            disableTouchRipple
            aria-disabled
            label="Accounts"
            icon={<ReceiptIcon sx={{color: "#1976d2", "& :hover": { color: "darkblue" } }} />}
            onClick={()=> {
              settingsContext.shownPageHandler("account");
            }}
          />
          <BottomNavigationAction
            disableRipple
            disableTouchRipple
            aria-disabled
            label="Settings"
            icon={<SettingsIcon sx={{color: "#1976d2", "& :hover": { color: "darkblue" } }} />}
            onClick={()=> {
              settingsContext.shownPageHandler("settings");
            }}
          />
          <BottomNavigationAction
            disableRipple
            disableTouchRipple
            aria-disabled
            label="Lock"
            icon={<LockIcon sx={{color: "#1976d2", "& :hover": { color: "darkblue" } }} />}
            onClick={()=> {
              settingsContext.lockPasswordHandler("", 0);
            }}
          />
        </BottomNavigation>
      </Paper>
    </React.Fragment>
  );
}

export default FooterBar;

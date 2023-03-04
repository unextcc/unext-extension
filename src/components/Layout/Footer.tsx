import React, { useContext, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsContext } from "~store/settings-context";

const FooterBar = () => {
  const [value, setValue] = useState();
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
          borderColor: "lightgray"
        }}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Dashboard"
            icon={<DashboardIcon />}
            onClick={() => {
              settingsContext.shownPageHandler("dashboard");
            }}
          />
          <BottomNavigationAction
            label="Transactions"
            icon={<ReceiptIcon />}
            onClick={()=> {
              settingsContext.shownPageHandler("transactions");
            }}
          />
          <BottomNavigationAction
            label="Settings"
            icon={<SettingsIcon />}
            onClick={()=> {
              settingsContext.shownPageHandler("settings");
            }}
          />
          <BottomNavigationAction
            label="Lock"
            icon={<LockIcon />}
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

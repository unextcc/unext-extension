import React, { useContext } from "react";
import { SettingsContext } from "~store/settings-context";
import { Container, Grid } from "@mui/material";
import LockPassword from "~components/LockPassword/LockPassword";
import Landing from "~components/Landing/Landing";
import ConfigureWallet from "~components/Landing/ConfigureWallet";

const App = () => {
  const settingsContext = useContext(SettingsContext);
  console.log(settingsContext.shownPage);
  console.log(settingsContext.lockPassword);

  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Grid container spacing={1} margin={0} paddingTop={2} paddingBottom={2} paddingLeft={1}
            paddingRight={1} border={1} height={580} width={375}>
        {!settingsContext.lockPassword ? <LockPassword /> :
          settingsContext.shownPage === 'landing' && <Landing /> ||
          settingsContext.shownPage === 'configureWallet' && <ConfigureWallet />
        }
      </Grid>
    </Container>
  );
};

export default App;

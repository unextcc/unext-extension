import React, { useContext } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { SettingsContext } from "~store/settings-context";
import LockPassword from "~components/LockPassword/LockPassword";
import Landing from "~components/Landing/Landing";
import ConfigureWallet from "~components/Landing/ConfigureWallet";

interface Props {
  children?: React.ReactNode;
}

const Settings = (props: Props) => {
  const settingsContext = useContext(SettingsContext);

  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Grid container spacing={1} margin={0} paddingTop={1} paddingBottom={1} paddingLeft={1}
            paddingRight={1} border={1} height={580} width={375}>
        <Box>
          <Typography
            variant={"h5"}
            marginTop={0}
            color={"darkblue"}
            fontWeight={"bold"}>
            Settings
          </Typography>

          <Button variant={"outlined"} onClick={() => {settingsContext.lockPasswordHandler("")}}>
            Clear Password
          </Button>
        </Box>
      </Grid>
    </Container>

  );
};

export default Settings;

import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import Logo from "~components/logo";
import { SettingsContext } from "~store/settings-context";

interface Props {
  children?: React.ReactNode;
}
const Landing = (props: Props) => {
  const settingsContext = useContext(SettingsContext);

  return (
    <React.Fragment>
      <Box>
        <Logo />

        <Typography variant="h4">uNeXT Wallet</Typography>
        <Typography variant="body1" fontWeight="normal">Next step for digital wallets</Typography>
      </Box>

      <Box width={375}>
        <Button
          variant={"outlined"}
          fullWidth={true}
          onClick={() => settingsContext.shownPageHandler('configureWallet')}
        >
          CONFIGURE WALLET
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default Landing;

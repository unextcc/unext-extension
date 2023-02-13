import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Logo60 } from "~components/logo";
import { SettingsContext } from "~store/settings-context";

interface Props {
  children?: React.ReactNode;
}
const Landing = (props: Props) => {
  const settingsContext = useContext(SettingsContext);

  return (
    <React.Fragment>
      <Box>
        <Logo60 />

        <Typography variant="h4" color={"darkblue"} fontWeight={"bold"}>uNeXT Wallet</Typography>
        <Typography variant="h6" color={"gray"}>Next step for digital wallets</Typography>
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

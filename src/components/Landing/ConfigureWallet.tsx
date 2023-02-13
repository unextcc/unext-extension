import React from "react";
import Logo from "~components/logo";
import { Box, Typography } from "@mui/material";

interface Props {
  children?: React.ReactNode;
}

const ConfigureWallet = (props: Props) => {
  return (
    <React.Fragment>
      <Box>
        <Logo />

        <Typography variant={"h5"}>Configure Wallet</Typography>
      </Box>
    </React.Fragment>
  );
};

export default ConfigureWallet;

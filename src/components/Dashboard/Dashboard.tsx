import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { SettingsContext } from "~store/settings-context";

interface Props {
  children?: React.ReactNode;
}

const Dashboard = (props: Props) => {
  const settingsContext = useContext(SettingsContext);

  return (
    <React.Fragment>
      <Box>
        <Typography
          variant={"h5"}
          marginTop={0}
          color={"darkblue"}
          fontWeight={"bold"}>
          Dashboard
        </Typography>

        <Button
          variant={"contained"}
          onClick={()=> {settingsContext.lockPasswordHandler("", 0)}}
        >
          CLEAR PASSWORD
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default Dashboard

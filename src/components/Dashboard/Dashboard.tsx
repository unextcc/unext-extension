import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface Props {
  children?: React.ReactNode;
}

const Dashboard = (props: Props) => {

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
      </Box>
    </React.Fragment>
  )
}

export default Dashboard

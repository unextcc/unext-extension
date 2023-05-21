import { Grid } from "@mui/material"

import HeaderLight from "~components/Layout/HeaderLight"

const Send = () => {
  return (
    <Grid
      container
      item
      xs={12}
      display={"inline-block"}
      direction={"row"}
      alignItems={"stretch"}
      marginTop={7}>
      <HeaderLight goBackPage="dashboard" title={"Send"} />
    </Grid>
  )
}

export default Send

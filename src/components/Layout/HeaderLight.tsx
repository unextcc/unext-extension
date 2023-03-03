import { Box, Grid, Typography } from "@mui/material";
import { Logo25 } from "~components/logo";

interface Props {
  children?: React.ReactNode;
  title: string;
}

const HeaderLight = (props: Props) => {
  return (
    <Grid item height={40} xs={12}>
      <Typography variant="h6" color={"darkblue"} fontWeight={"bold"}>{props.title}</Typography>
    </Grid>
  );
};

export default HeaderLight;

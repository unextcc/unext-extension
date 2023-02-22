import { Box, Typography } from "@mui/material";
import { Logo60 } from "~components/logo";

interface Props {
  children?: React.ReactNode;
  title: string;
  subTitle: string;
}

const Header = (props: Props) => {
  return (
    <Box>
      <Logo60 />

      <Typography variant="h4" color={"darkblue"} fontWeight={"bold"}>{props.title}</Typography>
      <Typography variant="h6" color={"gray"}>{props.subTitle}</Typography>
    </Box>
  );
};

export default Header;

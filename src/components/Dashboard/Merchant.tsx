import React from "react";
import { Box, Card, CardContent, Link, Typography } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const Merchant = (props: Props) => {
  return (
    <React.Fragment>
      <Card sx={{display: 'flex', marginBottom: 1}} variant="outlined">
        <Box display="flex" flexDirection="column" padding={1}>
          <Typography component="span" variant="body1">
            <Link href={props.link} target="_blank">{props.title}</Link>
          </Typography>
          <Typography component="span" variant="subtitle1" color="tex.secondary">
            {props.description}
          </Typography>
        </Box>
      </Card>
    </React.Fragment>
  );
}

export default Merchant;

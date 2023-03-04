import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface Props {
  title: string;
}

const ElevationScrollFooter = (props: { children: React.ReactElement }) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const HeaderBar = (props: Props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScrollFooter {...props}>
        <AppBar color={"default"} sx={{borderBottom: 1, borderColor: "lightgray", backgroundColor: "white"}}>
          <Toolbar>
            <Typography variant="h6" component="div">
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScrollFooter>
      <Toolbar />
    </React.Fragment>
  );
}

export default HeaderBar;

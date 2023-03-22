import React, { useContext } from "react";
import { Box, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { SettingsContext } from "~store/settings-context";
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {ShoppingCartCheckout, ArrowDownwardOutlined, MoreHorizOutlined} from "@mui/icons-material";
import HeaderLight from "~components/Layout/HeaderLight";
import Footer from "~components/Layout/Footer";
import TabPanel from "~components/Dashboard/TabPanel";

const iconButtonStyle = {
  color: "info",
  size: "small",
  sx: {border: 1, marginBottom: 1}
}

interface Props {
  children?: React.ReactNode;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Dashboard = (props: Props) => {
  const settingsContext = useContext(SettingsContext);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <HeaderLight title={"Dashboard"} />

      <Grid container item height={480} marginTop={8} display="block" alignItems="flex-start">
        <Grid item xs={12} textAlign="left">
          <Typography variant="h4" textAlign="left" marginTop={1} marginBottom={1}>
            US$100.23
          </Typography>
        </Grid>

        <Grid container item xs={12} display="flex" alignItems="flex-start" justifyContent={"flex-start"}>
          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <AddIcon color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left" paddingLeft={1}>Add</Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <AutorenewIcon color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left">Convert</Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <ShoppingCartCheckout color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left" paddingLeft={0.5}>Spend</Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <ArrowDownwardOutlined color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left" >Request</Typography>
          </Grid>

          <Grid item xs={2} textAlign={"left"}>
            <IconButton sx={iconButtonStyle}>
              <MoreHorizOutlined color="info" />
            </IconButton>
            <Typography fontSize={12} textAlign="left" paddingLeft={0.7}>More</Typography>
          </Grid>

          <Grid item xs={2}></Grid>
        </Grid>

        <Grid container item xs={12} marginTop={2}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab
                  label="Spend" {...a11yProps(0)}
                  sx={{textTransform: 'none', fontSize: 14, alignItems: 'self-start', justifySelf: 'flex-start'}}
                />
                <Tab
                  label="Transactions" {...a11yProps(1)}
                  sx={{textTransform: 'none', fontSize: 14, alignItems: 'self-start', justifySelf: 'flex-start'}}
                />
                <Tab
                  label="Assets" {...a11yProps(4)}
                  sx={{textTransform: 'none', fontSize: 16, alignItems: 'self-start', justifySelf: 'flex-start'}}
                />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              Spend
            </TabPanel>

            <TabPanel value={value} index={1}>
              Transactions
            </TabPanel>

            <TabPanel value={value} index={2}>
              Assets
            </TabPanel>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </React.Fragment>
  )
}

export default Dashboard

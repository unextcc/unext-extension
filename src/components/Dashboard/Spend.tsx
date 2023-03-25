import React from "react";
import { Grid } from "@mui/material";
import Merchant from "~components/Dashboard/Merchant";


const Spend = () => {
  return (
    <React.Fragment>
      <Grid
        item
        maxHeight={280}
        xs={12}
        sx={{
          overflowX: "hidden",
          "&::-webkit-scrollbar": {width: 2},
          "&::-webkit-scrollbar-track": {backgroundColor: "lightgray"},
          "&::-webkit-scrollbar-thumb": {backgroundColor: "gray", borderRadius: 0}
        }}
      >
        <Merchant
          title="APMEX"
          description="Buy gold, silver and other precious metals using USDC."
          link="https://www.apmex.com/"
        />

        <Merchant
          title="Dish TV"
          description="Open up a world of movies, TV, and live event entertainment options with a Dish TV subscription."
          link="https://www.dish.com/"
        />

        <Merchant
          title="ExpressVPN"
          description="Browse the web safely and securely with a virtual private network (VPN) from ExpressVPN."
          link="https://www.expressvpn.com/"
        />
      </Grid>
    </React.Fragment>
  )
}

export default Spend;

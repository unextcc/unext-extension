import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import {
  Button,
  Divider,
  Grid,
  ListItemText,
  MenuItem,
  MenuList,
  Typography
} from "@mui/material"
import React, { useContext, useState } from "react"

import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { SettingsContext } from "~store/settings-context"

interface Props {
  children?: React.ReactNode
}

const Settings = (props: Props) => {
  const settingsContext = useContext(SettingsContext)

  return (
    <Grid
      container
      item
      xs={12}
      display={"block"}
      direction={"row"}
      alignItems={"start"}
      marginBottom={6}>
      <HeaderLight title={"Settings"} />

      <Grid
        item
        maxHeight={475}
        xs={12}
        sx={{
          maxHeight: 475,
          overflowX: "hidden",
          "&::-webkit-scrollbar": { width: 2 },
          "&::-webkit-scrollbar-track": { backgroundColor: "lightgray" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: 0
          }
        }}>
        <Typography variant={"h6"} marginLeft={2}>
          Wallet
        </Typography>

        <MenuList>
          <MenuItem
            onClick={() => settingsContext.shownPageHandler("importWallet")}>
            <ListItemText>Import New Wallet</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>
              {">"}
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={() => settingsContext.shownPageHandler("showPrivateKey")}>
            <ListItemText>Show Secret Private Key</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>
              {">"}
            </Typography>
          </MenuItem>
        </MenuList>

        <Divider />

        <Typography variant={"h6"} marginLeft={2}>
          General
        </Typography>

        <MenuList>
          <MenuItem>
            <ListItemText>Manage notifications</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>
              {">"}
            </Typography>
          </MenuItem>
        </MenuList>

        <Divider />

        <Typography variant={"h6"} marginLeft={2}>
          Security
        </Typography>

        <MenuList>
          <MenuItem
            onClick={() => settingsContext.shownPageHandler("lockPasswordTtl")}>
            <ListItemText>Security Lock</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>
              {settingsContext.lockPasswordTimeToLive / 60}
              {settingsContext.lockPasswordTimeToLive < 120
                ? ` hour`
                : ` hours`}
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={() =>
              settingsContext.shownPageHandler("changeWalletPassword")
            }>
            <ListItemText>Change password</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>
              {">"}
            </Typography>
          </MenuItem>
        </MenuList>

        <Divider />

        <Typography variant={"h6"} marginLeft={2}>
          About
        </Typography>

        <MenuList>
          <MenuItem>
            <ListItemText>Help</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>
              <OpenInNewIcon />
            </Typography>
          </MenuItem>

          <MenuItem>
            <ListItemText>Terms of service</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>
              <OpenInNewIcon />
            </Typography>
          </MenuItem>

          <MenuItem>
            <ListItemText>Version</ListItemText>
            <Typography variant={"body2"} color={"text.secondary"}>
              {"0.0.1"}
            </Typography>
          </MenuItem>
        </MenuList>

        <Grid
          item
          xs={12}
          textAlign="center"
          marginTop={2}
          paddingLeft={3}
          paddingRight={3}>
          <Button
            fullWidth
            variant="outlined"
            color="info"
            onClick={() => {
              settingsContext.lockPasswordHandler("", 0)
            }}>
            Lock Wallet
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          textAlign="center"
          marginTop={1}
          marginBottom={5}
          paddingLeft={3}
          paddingRight={3}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              settingsContext.shownPageHandler("logout")
            }}>
            Sign Out
          </Button>
        </Grid>
      </Grid>

      <Footer />
    </Grid>
  )
}

export default Settings

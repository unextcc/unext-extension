import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  MoreHorizOutlined,
  ShoppingCartCheckout
} from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import { Grid, IconButton, Typography } from "@mui/material"
import { type FunctionComponent, useContext } from "react"
import type React from "react"

import { SettingsContext } from "~store/settings-context"

interface Props {
  children?: React.ReactNode
  add?: boolean
  convert?: boolean
  send?: boolean
  spend?: boolean
  request?: boolean
  more?: boolean
}

const iconButtonStyle = {
  color: "info",
  size: "small",
  sx: { border: 1, marginBottom: 1 }
}

const ActionMenu: FunctionComponent<Props> = (props) => {
  const settingsContext = useContext(SettingsContext)

  return (
    <Grid
      container
      item
      xs={12}
      display="flex"
      alignItems="flex-start"
      justifyContent={"flex-start"}>
      {/* add */}
      {props.add && (
        <Grid item xs={2} textAlign={"left"}>
          <IconButton
            sx={iconButtonStyle}
            onClick={() => settingsContext.shownPageHandler("add")}>
            <AddIcon color={"info"} />
          </IconButton>
          <Typography fontSize={12} textAlign="left" paddingLeft={1}>
            Add
          </Typography>
        </Grid>
      )}

      {/* convert */}
      {props.convert && (
        <Grid item xs={2} textAlign={"left"}>
          <IconButton
            sx={iconButtonStyle}
            onClick={() => settingsContext.shownPageHandler("convert")}>
            <AutorenewIcon color="info" />
          </IconButton>
          <Typography fontSize={12} textAlign="left">
            Convert
          </Typography>
        </Grid>
      )}

      {/* spend */}
      {props.spend && (
        <Grid item xs={2} textAlign={"left"}>
          <IconButton
            sx={iconButtonStyle}
            onClick={() => settingsContext.shownPageHandler("spend")}>
            <ShoppingCartCheckout color="info" />
          </IconButton>
          <Typography fontSize={12} textAlign="left" paddingLeft={0.5}>
            Spend
          </Typography>
        </Grid>
      )}

      {/* send */}
      {props.send && (
        <Grid
          item
          xs={2}
          textAlign={"left"}
          onClick={() => settingsContext.shownPageHandler("send")}>
          <IconButton
            sx={iconButtonStyle}
            onClick={() => settingsContext.shownPageHandler("send")}>
            <ArrowUpwardOutlined color="info" />
          </IconButton>
          <Typography fontSize={12} textAlign="left" paddingLeft={0.7}>
            Send
          </Typography>
        </Grid>
      )}

      {/* request */}
      {props.request && (
        <Grid item xs={2} textAlign={"left"}>
          <IconButton
            sx={iconButtonStyle}
            onClick={() => settingsContext.shownPageHandler("request")}>
            <ArrowDownwardOutlined color="info" />
          </IconButton>
          <Typography fontSize={12} textAlign="left">
            Request
          </Typography>
        </Grid>
      )}

      {/* more */}
      {props.more && (
        <Grid item xs={2} textAlign={"left"}>
          <IconButton
            sx={iconButtonStyle}
            onClick={() => settingsContext.shownPageHandler("more")}>
            <MoreHorizOutlined color="info" />
          </IconButton>
          <Typography fontSize={12} textAlign="left" paddingLeft={0.7}>
            More
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

ActionMenu.defaultProps = {
  add: true,
  children: true,
  convert: true,
  more: true,
  request: true,
  spend: true,
  send: true
}

export default ActionMenu

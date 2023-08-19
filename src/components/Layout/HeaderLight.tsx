import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { IconButton, Link } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import * as React from "react"
import { useContext } from "react"

import { SettingsContext } from "~store/settings-context"
import { Web3AuthContext } from "~store/web3auth-context"

interface Props {
  title?: string
  goBackPage?: string
  goBackPageTitle?: string
}

const defaultProps = {
  title: "",
  goBackPage: "",
  goBackPageTitle: ""
} as Props

const ElevationScroll = (props: { children: React.ReactElement }) => {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}

const HeaderBar = (props: Props) => {
  props = { ...defaultProps, ...props }

  const settingsContext = useContext(SettingsContext)
  const web3authContext = useContext(Web3AuthContext)

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          color={"default"}
          sx={{
            borderBottom: 1,
            borderColor: "lightgray",
            backgroundColor: "white"
          }}>
          <Toolbar disableGutters>
            {props.goBackPage && (
              <Typography variant="h6" component="div" color={"#1976d2"}>
                <IconButton
                  onClick={() => {
                    settingsContext.shownPageHandler(props.goBackPage!)
                  }}>
                  <ArrowBackIcon />
                </IconButton>
                {props.goBackPageTitle}
              </Typography>
            )}
            {props.title && (
              <Typography
                variant="h6"
                component="div"
                color={"#1976d2"}
                paddingLeft={2}>
                {props.title}
              </Typography>
            )}
            -
            <Link
              onClick={() => {
                web3authContext.logout()
              }}>
              Logout
            </Link>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar disableGutters />
    </React.Fragment>
  )
}

export default HeaderBar

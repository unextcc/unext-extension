import { Alert, Grid, Switch, Typography } from "@mui/material"
import { useContext, useState } from "react"

import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { SettingsContext } from "~store/settings-context"
import { timeout } from "~utils/other"

interface Props {
  children?: React.ReactNode
}

type formType = {
  requirePasswordWhenSend: boolean
}

const ManageNotification = (props: Props) => {
  const settingsContext = useContext(SettingsContext)

  const [saveSate, setSaveState] = useState("idle")

  const enableAlerts = settingsContext.enableAlerts

  const switchHandler = async () => {
    setSaveState("saving")

    if (settingsContext.enableAlerts === true) {
      settingsContext.enableAlertsHandler(false)
    } else {
      settingsContext.enableAlertsHandler(true)
    }

    await timeout(500)

    setSaveState("saved")
  }

  return (
    <Grid container item xs={12} display="block">
      <HeaderLight goBackPage={"settings"} title="Notification settings" />

      <Grid container item xs={12} marginTop={1}>
        <Typography fontWeight="bold" marginBottom={1}>
          Turn on/off alerts:
          <Switch
            checked={enableAlerts}
            onChange={switchHandler}
            color="info"
            size="medium"
          />
        </Typography>
      </Grid>

      {saveSate === "saving" ? (
        <Alert severity="success" sx={{ textAlign: "center" }}>
          {enableAlerts ? "Turned on" : "Turned off"}
        </Alert>
      ) : (
        ""
      )}

      <Footer />
    </Grid>
  )
}

export default ManageNotification

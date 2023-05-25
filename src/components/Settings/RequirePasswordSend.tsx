import { yupResolver } from "@hookform/resolvers/yup"
import { Alert, Button, Grid, Switch, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as Yup from "yup"

import HeaderLight from "~components/Layout/HeaderLight"
import { SettingsContext } from "~store/settings-context"
import { timeout } from "~utils/other"

interface Props {
  children?: React.ReactNode
}

type formType = {
  requirePasswordWhenSend: boolean
}

const RequirePasswordWhenSend = (props: Props) => {
  const settingsContext = useContext(SettingsContext)

  const [saveSate, setSaveState] = useState("idle")

  const requirePasswordWhenSend = settingsContext.requirePasswordWhenSend

  const switchHandler = async () => {
    setSaveState("saving")

    if (settingsContext.requirePasswordWhenSend === true) {
      settingsContext.requirePasswordWhenSendHandler(false)
    } else {
      settingsContext.requirePasswordWhenSendHandler(true)
    }

    await timeout(1000)

    setSaveState("saved")
  }

  return (
    <Grid container item xs={12}>
      <HeaderLight goBackPage={"settings"} title="Set Wallet Lock Time" />

      <Grid container item xs={12} display={"block"} marginTop={9}>
        <Typography fontWeight="bold" marginBottom={1}>
          Require password when sending:
          <Switch
            checked={requirePasswordWhenSend}
            onChange={switchHandler}
            color="info"
            size="medium"
          />
        </Typography>
        {saveSate === "saving" ? (
          <Alert severity="success" sx={{ textAlign: "center" }}>
            Saved...
          </Alert>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  )
}

export default RequirePasswordWhenSend

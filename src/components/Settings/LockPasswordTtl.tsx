import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { SettingsContext } from "~store/settings-context"
import { timeout } from "~utils/other"

type formType = {
  lockPasswordTimeToLive: number
}

interface Props {
  children?: React.ReactNode
}

const LockPasswordTtl = () => {
  const settingsContext = useContext(SettingsContext)

  const [saveSate, setSaveState] = useState("idle")

  const formSchema = Yup.object().shape({
    lockPasswordTimeToLive: Yup.number().required(
      "Please enter time in minutes!"
    )
  })

  const { register, setError, formState, handleSubmit } = useForm<formType>({
    resolver: yupResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      lockPasswordTimeToLive: settingsContext.lockPasswordTimeToLive
    }
  })

  const onSubmit = async (data: formType) => {
    setSaveState("saving")

    if (data.lockPasswordTimeToLive <= 0) {
      setError("lockPasswordTimeToLive", {
        type: "custom",
        message: "Please enter a positive value!"
      })
    } else {
      settingsContext.lockPasswordTimeToLiveHandler(data.lockPasswordTimeToLive)
    }

    await timeout(1000)

    setSaveState("saved")
  }

  return (
    <Grid container item xs={12}>
      <HeaderLight goBackPage={"settings"} title="Set Wallet Lock Time" />

      <Grid container item xs={12} display={"block"} marginTop={9}>
        <Typography fontWeight="bold" marginBottom={1}>
          Lock wallet after
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            fullWidth
            id="lock-password-time-to-live"
            color="info"
            select
            type="number"
            defaultValue={settingsContext.lockPasswordTimeToLive}
            sx={{ marginBottom: 2 }}
            inputProps={register("lockPasswordTimeToLive", {
              required: "Please enter a time in minutes!"
            })}
            helperText={
              formState.errors.lockPasswordTimeToLive &&
              formState.errors.lockPasswordTimeToLive?.message
            }>
            <MenuItem key={0} value={15}>
              15 minutes
            </MenuItem>
            <MenuItem key={1} value={60}>
              1 hour
            </MenuItem>
            <MenuItem key={2} value={1440}>
              24 hours
            </MenuItem>
          </TextField>

          <Typography>
            This timer will determine how long to wait before automatically
            locking your wallet after being idle. (Enter 1440 for a day, 60 for
            an hour)
          </Typography>

          <Grid item xs={12} marginTop={3}>
            <Button
              fullWidth
              variant="outlined"
              color="info"
              type="submit"
              disabled={saveSate === "saving"}>
              {saveSate === "saving" ? `Saved` : `Save`}
            </Button>
          </Grid>
        </form>
      </Grid>

      <Footer />
    </Grid>
  )
}

export default LockPasswordTtl

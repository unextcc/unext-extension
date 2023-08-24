import { yupResolver } from "@hookform/resolvers/yup"
import GoogleIcon from "@mui/icons-material/Google"
import {
  Button,
  Divider,
  Grid,
  Icon,
  TextField,
  Typography
} from "@mui/material"
import IconButton from "@mui/material/IconButton"
import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import { SocialIcon } from "react-social-icons"
import * as Yup from "yup"

import Header from "~components/Layout/Header"
import { Web3AuthContext } from "~store/web3auth-context"

interface Props {
  children?: React.ReactNode
  isFullPage: boolean
}

type formType = {
  email: string
}

const LoginPage = (props: Props) => {
  const web3authContext = useContext(Web3AuthContext)

  const formSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email()
  })

  const { register, setError, handleSubmit, formState, getValues } =
    useForm<formType>({
      resolver: yupResolver(formSchema),
      mode: "onChange"
    })

  const formHandler = () => {
    web3authContext.loginEmail(getValues("email"))
  }

  console.log("isFullPage " + props.isFullPage)

  return (
    <React.Fragment>
      <Header title={"uNeXT Wallet"} subTitle={"Next step for digital money"} />

      {!props.isFullPage ? (
        <Grid container alignContent="flex-start">
          <Grid item xs={12} marginBottom={1}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => chrome.tabs.create({ url: "popup.html" })}>
              Login
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container alignContent="flex-start">
          <Grid item xs={12} marginBottom={1}>
            <Button
              variant={"outlined"}
              startIcon={<GoogleIcon fontSize="large" />}
              fullWidth={true}
              size="large"
              onClick={() => {
                web3authContext.login("google")
              }}>
              Login with Google
            </Button>
          </Grid>

          <Grid container item xs={12} marginBottom={6}>
            <Grid item xs={4} alignContent="center" textAlign="center">
              <IconButton onClick={() => web3authContext.login("facebook")}>
                <SocialIcon
                  label="Login with Facebook"
                  network="facebook"
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Grid>

            <Grid item xs={4} alignContent="center" textAlign="center">
              <IconButton onClick={() => web3authContext.login("twitch")}>
                <SocialIcon
                  label="Login with Twitch"
                  network="twitch"
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Grid>

            <Grid item xs={4} alignContent="center" textAlign="center">
              <IconButton onClick={() => web3authContext.login("discord")}>
                <SocialIcon
                  label="Login with Discord"
                  network="discord"
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container item xs={12} marginTop={2}>
            <Typography>Login with Email:</Typography>
            <form style={{ width: "100%" }}>
              <TextField
                id="email"
                variant="outlined"
                autoComplete="on"
                color="primary"
                fullWidth
                size="small"
                margin="normal"
                type="email"
                error={formState.touchedFields.email && !formState.isValid}
                helperText={
                  formState.errors.email && formState.errors.email?.message
                }
                {...register("email")}
              />
              <Button
                fullWidth
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => {
                  formHandler()
                }}
                disabled={!formState.isValid}>
                Continue
              </Button>
            </form>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}

export default LoginPage

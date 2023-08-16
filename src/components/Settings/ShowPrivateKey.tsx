import { yupResolver } from "@hookform/resolvers/yup"
import { CopyAll, Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { SettingsContext } from "~store/settings-context"
import { WalletContext } from "~store/wallet-context"
import { decryptAES, encryptAES, verifyPassword } from "~utils/encryption"

type passwordFormType = {
  passwordInput: string
  confirmDoNotSharePrivateKey: boolean
}

interface Props {
  children?: React.ReactNode
}

const ShowPrivateKey = (props: Props) => {
  const [step, setStep] = useState("passwordStep")
  const [privateKey, setPrivateKey] = useState<string>("")

  const settingsContext = useContext(SettingsContext)
  const walletContext = useContext(WalletContext)

  const passwordFormSchema = Yup.object().shape({
    passwordInput: Yup.string().required("Password is required"),
    confirmDoNotSharePrivateKey: Yup.bool().oneOf(
      [true],
      "Please confirm that you will not share your secret private key!"
    )
  })

  const {
    register: registerPassword,
    setError: setErrorPassword,
    handleSubmit: handleSubmitPassword,
    formState: formStatePassword
  } = useForm<passwordFormType>({
    resolver: yupResolver(passwordFormSchema),
    mode: "onChange"
  })

  const date: Date = new Date()

  const passwordOnSubmit = async (data: passwordFormType) => {
    const isPasswordCorrect = verifyPassword(
      walletContext.encryptedPrivateKey,
      data.passwordInput
    )

    const decryptedPrivateKey = decryptAES(
      walletContext.encryptedPrivateKey,
      data.passwordInput
    )

    const encryptedData = encryptAES(
      "d2699f0ffbeb26a29e6e46ceac8f20be4af872b8a645d07dfa0512106cbda07f",
      "Polo1043"
    )

    console.log("encryptedData " + encryptedData)

    const decryptedData = decryptAES(encryptedData, "Polo1043")

    console.log("decryptedData " + decryptedData)

    console.log("data.passwordInput " + data.passwordInput)

    console.log(
      "walletContext.encryptedPrivateKey " + walletContext.encryptedPrivateKey
    )
    console.log("decryptedPrivateKey " + decryptedPrivateKey)

    console.log(isPasswordCorrect)

    if (isPasswordCorrect) {
      setPrivateKey(
        decryptAES(walletContext.encryptedPrivateKey, data.passwordInput)
      )
      setStep("showPrivateKeyStep")
    } else {
      setErrorPassword("passwordInput", {
        type: "custom",
        message: "Incorrect wallet password"
      })
    }
  }

  const [togglePassword, setTogglePassword] = useState<boolean>(false)
  const togglePasswordHandler = () => {
    if (togglePassword) {
      setTogglePassword(false)
    } else {
      setTogglePassword(true)
    }
  }

  const passwordStep = (
    <Grid
      container
      item
      xs={12}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"stretch"}
      marginTop={7}>
      <Grid item xs={12} padding={1}>
        <Typography marginTop={3}>
          Please enter your wallet password to show your secret private key.
          Turn off screen sharing. Don't share it with anyone.
        </Typography>

        <form onSubmit={handleSubmitPassword(passwordOnSubmit)}>
          <Typography textAlign={"left"} fontWeight={"bold"} marginTop={5}>
            Wallet password
          </Typography>

          <TextField
            id="password-input"
            label="Enter Wallet Password"
            autoComplete="on"
            fullWidth
            type={togglePassword ? "text" : "password"}
            style={{ marginTop: 10 }}
            color={"info"}
            {...registerPassword("passwordInput")}
            error={
              formStatePassword.touchedFields.passwordInput &&
              !formStatePassword.isValid
            }
            helperText={
              formStatePassword.errors.passwordInput &&
              formStatePassword.errors.passwordInput?.message
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>
                  {togglePassword ? (
                    <Visibility
                      style={{ cursor: "pointer" }}
                      onClick={() => togglePasswordHandler()}
                    />
                  ) : (
                    <VisibilityOff
                      style={{ cursor: "pointer" }}
                      onClick={() => togglePasswordHandler()}
                    />
                  )}
                </InputAdornment>
              )
            }}
          />

          <Grid container item xs={12} marginTop={1} marginBottom={1}>
            <Grid item xs={1}>
              <Checkbox
                id="confirm-do-not-share-private-key"
                size={"small"}
                {...registerPassword("confirmDoNotSharePrivateKey")}
              />
            </Grid>

            <Grid item xs={11} paddingLeft={1}>
              <Typography variant={"subtitle2"} textAlign={"left"}>
                I will not share my recovery phrase with anyone, including
                uNeXT. If I do, I'll lose my assets.
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} marginTop={5}>
            <Button
              variant={"outlined"}
              fullWidth={true}
              type={"submit"}
              disabled={!formStatePassword.isValid}>
              Next
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )

  const showPrivateKeyStep = (
    <Grid
      container
      item
      xs={12}
      display={"inline-block"}
      direction={"row"}
      alignItems={"stretch"}
      marginTop={7}>
      <Typography variant={"h5"} fontWeight={"bold"}>
        Your secret private key
      </Typography>

      <Typography marginTop={3}>
        Save your secret private key in a safe place. Do not share them with
        anyone, even uNeXT. Anyone with your recovery phrase can steal your
        funds.
      </Typography>

      <Grid container item xs={12} marginTop={5} maxWidth={359}>
        <Typography overflow={"auto"}>{privateKey}</Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<CopyAll />}
          onClick={() => navigator.clipboard.writeText(privateKey)}
          sx={{ marginTop: 1 }}>
          COPY SECRET PRIVATE KEY
        </Button>
      </Grid>

      <Grid item xs={12} marginTop={5}>
        <Button
          variant={"outlined"}
          fullWidth={true}
          onClick={() => settingsContext.shownPageHandler("dashboard")}>
          Done
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <React.Fragment>
      <HeaderLight goBackPage={"settings"} title={"Show secret private key"} />

      {step === "passwordStep" && passwordStep}
      {step === "showPrivateKeyStep" && showPrivateKeyStep}

      <Footer />
    </React.Fragment>
  )
}

export default ShowPrivateKey

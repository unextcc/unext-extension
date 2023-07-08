import { yupResolver } from "@hookform/resolvers/yup"
import { CopyAll, Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

import HeaderLight from "~components/Layout/HeaderLight"
import { config } from "~contents/config"
import { useWeb3CreateAccount } from "~hooks/use-web3"
import { SettingsContext } from "~store/settings-context"
import { WalletContext } from "~store/wallet-context"
import { getTimeNow } from "~utils/other"

interface Props {
  children?: React.ReactNode
}

type formType = {
  password: string
  confirmPassword: string
  confirmCreateWallet: boolean
}

const CreateNewWallet = () => {
  const settingsContext = useContext(SettingsContext)
  const walletContext = useContext(WalletContext)

  const [step, setStep] = useState("passwordStep")
  const [togglePassword, setTogglePassword] = useState<boolean>(false)

  const { account, error, isError, status, createAccount } =
    useWeb3CreateAccount()

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    confirmCreateWallet: Yup.bool().oneOf(
      [true],
      "Please confirm that you have saved the secrets in safe place!"
    )
  })

  const { register, getValues, handleSubmit, formState } = useForm<formType>({
    resolver: yupResolver(formSchema),
    mode: "onChange"
  })

  const { errors } = formState

  const onSubmit = async (data: formType) => {
    // create account
    await createAccount(data.password, config.tokens[0].providerUrl)

    // set step
    setStep("createWalletStep")
  }

  const createWalletHandler = async () => {
    walletContext.saveWallet([
      {
        id: 0,
        address: account.address,
        chain: "MATIC",
        network: "polygon",
        tokens: [0, 1]
      }
    ])

    walletContext.saveEncryptedPrivateKey(account.encryptedPrivateKey)

    settingsContext.lockPasswordHandler(getValues("password"), getTimeNow())
    settingsContext.lockPasswordTimeToLiveHandler(86400)
    settingsContext.requirePasswordWhenSendHandler(false)

    window.location.reload()
  }

  const togglePasswordHandler = () => {
    if (togglePassword) {
      setTogglePassword(false)
    } else {
      setTogglePassword(true)
    }
  }

  // steps
  // 1. passwordStep: ask password from user
  // 2. createWalletStep: creates the account, privateKey and wallet to secure storage

  const passwordStep = (
    <Grid container>
      <Grid item container height={465}>
        <Grid
          container
          item
          display={"flex"}
          alignItems={"center"}
          direction={"row"}>
          <Typography>
            Choose a wallet password that will be used to unlock this
            application. While the application is locked, the secret recovery
            phrase will be encrypted, which prevents sending/receiving funds and
            managing accounts.
          </Typography>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12}>
            <TextField
              id={"password-input"}
              label={"New Wallet Password"}
              type={togglePassword ? "text" : "password"}
              color={"info"}
              variant={"outlined"}
              fullWidth
              {...register("password")}
              error={formState.touchedFields.password && !formState.isValid}
              helperText={
                formState.errors.password && formState.errors.password?.message
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
          </Grid>

          <Grid item xs={12} marginTop={1}>
            <TextField
              id={"confirm-password-input"}
              label={"Confirm New Wallet Password"}
              type={togglePassword ? "text" : "password"}
              color={"info"}
              variant={"outlined"}
              fullWidth
              {...register("confirmPassword")}
              error={
                formState.touchedFields.confirmPassword && !formState.isValid
              }
              helperText={
                formState.errors.confirmPassword &&
                formState.errors.confirmPassword?.message
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
          </Grid>
        </Grid>
      </Grid>

      <Grid item container xs={12} height={40}>
        <Grid item xs={6} textAlign={"left"}>
          <Button
            variant={"outlined"}
            onClick={() => settingsContext.shownPageHandler("configureWallet")}>
            BACK
          </Button>
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <Button
            variant={"outlined"}
            disabled={!formState.isValid}
            type={"submit"}>
            NEXT
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

  const createWalletStep = (
    <Grid container>
      <Grid item container xs={12} height={465}>
        <Grid
          item
          container
          display={"flex"}
          alignItems={"center"}
          direction={"row"}>
          <Alert variant={"filled"} severity={"warning"}>
            <Typography>
              Make sure to write down your secret private key or save it
              somewhere safe, and never share it with anyone!
            </Typography>

            <Typography>
              It is the master key to all of your accounts, and the only way to
              recover your funds in an emergency.
            </Typography>
          </Alert>
        </Grid>

        <Grid item xs={12}>
          <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
            Secret Private Key:{" "}
          </Typography>
          <div
            style={{
              overflow: "auto",
              maxWidth: 700,
              marginBottom: "8px",
              marginTop: "8px"
            }}>
            <Typography width={360}>{account.privateKey}</Typography>
          </div>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<CopyAll />}
            onClick={() => navigator.clipboard.writeText(account.privateKey)}>
            COPY SECRET PRIVATE KEY
          </Button>
        </Grid>
      </Grid>

      <Grid item container xs={12} height={40}>
        <Grid item xs={6} textAlign={"left"}>
          <Button
            variant={"outlined"}
            onClick={() => {
              setStep("passwordStep")
            }}>
            BACK
          </Button>
        </Grid>

        <Grid item xs={6} textAlign={"right"}>
          <Button
            variant={"outlined"}
            onClick={async () => {
              await createWalletHandler()
            }}>
            Create Wallet
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <React.Fragment>
      <Grid container>
        <HeaderLight title={"Create New Wallet"} />
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === "passwordStep" && passwordStep}
          {step === "createWalletStep" && createWalletStep}
        </form>
      </Grid>
    </React.Fragment>
  )
}

export default CreateNewWallet

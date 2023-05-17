import { yupResolver } from "@hookform/resolvers/yup"
import { CopyAll, Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Alert,
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography
} from "@mui/material"
import React from "react"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { useWeb3GetAddressFromPrivateKey } from "~hooks/use-web3"
import { SettingsContext } from "~store/settings-context"
import { WalletContext } from "~store/wallet-context"
import { encryptAES } from "~utils/encryption"

type formType = {
  password: string
  confirmPassword: string
  confirmCreateWallet: boolean
  privateKey: string
}

interface Props {
  children?: React.ReactNode
}

const ImportWallet = (props: Props) => {
  const settingsContext = useContext(SettingsContext)
  const walletContext = useContext(WalletContext)
  const [step, setStep] = useState<string>("passwordPrivateKeyStep")
  const [encryptedPrivateKey, setEncryptedPrivateKey] = useState<string>("")
  const [privateKey, setPrivateKey] = useState<string>("")

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
    ),
    privateKey: Yup.string()
      .required("Please enter a wallet private key!")
      .min(66, "Private key must be at least 67 characters long")
  })

  const { register, setError, handleSubmit, formState } = useForm<formType>({
    resolver: yupResolver(formSchema),
    mode: "onChange"
  })

  const { address, error, getAddressFromPrivateKey } =
    useWeb3GetAddressFromPrivateKey()

  const passwordPrivateKeyStepHandler = (data: formType) => {
    // get encrypted private key
    setEncryptedPrivateKey(encryptAES(data.privateKey, data.password))

    // get account address from private key
    getAddressFromPrivateKey(data.privateKey, data.password)

    // set private key
    setPrivateKey(data.privateKey)

    // go to next step
    setStep("saveWalletStep")
  }

  const saveWalletStepHanlder = async () => {
    // delete current wallet & related data from local storage
    if (walletContext.isWalletConfigured) {
      console.log("Deleting current wallet...")
      walletContext.deleteWallet()
    }
    // save private key to local storage
    walletContext.saveEncryptedPrivateKey(encryptedPrivateKey)

    walletContext.saveWallet([
      {
        id: 0,
        address: address,
        chain: "MATIC",
        network: "polygon",
        tokens: [0]
      }
    ])

    window.location.reload()
  }

  const [togglePassword, setTogglePassword] = useState<boolean>(false)
  const togglePasswordHandler = () => {
    if (togglePassword) {
      setTogglePassword(false)
    } else {
      setTogglePassword(true)
    }
  }

  const warningMessage = (
    <Alert severity="error" variant="outlined" sx={{ marginBottom: 1 }}>
      <Typography variant="body1" fontWeight="bold">
        Make sure to save your current wallet's private key before proceeding!
      </Typography>
      {step === "saveWalletStep" ? (
        <Typography variant="body1">
          This operation will delete your current wallet & wallet data. Make
          sure that you&nbsp;
          <Link
            onClick={() => settingsContext.shownPageHandler("showPrivateKey")}
            sx={{ cursor: "pointer" }}>
            backup your private key
          </Link>
          &nbsp; before importing your new wallet.
        </Typography>
      ) : (
        <Typography>
          <Link
            onClick={() => settingsContext.shownPageHandler("showPrivateKey")}
            sx={{ cursor: "pointer" }}>
            Backup your private key
          </Link>
        </Typography>
      )}
    </Alert>
  )

  const passwordPrivateKeyStep = (
    <Grid
      container
      item
      xs={12}
      display={"inline-block"}
      direction={"row"}
      alignItems={"stretch"}
      marginTop={7}>
      <Grid item xs={12}>
        {warningMessage}

        <form onSubmit={handleSubmit(passwordPrivateKeyStepHandler)}>
          <TextField
            id="password"
            label="Enter Wallet Password"
            autoComplete="on"
            fullWidth
            type={togglePassword ? "text" : "password"}
            style={{ marginTop: 10 }}
            color={"info"}
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

          <TextField
            id="confirm-password"
            label="Confirm Wallet Password"
            autoComplete="on"
            fullWidth
            type={togglePassword ? "text" : "password"}
            style={{ marginTop: 10 }}
            color={"info"}
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

          <TextField
            id="private-key"
            label="Enter Private Key"
            autoComplete="on"
            fullWidth
            type={togglePassword ? "text" : "password"}
            style={{ marginTop: 10 }}
            color={"info"}
            {...register("privateKey")}
            error={formState.touchedFields.privateKey && !formState.isValid}
            helperText={
              formState.errors.privateKey &&
              formState.errors.privateKey?.message
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

          <Grid container item xs={12}>
            <Grid item xs={1}>
              <Checkbox
                id="confirm-do-not-share-private-key"
                size={"small"}
                {...register("confirmCreateWallet")}
              />
            </Grid>

            <Grid item xs={11} paddingLeft={0.5} paddingTop={1}>
              <Typography>
                I have saved my current secret private key
              </Typography>
            </Grid>
          </Grid>

          <Button
            variant={"outlined"}
            fullWidth={true}
            type={"submit"}
            sx={{ marginTop: 3 }}
            disabled={!formState.isValid}>
            Next
          </Button>
        </form>
      </Grid>
    </Grid>
  )

  const saveWalletStep = (
    <Grid
      container
      item
      xs={12}
      display={"inline-block"}
      direction={"row"}
      alignItems={"stretch"}
      marginTop={7}>
      {warningMessage}
      <Typography variant="body1" fontWeight={"bolder"} marginTop={3}>
        Importing Following Private Key:
      </Typography>
      <Grid item xs={12} maxWidth={359}>
        <Typography
          variant="body1"
          overflow="auto"
          marginTop={1}
          marginBottom={1}>
          {privateKey}
        </Typography>
        <Button
          variant="outlined"
          size="medium"
          startIcon={<CopyAll />}
          onClick={() => navigator.clipboard.writeText(privateKey)}>
          COPY PRIVATE KEY
        </Button>
      </Grid>
      <Grid container item xs={12} marginTop={12}>
        <Grid
          item
          xs={6}
          justifyContent="left"
          alignItems="left"
          textAlign="left">
          <Button
            variant={"outlined"}
            onClick={() => setStep("passwordPrivateKeyStep")}>
            Back
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          justifyContent="right"
          alignItems="right"
          textAlign="right">
          <Button variant="outlined" onClick={() => saveWalletStepHanlder()}>
            Import Wallet
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <React.Fragment>
      <Grid container>
        <HeaderLight goBackPage={"settings"} title={"Import New Wallet"} />

        {step === "passwordPrivateKeyStep" && passwordPrivateKeyStep}
        {step === "saveWalletStep" && saveWalletStep}

        <Footer />
      </Grid>
    </React.Fragment>
  )
}

export default ImportWallet

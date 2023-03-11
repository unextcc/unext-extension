import { Button, Checkbox, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import HeaderLight from "~components/Layout/HeaderLight";
import Footer from "~components/Layout/Footer";
import { CopyAll, Visibility, VisibilityOff } from "@mui/icons-material";
import { SettingsContext } from "~store/settings-context";
import { WalletContext } from "~store/wallet-context";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { decryptAES, verifyPassword } from "~utils/encryption";

type passwordFormType = {
  passwordInput: string;
  confirmDoNotSharePrivateKey: boolean;
}

interface Props {
  children?: React.ReactNode;
}

const ShowPrivateKey = (props: Props) => {
  const [step, setStep] = useState('passwordStep');
  const [privateKey, setPrivateKey] = useState<string>("PrivateKey");

  const settingsContext = useContext(SettingsContext);
  const walletContext = useContext(WalletContext);

  // @ts-ignore
  const wallet = walletContext.wallets[0][0];

  const passwordFormSchema = Yup.object().shape({
    passwordInput: Yup.string()
      .required('Password is required'),
    confirmDoNotSharePrivateKey: Yup.bool()
      .oneOf([true], "Please confirm that you will not share your secret private key!")
  });

  const {
    register: registerPassword,
    setError: setErrorPassword,
    reset: resetPassword,
    handleSubmit: handleSubmitPassword,
    getValues,
    formState: formStatePassword
  } = useForm<passwordFormType>(
    {resolver: yupResolver(passwordFormSchema), mode: "onChange" }
  );

  const date: Date = new Date()

  const passwordOnSubmit = async (data: passwordFormType) => {
    const isPasswordCorrect = verifyPassword(wallet.encryptedPrivateKey, data.passwordInput)

    if (isPasswordCorrect) {
      setPrivateKey(decryptAES(wallet.encryptedPrivateKey, getValues('passwordInput')));
      setStep("showPrivateKeyStep")
    } else {
      setErrorPassword('passwordInput', {type: "custom", message: "Incorrect password"})
    }

    return false;
  }

  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const togglePasswordHandler = () => {
    if (togglePassword) {
      setTogglePassword(false);
    } else {
      setTogglePassword(true);
    }
  }

  const passwordStep = (
    <Grid container item xs={12} display={"flex"} direction={"row"} alignItems={"stretch"}
          marginTop={7}>
      <Grid item xs={12} padding={1}>
        <Typography variant={"h5"} fontWeight={"bold"}>
          Show secret private key
        </Typography>

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
            {...registerPassword('passwordInput')}
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
                {...registerPassword('confirmDoNotSharePrivateKey')}
              />
            </Grid>

            <Grid item xs={11} paddingLeft={1}>
              <Typography variant={"subtitle2"} textAlign={"left"}>
                I will not share my recovery phrase with anyone, including uNeXT. If I do, I'll lose my assets.
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} marginTop={5}>
            <Button
              variant={"outlined"}
              fullWidth={true}
              type={"submit"}
              disabled={!formStatePassword.isValid}
            >
              Next
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )

  const showPrivateKeyStep = (
    <Grid item xs={12} display={"inline-block"} direction={"row"} alignItems={"stretch"} marginTop={7}>
      <Typography variant={"h5"} fontWeight={"bold"}>
        Your secret private key
      </Typography>

      <Typography marginTop={3}>
        Save your secret private key in a safe place. Do not share them with anyone, even uNeXT.
        Anyone with your recovery phrase can steal your funds.
      </Typography>

      <Grid container item xs={12} marginTop={5} maxWidth={359}>
        <Typography overflow={"auto"}>{privateKey}</Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<CopyAll />}
          onClick={() => navigator.clipboard.writeText(privateKey)}
          sx={{marginTop: 1}}
        >
          COPY SECRET PRIVATE KEY
        </Button>
      </Grid>

      <Grid item xs={12} marginTop={5}>
        <Button
          variant={"outlined"} fullWidth={true}
          onClick={() => settingsContext.shownPageHandler('dashboard')}
        >
          Done
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <React.Fragment>
      <HeaderLight goBackPage={"settings"} />

      {step === "passwordStep" && passwordStep}
      {step === "showPrivateKeyStep" && showPrivateKeyStep}

      <Footer />
    </React.Fragment>
  );
}

export default ShowPrivateKey;

import React, { useContext, useState } from "react";
import HeaderLight from "~components/Layout/HeaderLight";
import Footer from "~components/Layout/Footer";
import { Button, Divider, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyPassword } from "~utils/encryption";
import { WalletContext } from "~store/wallet-context";
import { SettingsContext } from "~store/settings-context";

interface Props {
  children?: React.ReactNode;
}

type formType = {
  currentPasswordInput: string;
  newPasswordInput: string;
  confirmNewPasswordInput: string;
}

const ChangeWalletPassword = () => {
  const walletContext = useContext(WalletContext);
  const settingsContext = useContext(SettingsContext)

  // @ts-ignore
  const wallet = walletContext.wallets[0];

  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const [saveSate, setSaveState] = useState("idle");

  const formSchema = Yup.object().shape({
    currentPasswordInput: Yup.string()
      .required("Please enter your current wallet password!"),
    newPasswordInput: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmNewPasswordInput: Yup.string()
      .required('Confirm password is required')
      .min(8, 'Password must be at least 8 characters long')
      .oneOf([Yup.ref('newPasswordInput')], 'Passwords do not match'),
  });

  const {
    setError,
    register,
    getValues,
    handleSubmit,
    formState,
  } = useForm<formType>({ resolver: yupResolver(formSchema), mode: "onChange" });

  const { errors } = formState;

  const onSubmit = async (data: formType) => {
    setSaveState('saving');

    const isPasswordCorrect = verifyPassword(walletContext.encryptedPrivateKey, data.currentPasswordInput);

    if (!isPasswordCorrect) {
      setError('currentPasswordInput', {type: "custom", message: "Incorrect password"});
      setSaveState('error');
      return false
    } {
      walletContext.changeWalletPassword(walletContext.encryptedPrivateKey, data.currentPasswordInput, data.newPasswordInput);

      setSaveState('saved');

      await new Promise(resolve => setTimeout(resolve, 500));

      settingsContext.shownPageHandler('settings');
    }
  }

  const togglePasswordHandler = () => {
    if (togglePassword) {
      setTogglePassword(false);
    } else {
      setTogglePassword(true);
    }
  }

  return (
    <React.Fragment>
      <HeaderLight goBackPage={"settings"} title="Change Wallet Password" />

      <Grid container item xs={12} display={"block"} marginTop={9}>
        <Typography fontWeight="bolder">
          Current Password:
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
          <TextField
            id="current-password-input"
            label="Enter current wallet password"
            autoComplete="on"
            fullWidth
            type={togglePassword ? "text" : "password"}
            style={{ marginTop: 10 }}
            color={"info"}
            {...register('currentPasswordInput')}
            error={
              formState.touchedFields.currentPasswordInput &&
              !formState.isValid
            }
            helperText={
              formState.errors.currentPasswordInput &&
              formState.errors.currentPasswordInput?.message
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

          <Typography fontWeight="bolder" marginTop={2}>
            New Password:
          </Typography>

          <TextField
            id="new-password-input"
            label="Enter new wallet password"
            autoComplete="on"
            fullWidth
            type={togglePassword ? "text" : "password"}
            style={{ marginTop: 10 }}
            color={"info"}
            {...register('newPasswordInput')}
            error={
              formState.touchedFields.newPasswordInput &&
              !formState.isValid
            }
            helperText={
              formState.errors.newPasswordInput &&
              formState.errors.newPasswordInput?.message
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
            id="confirm-new-password-input"
            label="Confirm new wallet password"
            autoComplete="on"
            fullWidth
            type={togglePassword ? "text" : "password"}
            style={{ marginTop: 10 }}
            color={"info"}
            {...register('confirmNewPasswordInput')}
            error={
              formState.touchedFields.confirmNewPasswordInput &&
              !formState.isValid
            }
            helperText={
              formState.errors.confirmNewPasswordInput &&
              formState.errors.confirmNewPasswordInput?.message
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

          <Button
            variant={"outlined"}
            fullWidth
            style={{ marginTop: 32 }}
            disabled={saveSate === "saving"}
            type={"submit"}
          >
            {saveSate === "saving" ? "Saving" : "Change Wallet Password"}
          </Button>
        </form>
      </Grid>

      <Footer />
    </React.Fragment>
  )
}

export default ChangeWalletPassword;

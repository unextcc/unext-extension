import { Button, Checkbox, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import HeaderLight from "~components/Layout/HeaderLight";
import ErrorIcon from '@mui/icons-material/Error';
import { SettingsContext } from "~store/settings-context";
import { WalletContext } from "~store/wallet-context";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type formType = {
  passwordInput: string;
  confirmCopySecretKey: boolean;
}

interface Props {
  children?: React.ReactNode;
}

const Logout = (props: Props) => {
  const settingsContext = useContext(SettingsContext);
  const walletContext = useContext(WalletContext);

  const formSchema = Yup.object().shape({
    confirmCopySecretKey: Yup.bool()
      .oneOf([true], "Please confirm that you have saved your private secret key or recovery phrase!")
  });

  const {
    register: register,
    setError: setError,
    handleSubmit: handleSubmit,
    formState: formState
  } = useForm<formType>(
    {resolver: yupResolver(formSchema), mode: "onChange" }
  );

  const onSubmit = async (data: formType) => {
    walletContext.deleteWallet();
    settingsContext.shownPageHandler("settings");

    return false;
  }

  return (
    <React.Fragment>
      <HeaderLight goBackPage={"settings"} />

      <Grid container item xs={12} display={"flex"} direction={"row"} alignItems={"stretch"} marginTop={7}>
        <Grid item xs={12} alignItems="center" alignContent="center" textAlign="center">
          <ErrorIcon sx={{ fontSize: 180 }} color="error" />
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Typography fontWeight="bold" textAlign="center">
            Sign out and Delete uNeXT Wallet Data
          </Typography>
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Typography textAlign="center">
            You will be sign out after confirming that you have saved or written down your Secret Private Key
            or recovery phrase.
          </Typography>
        </Grid>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            textAlign: "center",
            alignItems: "center",
            alignContent: "center",
            width: "100%",
        }}
        >
          <Grid container item xs={12} display="flex" alignItems="flex-start">
            <Grid item xs={1}>
              <Checkbox
                id="confirm-saved-my-secret-key"
                size={"small"}
                {...register("confirmCopySecretKey")}
              />
            </Grid>

            <Grid item xs={11} paddingLeft={1}>
              <Typography variant={"subtitle2"} textAlign={"left"}>
                I have saved my secret private key or recovery phrase
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} textAlign="center" paddingLeft={3} paddingRight={3} marginTop={3}>
            <Button
              fullWidth variant="outlined" color="info" type="submit"
              disabled={!formState.isValid}
            >
              Sign out
            </Button>
          </Grid>
        </form>

        <Grid item xs={12} textAlign="center" marginTop={1} paddingLeft={3} paddingRight={3}>
          <Button
            fullWidth variant="text" color="inherit"
            onClick={() => settingsContext.shownPageHandler('settings')}
          >
            Go back
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Logout

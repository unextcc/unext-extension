import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button, Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Logo60 } from "~components/logo";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { SettingsContext } from "~store/settings-context";
import Header from "~components/Layout/Header";
import { verifyPassword } from "~utils/encryption";
import walletContext, { WalletContext } from "~store/wallet-context";

interface Props {
  children?: React.ReactNode;
}

type lockPasswordFormType = {
  lockPasswordInput: string;
}

const LockPassword: React.FC<Props> = (props) => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const settingsContext = useContext(SettingsContext);
  const walletContext = useContext(WalletContext);


  // @ts-ignore
  const wallet = walletContext.wallets[0][0];

  const lockPasswordFormSchema = Yup.object().shape({
    lockPasswordInput: Yup.string()
      .required('Password is required')
  });

  const {
    register: registerLockPassword,
    setError: setErrorLockPassword,
    reset: resetLockPassword,
    handleSubmit: handleSubmitLockPassword,
    formState: formStateLockPassword
  } = useForm<lockPasswordFormType>(
    {resolver: yupResolver(lockPasswordFormSchema), mode: "onChange" }
  );

  const date: Date = new Date()

  const lockPasswordOnSubmit = async (data: lockPasswordFormType) => {
    const isPasswordCorrect = verifyPassword(wallet.encryptedPrivateKey, data.lockPasswordInput)

    if (isPasswordCorrect) {
      settingsContext.lockPasswordHandler(data.lockPasswordInput.toString().trim(), date.getTime());
    } else {
      setErrorLockPassword('lockPasswordInput', {type: "custom", message: "Incorrect password"})
    }

    return false;
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
      <Header title={"uNeXT Wallet"} subTitle={"Next Step for Digital Wallets"} />

      <Grid
        container
        item
        display={"flex"}
        height={410}
        direction={"row"}
        textAlign={"end"}
        alignItems={"end"}
        justifyContent={"end"}
      >
        <form onSubmit={handleSubmitLockPassword(lockPasswordOnSubmit)}>
          <Typography textAlign={"left"} fontWeight={"bold"}>
            Unlock with wallet password
          </Typography>

          <TextField
            id="lock-password-input"
            label="Enter Wallet Password"
            autoComplete="on"
            fullWidth
            type={togglePassword ? "text" : "password"}
            style={{ marginTop: 10 }}
            color={"info"}
            {...registerLockPassword('lockPasswordInput')}
            error={
              formStateLockPassword.touchedFields.lockPasswordInput &&
              !formStateLockPassword.isValid
            }
            helperText={
              formStateLockPassword.errors.lockPasswordInput &&
              formStateLockPassword.errors.lockPasswordInput?.message
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
            fullWidth={true}
            style={{ marginTop: 10 }}
            type={"submit"}>
            Unlock Wallet
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default LockPassword;

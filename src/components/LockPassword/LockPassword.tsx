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

interface Props {
  children?: React.ReactNode;
}

type lockPasswordFormType = {
  lockPasswordInput: string;
}

const LockPassword: React.FC<Props> = (props) => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const settingsContext = useContext(SettingsContext)

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
    settingsContext.lockPasswordHandler(data.lockPasswordInput.toString().trim(), date.getTime());
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
      <Grid container display={"block"} >
        <Grid item height={160}>
          <Logo60 />

          <Typography
            variant={"h4"}
            marginTop={2}
            color={"darkblue"}
            fontWeight={"bold"}>
            uNeXT Wallet
          </Typography>

          <Typography color={"gray"} variant={"h6"}>
            Next Step for Digital Wallets
          </Typography>
        </Grid>

        <Grid
          container
          item
          display={"block"}
          marginTop={10}
        >
          <Typography textAlign={"left"} fontWeight={"bold"}>
            Unlock with wallet password
          </Typography>

          <form onSubmit={handleSubmitLockPassword(lockPasswordOnSubmit)}>
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
      </Grid>
    </React.Fragment>
  );
};

export default LockPassword;

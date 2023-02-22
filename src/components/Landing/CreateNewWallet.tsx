import React, { useContext, useState } from "react";
import HeaderLight from "~components/Layout/HeaderLight";
import { Alert, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { CopyAll } from "@mui/icons-material";
import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import { SettingsContext } from "~store/settings-context";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  children?: React.ReactNode;
}

type formType = {
  password: string;
  confirmPassword: string;
  confirmCreateWallet: boolean
}

const CreateNewWallet = () => {
  const settingsContext = useContext(SettingsContext);

  const [step, setStep] = useState('passwordStep');

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
    confirmCreateWallet: Yup.bool()
      .oneOf([true], 'Please confirm that you have saved the secrets in safe place!')
  });

  const {
    register,
    getValues,
    handleSubmit,
    formState,
  } = useForm<formType>({resolver: yupResolver(formSchema), mode: "onChange"});

  const { errors } = formState;

  const onSubmit = async (data: formType) => {
    console.log(JSON.stringify(data, null, 2));
  }

  const passwordStep = (
    <Grid container>
      <Grid item display={"block"}>
        <Typography style={{marginBottom: 5}}>
          Choose a wallet password that will be used to unlock this application.
          While the application is locked, the secret recovery phrase will be encrypted,
          which prevents sending/receiving funds and managing accounts.
        </Typography>

        <Typography fontWeight={"bold"}>
          For the safety of your funds, use a secure password (the bar should be green).
        </Typography>
      </Grid>

      <Grid item container xs={12} marginTop={5} marginBottom={5}>
        <Grid item xs={12}>
          <TextField color={"info"} variant={"filled"} label={"Password"} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField color={"info"} variant={"filled"} label={"Confirm Password"} fullWidth />
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={6} textAlign={"left"}>
          <Button variant={"outlined"}>BACK</Button>
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <Button
            variant={"outlined"}
            onClick={() => {setStep("createWalletStep")}}
          >
            NEXT
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

  const createWalletStep = (
    <Grid container>
      <Grid item xs={12} textAlign={"justify"}>
        <Typography>
          Please take some time to backup the secret recovery private key, to be able to access this
          wallet in the future.
        </Typography>

        <Alert variant={"filled"} severity={"warning"}>
          Make sure to write down your secret private key or save it somewhere safe, and never share
          it with anyone! It is the master key to all of your accounts, and the only way to recover your funds in an emergency.
        </Alert>
      </Grid>

      <Divider />
      <Grid item xs={12} display={"block"} marginTop={5} marginBottom={5} textAlign={"justify"}>
        <Typography variant={"body1"} sx={{fontWeight: "bold"}}>Secret Private Key: </Typography>
        <Typography sx={{
          overflow: "auto",
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical'}}
        >
          0x64478e2091394c9139b04c56eb88597b9a4f787829b1fa7207675616fda705f4
        </Typography>
        <Button
          variant="outlined"
          size="medium"
          startIcon={<CopyAll />}
          onClick={() => navigator.clipboard.writeText("0x64478e2091394c9139b04c56eb88597b9a4f787829b1fa7207675616fda705f4")}
        >
          COPY SECRET PRIVATE KEY
        </Button>
      </Grid>

      <Grid item container xs={12}>
        <Grid item xs={6} textAlign={"left"}>
          <Button
            variant={"outlined"}
            onClick={() => { setStep("passwordStep") }}
          >
            BACK
          </Button>
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <Button
            variant={"outlined"}
            onClick={() => {setStep("createWalletStep")}}
          >
            NEXT
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <React.Fragment>
      <HeaderLight title={"Create New Wallet"} />

      {step === 'passwordStep' && passwordStep}
      {step === 'createWalletStep' && createWalletStep}

    </React.Fragment>
  );
};

export default CreateNewWallet;

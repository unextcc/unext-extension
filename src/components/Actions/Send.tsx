import { yupResolver } from "@hookform/resolvers/yup"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import { time } from "console"
import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { SettingsContext } from "~store/settings-context"
import { WalletContext } from "~store/wallet-context"
import { verifyPassword } from "~utils/encryption"

interface Props {
  children?: React.ReactNode
  sendingCurrency: string
}

type formType = {
  sendingAmount: number
  fromAddress: string
  toAddress: string
  walletPassword: string
  confirmSend: boolean
}

const Send: React.FC = () => {
  const settingsContext = useContext(SettingsContext)
  const walletContext = useContext(WalletContext)
  const wallets = walletContext.wallets[0]
  // firstAmountAndToAddressStep: enter amount step
  // secondConfirmSendStep: confirm & send step
  // thirdSuccessStep: success step
  const [step, setStep] = useState("firstAmountStep")

  const isLockPasswordSet = settingsContext.lockPassword.password !== ""
  const requirePasswordWhenSend = settingsContext.requirePasswordWhenSend

  const formSchema = Yup.object()
    .shape({
      sendingAmount: Yup.number()
        .required("Sending amount is required!")
        .moreThan(0, "Sending amount must greater than 0!"),
      fromAddress: Yup.string()
        .required("Please enter from address")
        .min(42, "Address must be 42 characters long"),
      toAddress: Yup.string()
        .required("Please enter to address")
        .min(42, "Address must be 42 characters long"),
      walletPassword: Yup.string().when(
        "requirePasswordWhenSend",
        (requirePasswordWhenSend, schema) =>
          requirePasswordWhenSend
            ? schema.required("Wallet password is required!")
            : schema
      ),
      confirmSend: Yup.bool().oneOf(
        [true],
        "Please confirm that you are sending to above address!"
      )
    })
    .defined()

  const [togglePassword, setTogglePassword] = useState<boolean>(false)
  const togglePasswordHandler = () => {
    if (togglePassword) {
      setTogglePassword(false)
    } else {
      setTogglePassword(true)
    }
  }

  const {
    register,
    handleSubmit,
    formState,
    getFieldState,
    setError,
    clearErrors,
    getValues
  } = useForm<formType>({
    resolver: yupResolver(formSchema),
    mode: "onChange"
  })

  const firstAmountStepHandler = async () => {
    const isPasswordCorrect = verifyPassword(
      walletContext.encryptedPrivateKey,
      getValues("walletPassword")
    )

    if (getValues("sendingAmount") <= 0) {
      setError("sendingAmount", { type: "custom", message: "Error!" })
      return
    } else if (!isPasswordCorrect) {
      setError("walletPassword", {
        type: "custom",
        message: "Incorrect wallet password!"
      })
      return
    } else {
      clearErrors()
      setStep("secondConfirmSendStep")
    }
  }

  const secondConfirmSendStepHandler = async () => {
    if (!isLockPasswordSet) {
      console.error("Wallet is locked! Unlock your wallet!")
      return
    }
  }

  const firstAmountStep = (
    <Grid container item xs={12}>
      {/* sendingAmount */}
      <Grid
        container
        item
        xs={12}
        direction="row"
        textAlign="left"
        alignContent="left"
        alignItems="left"
        justifyContent="left"
        height={100}>
        <TextField
          id="sending-amount-input"
          autoComplete="on"
          variant="outlined"
          label="Sending amount"
          type="number"
          color="info"
          error={
            formState.errors.sendingAmount?.message?.length !== 0 &&
            formState.errors.sendingAmount?.message?.length !== undefined
          }
          helperText={
            getFieldState("sendingAmount").invalid &&
            "Please enter a positive amount!"
          }
          fullWidth
          {...register("sendingAmount")}
        />
      </Grid>

      {/* fromAddress */}
      <Grid
        container
        item
        xs={12}
        direction="row"
        textAlign="left"
        alignContent="left"
        alignItems="left"
        justifyContent="left"
        height={100}>
        <TextField
          id="from-address"
          variant="outlined"
          label="Select sending account"
          color="info"
          select
          fullWidth
          defaultValue={wallets[0].address}
          inputProps={register("fromAddress")}
          error={
            formState.errors.fromAddress?.message?.length !== 0 &&
            formState.errors.fromAddress?.message?.length !== undefined
          }>
          {wallets.map((wallet: any, index: any) => (
            <MenuItem
              key={"wallet" + index}
              value={wallet.address}
              sx={{ fontSize: 14 }}>
              {wallet.address.substring(0, 32)}
              {wallet.address.length >= 32 && "..."}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* toAddress */}
      <Grid
        container
        item
        xs={12}
        direction="row"
        textAlign="left"
        alignContent="left"
        alignItems="left"
        justifyContent="left"
        height={100}>
        <TextField
          id="to-address"
          variant="outlined"
          label="Enter receiving account address"
          color="info"
          fullWidth
          value="0x9023B19E6012b88f5f2213C5626c4Ec85cC48241"
          error={
            formState.errors.toAddress?.message?.length !== 0 &&
            formState.errors.toAddress?.message?.length !== undefined
          }
          helperText={formState.errors.toAddress?.message}
          {...register("toAddress")}
        />
      </Grid>

      {/* walletPassword */}
      {requirePasswordWhenSend && (
        <Grid
          container
          item
          xs={12}
          direction="row"
          textAlign="left"
          alignContent="left"
          alignItems="left"
          justifyContent="left"
          height={100}>
          <TextField
            id="wallet-password"
            variant="outlined"
            label="Enter wallet password"
            color="info"
            fullWidth
            type={togglePassword ? "text" : "password"}
            error={
              formState.errors.walletPassword?.message?.length !== 0 &&
              formState.errors.walletPassword?.message?.length !== undefined
            }
            helperText={formState.errors.walletPassword?.message}
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
            {...register("walletPassword")}
          />
        </Grid>
      )}

      {/* Next button */}
      <Grid
        container
        item
        xs={12}
        direction="column"
        textAlign="center"
        alignContent="center"
        alignItems="center"
        height={100}>
        <Button
          variant="outlined"
          fullWidth
          disabled={
            getFieldState("sendingAmount").invalid && !formState.isValid
          }
          onClick={() => firstAmountStepHandler()}>
          Next
        </Button>
      </Grid>
    </Grid>
  )

  const secondConfirmSendStep = (
    <Grid container item xs={12}>
      <Grid
        borderBottom={2}
        borderColor="lightgray"
        container
        flexDirection="row"
        item
        height={100}
        display="flex"
        alignContent="center"
        alignItems="center"
        textAlign="center"
        xs={12}>
        <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
          Sending Amount:
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
          ${Number(getValues("sendingAmount")).toFixed(2)}
        </Typography>
      </Grid>

      <Grid container item height={300}>
        <TableContainer component="div">
          <Table width="100%" size="medium">
            <TableBody>
              <TableRow>
                <TableCell sx={{ borderBottom: "none", fontSize: 18 }}>
                  From
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", fontSize: 18 }}>
                  {getValues("fromAddress")?.substring(0, 18)}{" "}
                  {getValues("fromAddress")?.length >= 18 && "..."}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderBottom: "none", fontSize: 18 }}>
                  To
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", fontSize: 18 }}>
                  {getValues("toAddress")?.substring(0, 18)}{" "}
                  {getValues("toAddress")?.length >= 18 && "..."}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderBottom: "none", fontSize: 18 }}>
                  Date
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", fontSize: 18 }}>
                  {new Date().toLocaleString() + ""}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderBottom: "none", fontSize: 18 }}>
                  Fee
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", fontSize: 18 }}>
                  MATIC 0.0001
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderBottom: "none", fontSize: 18 }}>
                  Total
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "none", fontSize: 18 }}>
                  ${Number(getValues("sendingAmount")).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid container item xs={12}>
        <Grid
          item
          xs={6}
          justifyContent="left"
          textAlign="left"
          alignContent="left"
          alignItems="left">
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setStep("firstAmountStep")}
            sx={{ maxWidth: "150px" }}>
            Back
          </Button>
        </Grid>

        <Grid
          item
          xs={6}
          justifyContent="right"
          textAlign="right"
          alignContent="right"
          alignItems="right">
          <Button
            variant="outlined"
            fullWidth
            onClick={() => firstAmountStepHandler()}
            sx={{ maxWidth: "150px" }}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <Grid container item display="inline-block" xs={12} marginTop={1}>
      <HeaderLight goBackPage="dashboard" title={"Send"} />

      <form onSubmit={handleSubmit(secondConfirmSendStepHandler)}>
        {step === "firstAmountStep" && firstAmountStep}
        {step === "secondConfirmSendStep" && secondConfirmSendStep}
      </form>

      <Footer />
    </Grid>
  )
}

export default Send

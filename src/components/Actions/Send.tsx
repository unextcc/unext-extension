import { yupResolver } from "@hookform/resolvers/yup"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

import Footer from "~components/Layout/Footer"
import HeaderLight from "~components/Layout/HeaderLight"
import { config } from "~contents/config"
import { useWeb3EstimateFee, useWeb3Send } from "~hooks/use-web3"
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

  const {
    estimatedFeeInMatic,
    estimatedFeeInGwei,
    error: estimatedFeeError,
    status: estimatedFeeStatus
  } = useWeb3EstimateFee()

  const {
    error: sendTokenError,
    sendToken,
    status: sendTokenStatus,
    transactionHash
  } = useWeb3Send(
    0,
    getValues("sendingAmount"),
    estimatedFeeInGwei,
    getValues("fromAddress"),
    getValues("toAddress"),
    walletContext.getPrivateKey(
      walletContext.encryptedPrivateKey,
      settingsContext.lockPassword.password
    )
  )

  console.log("transactionHash " + transactionHash)

  const firstAmountStepHandler = async () => {
    if (requirePasswordWhenSend) {
      const isPasswordCorrect = verifyPassword(
        walletContext.encryptedPrivateKey,
        getValues("walletPassword")
      )

      if (!isPasswordCorrect) {
        setError("walletPassword", {
          type: "custom",
          message: "Incorrect wallet password!"
        })
        return
      }
    }

    if (getValues("sendingAmount") <= 0) {
      setError("sendingAmount", { type: "custom", message: "Error!" })
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

    await sendToken()
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
          value={1}
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
          defaultValue="0xB32339605Feb98CA4d114425d868132a555394bC"
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
    <Grid container item xs={12} display="block">
      <Paper variant="outlined" sx={{ padding: 1 }}>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            width: "100%",
            fontSize: 14,
            marginBottom: 1
          }}>
          Sending amount:
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ textAlign: "center", width: "100%", marginBottom: 1 }}>
          ${Number(getValues("sendingAmount")).toFixed(2)}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            width: "100%",
            fontSize: 14,
            marginBottom: 1
          }}>
          Receiving address:
        </Typography>

        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            width: "100%",
            fontSize: 14,
            marginBottom: 1
          }}>
          {getValues("toAddress")}
        </Typography>
      </Paper>

      <Grid container item display="block" xs={12}>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Date:
                </TableCell>
                <TableCell align="right">
                  {new Date().toLocaleString() + ""}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Network:
                </TableCell>
                <TableCell align="right">
                  {config.tokens[0].blockchain}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Network Fee:
                </TableCell>
                <TableCell align="right">
                  MATIC{" "}
                  {estimatedFeeStatus === "working"
                    ? "Loading..."
                    : estimatedFeeInMatic}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {sendTokenStatus === "working" ? (
        <Grid
          container
          item
          xs={12}
          direction="row"
          textAlign="center"
          alignContent="center"
          alignItems="center"
          height={80}>
          <Typography width="100%" textAlign="center" fontSize={40}>
            <CircularProgress sx={{ fontSize: 40 }} color="info" />
          </Typography>
        </Grid>
      ) : (
        <Grid
          container
          item
          xs={12}
          direction="row"
          textAlign="center"
          alignContent="center"
          alignItems="center"
          height={80}>
          {sendTokenStatus === "success" && (
            <Typography width="100%" textAlign="center" fontSize={40}>
              <CheckCircleOutlineIcon sx={{ fontSize: 40 }} color="success" />
            </Typography>
          )}
        </Grid>
      )}

      {sendTokenStatus === "idle" || sendTokenError ? (
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
              disabled={sendTokenStatus !== "idle"}
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
              onClick={() => secondConfirmSendStepHandler()}
              disabled={sendTokenStatus !== "idle"}
              sx={{ maxWidth: "150px" }}>
              Send
            </Button>
          </Grid>
        </Grid>
      ) : sendTokenStatus === "success" && !sendTokenError ? (
        <Grid
          container
          item
          xs={12}
          direction="column"
          justifyContent="center"
          textAlign="center"
          alignContent="center"
          alignItems="center">
          <Button
            variant="outlined"
            fullWidth
            onClick={() => settingsContext.shownPageHandler("dashboard")}
            disabled={false}>
            Back to Dashboard
          </Button>
        </Grid>
      ) : (
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
              disabled={true}
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
              onClick={() => secondConfirmSendStepHandler()}
              disabled={true}
              sx={{ maxWidth: "150px" }}>
              Send
            </Button>
          </Grid>
        </Grid>
      )}
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

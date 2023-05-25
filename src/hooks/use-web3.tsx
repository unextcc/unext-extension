// @ts-ignore
import Abi from "human-standard-token-abi"
import { useCallback, useEffect, useState } from "react"
import Web3 from "web3"

import { config } from "~contents/config"
import { decryptAES, encryptAES } from "~utils/encryption"

type accountType = {
  address: string
  privateKey: string
  encryptedPrivateKey: string
}

type estimatedFeeResponseType = {
  safeLow: {
    maxPriorityFee: number
    maxFee: number
  }
  standard: {
    maxPriorityFee: number
    maxFee: number
  }
  fast: {
    maxPriorityFee: number
    maxFee: number
  }
  estimatedBaseFee: number
  blockTime: number
  blockNumber: number
}

export const useWeb3CreateAccount = () => {
  const [account, setAccount] = useState<accountType>({
    encryptedPrivateKey: "",
    privateKey: "",
    address: ""
  })
  const [error, setError] = useState<{}>({})
  const [status, setStatus] = useState<string>("idle")

  const createAccount = async (password: string, providerUrl: string) => {
    setStatus("working")
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl))
      const createAccount = web3.eth.accounts.create()
      console.log(password)
      const encryptedPrivateKey = encryptAES(createAccount.privateKey, password)

      setAccount({
        address: createAccount.address,
        privateKey: createAccount.privateKey,
        encryptedPrivateKey
      })
      setStatus("success")
    } catch (err: any) {
      setError(err)
      setStatus("error")
    }
    setStatus("done")
  }

  return {
    account,
    error,
    isError: status === "error",
    status,
    createAccount
  }
}

export const useWeb3TokenBalance = (
  accountAddress: string,
  contractAddress: string,
  decimals: number,
  providerUrl: string = config.providerUrl
) => {
  const [balance, setBalance] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    if (!accountAddress || !contractAddress) return

    const fetchBalance = async (
      accountAddress: string,
      contractAddress: string,
      decimals: number,
      providerUrl: string = config.providerUrl
    ) => {
      setStatus("loading")
      try {
        const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl))
        const token = new web3.eth.Contract(Abi, contractAddress)
        const balanceRaw: string = await token.methods
          .balanceOf(accountAddress)
          .call()
        setBalance((parseInt(balanceRaw) / 10 ** decimals).toFixed(2))
        setStatus("success")
      } catch (error: any) {
        setError(error.message)
        setStatus("error")
        console.error(error)
      }
      setStatus("loaded")
    }
    fetchBalance(accountAddress, contractAddress, decimals, providerUrl)
  }, [accountAddress, contractAddress, providerUrl])

  return {
    balance,
    error,
    isError: status === "error",
    isLoading: status === "loading",
    isLoaded: status === "loaded"
  }
}

export const useWeb3GetAddressFromPrivateKey = () => {
  // public account address
  const [address, setAddress] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState<string>("idle")

  const getAddressFromPrivateKey = useCallback(
    async (privateKey: string, providerUrl: string = config.providerUrl) => {
      try {
        setStatus("working")
        const web3 = await new Web3(
          new Web3.providers.HttpProvider(providerUrl)
        )
        const accountInfo = await web3.eth.accounts.privateKeyToAccount(
          privateKey
        )

        setAddress(accountInfo.address)
        setStatus("success")
      } catch (error: any) {
        setError(error)
        setStatus("error")
        console.error(error)
      }
    },
    []
  )

  return {
    address,
    error,
    status,
    getAddressFromPrivateKey
  }
}

export const useWeb3EstimateFee = (
  gasStationUrl: string = config.gasStationUrl
) => {
  const [estimatedFeeInMatic, setestimatedFeeInMatic] = useState<string>("")
  const [estimatedFeeInGwei, setestimatedFeeInGwei] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState<string>("idle")

  useEffect(() => {
    const estimateFee = async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider(config.providerUrl))

      try {
        setStatus("working")

        const response = await fetch(gasStationUrl)
        if (!response.ok) {
          throw new Error("Error: " + response.statusText)
        }

        const data: estimatedFeeResponseType = await response.json()

        // Get estimated fee in Gwei
        const receivedEstimatedFeeInGwei =
          data.estimatedBaseFee + data.standard.maxFee

        // Convert estimated fee to MATIC
        const estimatedFeeInMATIC: string = web3.utils.fromWei(
          receivedEstimatedFeeInGwei.toFixed(),
          "Gwei"
        )

        setestimatedFeeInMatic(estimatedFeeInMATIC)
        setestimatedFeeInGwei(receivedEstimatedFeeInGwei.toString())
        setStatus("success")
      } catch (err: any) {
        setStatus("error")
        setError(err.message)
        console.error(err.message)
      }
    }

    estimateFee()
  }, [])

  return {
    estimatedFeeInMatic,
    estimatedFeeInGwei,
    error,
    status
  }
}

export const useWeb3Send = (
  token: number,
  amount: number,
  gasFee: string,
  fromAddress: string,
  toAddress: string,
  privateKey: string,
  providerUrl: string = config.providerUrl
) => {
  const [transactionHash, setTransactionHash] = useState<string>()
  const [status, setStatus] = useState<string>("idle")
  const [error, setError] = useState<string>("")

  const sendToken = async (): Promise<void> => {
    var privateKeyInHex = Buffer.from(privateKey, "hex")

    try {
      setStatus("working")

      // Connect to network
      const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl))

      // Get the contract instance
      const contract = new web3.eth.Contract(
        Abi,
        config.tokens[token].contractAddress,
        {
          from: fromAddress
        }
      )

      // Get the nonce for the sending address
      const nonce = await web3.eth.getTransactionCount(fromAddress)
      const amountToSend = await web3.utils.toBN(
        "0x" + (amount * 10 ** config.tokens[token].decimals).toString(16)
      )
      const data = await contract.methods
        .transfer(toAddress, amountToSend)
        .encodeABI()

      console.log(data)

      // Build the transaction object
      const tx = {
        from: fromAddress,
        nonce: "0x" + nonce.toString(16),
        to: config.tokens[token].contractAddress,
        value: "0x0", //Send 0 ether
        data: data,
        gasLimit: web3.utils.toHex(60000),
        gasPrice: web3.utils.toHex(
          web3.utils.toWei(Number(gasFee).toFixed(2), "gwei")
        )
      }

      console.log(web3.utils.toWei(Number(gasFee).toFixed(2), "gwei"))

      console.log(JSON.stringify(tx))

      // Sing the transaction
      //@ts-ignore
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey)

      // Send the transaction
      const receipt = await web3.eth.sendSignedTransaction(
        //@ts-ignore
        signedTx.rawTransaction
      )

      console.log(receipt)

      setTransactionHash(receipt.transactionHash)

      setStatus("success")
    } catch (err: any) {
      setError(err.message)
      console.error(err)
    }
  }
  return { error, sendToken, transactionHash, status }
}

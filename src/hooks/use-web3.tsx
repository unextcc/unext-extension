// @ts-ignore
import Abi from "human-standard-token-abi"
import { useCallback, useEffect, useState } from "react"
import Web3 from "web3"

import { config } from "~contents/config"
import { encryptAES } from "~utils/encryption"

type accountType = {
  address: string
  privateKey: string
  encryptedPrivateKey: string
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
  providerUrl: string = config.tokens[1].networks[1].providerUrl
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
      providerUrl: string = config.tokens[1].networks[1].providerUrl
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
    async (
      privateKey: string,
      providerUrl: string = config.tokens[0].networks[1].providerUrl
    ) => {
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

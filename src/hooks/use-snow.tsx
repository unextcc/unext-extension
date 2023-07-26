import { useEffect, useState } from "react"
import Web3 from "web3"

import { config } from "~contents/config"

type accountBalanceType = {
  status: string
  message: string
  result: string
}

type accountTokenBalanceType = {
  status: string
  message: string
  result: string
}

export const useSnowGetAccountBalance = (
  accountAddress: string,
  apiUrl: string = config.cryptoTokens[0].networks[0].snowTraceApiUrl
) => {
  const [balance, setBalance] = useState<string>("")
  const [balanceWei, setBalanceWei] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    if (!accountAddress) {
      throw "accountAddress not set"
      return
    }

    if (!apiUrl) {
      throw "apiUrl not set"
      return
    }

    const getBalance = async () => {
      try {
        setStatus("loading")

        const encodedApiUrl = encodeURI(
          `${apiUrl}?module=account&action=balance&address=${accountAddress}&tag=latest`
        )

        const response = await fetch(encodedApiUrl)
        if (!response.ok) {
          throw new Error("Error: " + response.statusText)
        }

        const data: accountBalanceType = await response.json()

        setBalanceWei(data.result)
        setBalance(
          Number(Web3.utils.fromWei(data.result, "ether")).toFixed(2).toString()
        )

        setStatus("loaded")
      } catch (err: any) {
        setStatus("error")
        console.error(err.message)
      }
    }

    getBalance()
  }, [])

  return {
    balance,
    balanceWei,
    error,
    status
  }
}

export const useSnowGetAccountTokenBalance = () => {
  const [balance, setBalance] = useState<number>(0)
  const [balanceWei, setBalanceWei] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState("idle")

  const getAccountTokenBalance = async (
    accountAddress: string,
    apiUrl: string,
    contractAddress: string,
    decimals: number
  ) => {
    try {
      setStatus("loading")

      if (!apiUrl) {
        throw new Error("apiUrl not set")
        return
      }

      if (!accountAddress) {
        throw new Error("accountAddress not set")
        return
      }

      if (!contractAddress) {
        throw new Error("contractAddress not set")
        return
      }

      const encodedApiUrl = encodeURI(
        `${apiUrl}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${accountAddress}&tag=latest`
      )

      const response = await fetch(encodedApiUrl)
      if (!response.ok) {
        throw new Error("Error: " + response.statusText)
      }

      const data: accountTokenBalanceType = await response.json()

      setBalance(Number(data.result) / 10 ** decimals)

      setStatus("done")
    } catch (err: any) {
      setStatus("error")
      setError(err)
      console.error(err.message)
    }
  }

  return {
    balance,
    balanceWei,
    error,
    status,
    getAccountTokenBalance: getAccountTokenBalance
  }
}

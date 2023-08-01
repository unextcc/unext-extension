import { useEffect, useState } from "react"
import Web3 from "web3"

import { config } from "~contents/config"

export type accountBalanceType = {
  status: string
  message: string
  result: string
}

export type accountTokenBalanceType = {
  status: string
  message: string
  result: string
}

export type accountTokenTransactionType = {
  status: string
  message: string
  result: {
    blockNumber: string
    timeStamp: string
    hash: string
    nonce: string
    blockHash: string
    from: string
    contractAddress: string
    to: string
    value: string
    tokenName: string
    tokenSymbol: string
    tokenDecimal: string
    transactionIndex: string
    gas: string
    gasPrice: string
    gasUsed: string
    cumulativeGasUsed: string
    input: string
    confirmations: string
  }[]
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

export const useSnowGetAccountTokenTransactions = (
  contractAddress: string,
  accountAddress: string,
  page: number = 1,
  offset: number = 10,
  startBlock: number = 0,
  endBlock: number = 99999999,
  sort: string = "desc",
  apiUrl: string
) => {
  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState("idle")
  const [transactionFound, setTransactionFound] = useState<boolean>(true)
  const [transactions, setTransactions] = useState<accountTokenTransactionType>(
    {
      status: "1",
      message: "OK",
      result: [
        {
          blockNumber: "0",
          timeStamp: "0",
          hash: "default",
          nonce: "0",
          blockHash: "0x0",
          from: "0x0",
          contractAddress: "0x0",
          to: "0x0",
          value: "0",
          tokenName: "",
          tokenSymbol: "",
          tokenDecimal: "",
          transactionIndex: "1",
          gas: "0",
          gasPrice: "0",
          gasUsed: "0",
          cumulativeGasUsed: "0",
          input: "",
          confirmations: "0"
        }
      ]
    }
  )

  const getAccountTokenTransfers = async (
    contractAddress: string,
    accountAddress: string,
    page: number = 1,
    offset: number = 10,
    startBlock: number = 0,
    endBlock: number = 99999999,
    sort: string = "desc",
    apiUrl: string
  ) => {
    try {
      if (!contractAddress) {
        throw new Error("contractAddress not set")
        return
      }

      if (!accountAddress) {
        throw new Error("accountAddress not set")
        return
      }

      if (!apiUrl) {
        throw new Error("apiUrl not set")
        return
      }

      const encodedApiUrl = encodeURI(
        `${apiUrl}?module=account&action=tokentx&contractaddress=${contractAddress}&address=${accountAddress}&page=${page}&offset=${offset}&startblock=${startBlock}&endblock=${endBlock}&sort=${sort}`
      )

      const response = await fetch(encodedApiUrl)
      if (!response.ok) {
        throw new Error("Error: " + response.statusText)
      }

      const data: accountTokenTransactionType = await response.json()

      if (data.result[0].hash === "default") {
        setTransactionFound(false)
      }

      setTransactions(data)
      setStatus("done")
    } catch (err: any) {
      setStatus("error")
      setError(err)
      console.error(err)
    }
  }

  useEffect(() => {
    if (transactions.result[0].hash === "default") {
      getAccountTokenTransfers(
        contractAddress,
        accountAddress,
        page,
        offset,
        startBlock,
        endBlock,
        sort,
        apiUrl
      )
    }
  }, [transactions])

  return {
    error,
    isLoading: status === "loading",
    isLoaded: status === "loaded",
    status,
    transactionFound,
    transactions,
    getAccountTokenTransfers: getAccountTokenTransfers
  }
}

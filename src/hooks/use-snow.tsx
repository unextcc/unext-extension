import { useContext, useEffect, useState } from "react"
import Web3 from "web3"

import { config } from "~contents/config"
import { TransactionContext } from "~store/transaction-context"
import { WalletContext } from "~store/wallet-context"
import type {
  TokenTransactionType,
  TokenTransactionsType,
  TransactionDetail
} from "~types/transaction"
import { getFiatSymbol, timeout } from "~utils/other"

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

export type accountTokenTransactionRawType = {
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

export type transactionDetailRawType = {
  jsonrpc: string
  id: number
  result: {
    blockHash: string
    blockNumber: string
    contractAddress: string
    cumulativeGasUsed: string
    effectiveGasPrice: string
    from: string
    gasUsed: string
    logs: {
      address: string
      topics: string[]
      data: string
      blockNumber: string
      transactionHash: string
      transactionIndex: string
      blockHash: string
      logIndex: string
      removed: boolean
    }[]
    logsBloom: string
    status: string
    to: string
    transactionHash: string
    transactionIndex: string
    type: string
  }
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
  accountAddress: string,
  page: number = 1,
  offset: number = 10,
  startBlock: number = 0,
  endBlock: number = 99999999,
  sort: string = "desc",
  network: number,
  token: number
) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState("idle")
  const [transactionFound, setTransactionFound] = useState<boolean>(true)
  const [transactions, setTransactions] = useState<TokenTransactionsType>([
    {
      blockDate: "",
      blockTime: "",
      fiatSymbol: "",
      hash: "default",
      value: 0,
      tokenSymbol: "",
      transactionType: ""
    }
  ])

  const findTransactionType = (
    fromAddress: string,
    toAddress: string,
    walletAddress: string
  ) => {
    if (walletAddress === fromAddress) {
      return "out"
    } else if (walletAddress === toAddress) {
      return "in"
    } else {
      return "not"
    }
  }

  const getAccountTokenTransfers = async (
    accountAddress: string,
    page: number = 1,
    offset: number = 10,
    startBlock: number = 0,
    endBlock: number = 99999999,
    sort: string = "desc",
    network: number,
    token: number
  ) => {
    try {
      setStatus("loading")

      if (!accountAddress) {
        throw new Error("accountAddress not set")
        return
      }

      const encodedApiUrl = encodeURI(
        `${config.tokens[token].networks[network].snowTraceApiUrl}?module=account&action=tokentx&contractaddress=${config.tokens[token].networks[network].contractAddress}&address=${accountAddress}&page=${page}&offset=${offset}&startblock=${startBlock}&endblock=${endBlock}&sort=${sort}`
      )

      const response = await fetch(encodedApiUrl)
      if (!response.ok) {
        throw new Error("Error: " + response.statusText)
      }

      const data: accountTokenTransactionRawType = await response.json()

      let transactionsTransformed: TokenTransactionsType = []

      if (data.result[0].hash === "default") {
        setTransactionFound(false)
      } else {
        for (let i = 0; i < data.result.length; i++) {
          const date = new Date(Number(data.result[i].timeStamp) * 1000)

          const transaction: TokenTransactionType = {
            blockDate:
              date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay(),
            blockTime: date.getHours() + ":" + date.getMinutes(),
            fiatSymbol: getFiatSymbol(data.result[i].tokenSymbol),
            hash: data.result[i].hash,
            value:
              Number(data.result[i].value) /
              10 ** Number(data.result[i].tokenDecimal),
            tokenSymbol: data.result[i].tokenSymbol,
            transactionType: findTransactionType(
              data.result[i].from,
              data.result[i].to,
              wallet.address
            )
          }

          transactionsTransformed.push(transaction)
        }
      }

      setTransactions(transactionsTransformed)
      setStatus("done")
    } catch (err: any) {
      setStatus("error")
      setError(err)
      console.error(err)
    }
  }

  useEffect(() => {
    if (transactions[0].hash === "default") {
      getAccountTokenTransfers(
        accountAddress,
        page,
        offset,
        startBlock,
        endBlock,
        sort,
        network,
        token
      )
    }
  }, [transactions])

  return {
    error,
    status,
    transactionFound,
    transactions,
    getAccountTokenTransfers: getAccountTokenTransfers
  }
}

export const useSnowEthGetTransactionReceipt = () => {
  const transactionContext = useContext(TransactionContext)
  const walletContext = useContext(WalletContext)
  //@ts-ignore
  const wallet = walletContext.wallets[0][0]

  const [error, setError] = useState<any>()
  const [status, setStatus] = useState("idle")
  const [transaction, setTransaction] = useState<TransactionDetail>({
    date: "",
    from: "",
    hash: "default",
    network: -1,
    networkFee: "",
    status: "",
    time: "",
    to: "",
    transactionType: "",
    value: 0
  })

  const ethGetTransactionReceipt = async (
    transactionHash: string,
    network: number,
    token: number
  ) => {
    try {
      if (!transactionHash) {
        throw new Error("transactionHash can not be empty")
      }

      const encodedApiUrl = encodeURI(
        `${config.tokens[token].networks[network].snowTraceApiUrl}?module=proxy&action=eth_getTransactionReceipt&txhash=${transactionHash}`
      )

      const response = await fetch(encodedApiUrl)
      if (!response.ok) {
        setError("Error: " + response.statusText)
        throw new Error("Error: " + response.statusText)
      }

      const data: transactionDetailRawType = await response.json()

      let networkFeeConverted: string = ""

      networkFeeConverted = Web3.utils.fromWei(
        Web3.utils.toBN(
          Number(Web3.utils.hexToNumber(data.result.effectiveGasPrice)) *
            Number(Number(Web3.utils.hexToNumber(data.result.gasUsed)))
        ),
        "ether"
      )

      setTransaction({
        date: transactionContext.transactionDetail.date,
        time: transactionContext.transactionDetail.time,
        from: data.result.from,
        hash: data.result.transactionHash,
        network: network,
        networkFee: networkFeeConverted,
        status: data.result.status === "0x1" ? "Success" : "Failed",
        to: "0x" + data.result.logs[0].topics[2].substring(26, 66),
        transactionType:
          data.result.from === wallet.address ? "Sent" : "Received",
        value: transactionContext.transactionDetail.value
      })
      setStatus("done")
    } catch (err: any) {
      setStatus("error")
      setError(error)
    }
  }

  return {
    error,
    status,
    transaction,
    ethGetTransactionReceipt: ethGetTransactionReceipt
  }
}

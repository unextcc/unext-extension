import { Alchemy, AssetTransfersCategory, SortingOrder } from "alchemy-sdk"
import { type AlchemyConfig } from "alchemy-sdk"
import type types from "alchemy-sdk"
import { sortBy } from "lodash"
import { useContext, useEffect, useState } from "react"

import { config } from "~contents/config"
import { TransactionContext } from "~store/transaction-context"
import { WalletContext } from "~store/wallet-context"
import type {
  TokenTransactionType,
  TokenTransactionsType,
  TransactionDetail
} from "~types/transaction"
import { getFiatSymbol } from "~utils/other"

export type Transactions = {
  asset: string
  blockDate: string
  blockNum: string
  blockTime: string
  blockTimestamp: string
  category: string
  erc721TokenId: string
  erc1155Metadata: string
  fiatSymbol: string
  from: string
  hash: string
  metadata: {
    blockTimestamp: string
  }
  rawContract: {
    address: string
    decimal: string
    value: string
  }
  to: string
  tokenId: number
  transactionType: string
  uniqueId: string
  value: number
}[]

export const useAlchemyGetAssetTransfers = () => {
  const walletContext = useContext(WalletContext)
  //@ts-ignore
  const wallet = walletContext.wallets[0][0]

  const [error, setError] = useState<string>("")
  const [transactions, setTransactions] = useState<TokenTransactionsType>([])
  const [transactionFound, setTransactionFound] = useState<boolean>(true)
  const [status, setStatus] = useState("idle")

  const getAssetTransfers = async (
    apiKey: string = "",
    network: number,
    decimals: number = 6,
    maxRetries: number = 3,
    address: string,
    contractAddresses: string[],
    fromBlock: string = "0x0",
    category = [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
    withMetadata: boolean = true,
    order: SortingOrder = SortingOrder.DESCENDING,
    excludeZeroValue: boolean = true,
    maxCount: number = 10,
    url: string
  ) => {
    const alchemyConfig: AlchemyConfig = {
      apiKey: apiKey,
      // @ts-ignore
      network: config.tokens[0].networks[network].alchemyNetwork,
      maxRetries: maxRetries,
      batchRequests: false,
      getProvider: function (): Promise<types.AlchemyProvider> {
        throw new Error("Function not implemented.")
      },
      getWebSocketProvider:
        function (): Promise<types.AlchemyWebSocketProvider> {
          throw new Error("Function not implemented.")
        },
      url: url
    }

    const alchemy = new Alchemy(alchemyConfig)

    try {
      setStatus("loading")

      // Get received transactions
      const datadReceived = await alchemy.core.getAssetTransfers({
        fromBlock: fromBlock,
        toAddress: address,
        contractAddresses: contractAddresses,
        category: category,
        withMetadata: withMetadata,
        order: order,
        excludeZeroValue: excludeZeroValue,
        maxCount: maxCount
      })

      // Get sent transactions
      const dataSend = await alchemy.core.getAssetTransfers({
        fromBlock: fromBlock,
        fromAddress: address,
        contractAddresses: contractAddresses,
        category: category,
        withMetadata: withMetadata,
        order: order,
        excludeZeroValue: excludeZeroValue,
        maxCount: maxCount
      })

      // merge received and sent transactions to single list
      const data = [...datadReceived.transfers, ...dataSend.transfers]

      if (data.length <= 0) {
        setTransactionFound(false)
      }

      let transfers: TokenTransactionsType = []

      for (let i = 0; i < data.length; i++) {
        const transfer: TokenTransactionType = {
          //@ts-ignore
          blockDate: data[i].metadata.blockTimestamp.split("T")[0],
          //@ts-ignore
          blockTime: data[i].metadata.blockTimestamp
            .split("T")[1]
            .replace(".000Z", ""),
          fiatSymbol: getFiatSymbol(data[i].asset!),
          hash: data[i].hash,
          value: data[i].value!,
          tokenSymbol: data[i].asset!,
          transactionType:
            wallet.address.toLowerCase() === data[i].to ? "in" : "out"
        }

        transfers.push(transfer)
      }

      //@ts-ignore
      setTransactions(sortBy(transfers, ["blockTimestamp"]).reverse())
      setStatus("loaded")
    } catch (error: any) {
      if (error.code === 429) {
        console.log(error.message)
      } else {
        setError(error.message)
        console.error(error)
      }
    }
  }

  return {
    error,
    transactionFound,
    isLoading: status === "loading",
    isLoaded: status === "loaded",
    transactions,
    getAssetTransfers: getAssetTransfers
  }
}

export const useAlchemyGetTransactionReceipt = () => {
  const transactionContext = useContext(TransactionContext)
  const walletContext = useContext(WalletContext)
  const wallet = walletContext.wallets[0]

  const [error, setError] = useState<string>("")
  const [transaction, setTransaction] = useState<TransactionDetail>({
    date: "",
    from: "",
    hash: "default",
    network: -1,
    networkFee: 0,
    status: "",
    time: "",
    to: "",
    transactionType: "",
    value: 0
  })
  const [status, setStatus] = useState("idle")

  const getTransactionReceipt = async (
    transactionHash: string,
    network: number,
    maxRetries: number,
    url: string
  ) => {
    const alchemyConfig: AlchemyConfig = {
      apiKey: "",
      //@ts-ignore
      network: config.tokens[0].networks[network].alchemyNetwork,
      maxRetries: maxRetries,
      batchRequests: false,
      getProvider: function (): Promise<types.AlchemyProvider> {
        throw new Error("Function not implemented.")
      },
      getWebSocketProvider:
        function (): Promise<types.AlchemyWebSocketProvider> {
          throw new Error("Function not implemented.")
        },
      url: url
    }

    const alchemy = new Alchemy(alchemyConfig)

    try {
      setStatus("loading")
      const data = await alchemy.core.getTransactionReceipt(transactionHash)

      setTransaction({
        date: transactionContext.transactionDetail.date,
        from: data?.from!,
        hash: data?.transactionHash!,
        network: network,
        networkFee: Number(data?.effectiveGasPrice) * Number(data?.gasUsed),
        status: data?.status == 1 ? "Success" : "Failed",
        time: transactionContext.transactionDetail.time,
        to: data?.to!,
        transactionType: data?.from === wallet.address ? "Sent" : "Received",
        value: transactionContext.transactionDetail.value
      })

      setStatus("done")
    } catch (error: any) {
      if (error.code === 429) {
        console.log(error.message)
      } else {
        setError(error.message)
        console.error(error)
      }
    }
  }

  return {
    getTransactionReceipt,
    error,
    status,
    transaction
  }
}

export const useAlchemyCheckConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  const alchemyConfig: AlchemyConfig = {
    apiKey: config.tokens[1].networks[1].alchemyApiKey,
    network: config.tokens[1].networks[1].alchemyNetwork,
    maxRetries: config.tokens[1].networks[1].alchemyMaxRetries,
    batchRequests: false,
    getProvider: function (): Promise<types.AlchemyProvider> {
      throw new Error("Function not implemented.")
    },
    getWebSocketProvider: function (): Promise<types.AlchemyWebSocketProvider> {
      throw new Error("Function not implemented.")
    },
    url: config.tokens[0].networks[1].alchemyUrl
  }

  const alchemy = new Alchemy(alchemyConfig)

  const alchemyCheckConnection = async () => {
    try {
      await alchemy.core.getNetwork()
    } catch (err: any) {
      if (err.code === 429) {
        setIsConnected(false)
        setError(err.message)
        console.log(err.message)
      } else {
        setIsConnected(false)
        setError(err.message)
        console.error(err)
      }
    }
  }

  useEffect(() => {
    alchemyCheckConnection()
  }, [])

  return {
    error,
    isConnected
  }
}

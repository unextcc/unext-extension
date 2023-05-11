import {
  Alchemy,
  AlchemyConfig,
  AssetTransfersCategory,
  SortingOrder
} from "alchemy-sdk"
import type types from "alchemy-sdk"
import type { url } from "inspector"
import { sortBy } from "lodash"
import { useContext, useEffect, useState } from "react"

import { config } from "~contents/config"
import { WalletContext } from "~store/wallet-context"

type Transactions = {
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
}

export const useAlchemyGetAssetTransfers = (
  address: string,
  contractAddresses: string[],
  fromBlock: string = "0x0",
  category = [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
  withMetadata: boolean = true,
  order: SortingOrder = SortingOrder.DESCENDING,
  excludeZeroValue: boolean = true,
  maxCount: number = 10
) => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const [error, setError] = useState<string>("")
  const [transactions, setTransactions] = useState<Transactions[]>([])
  const [transactionFound, setTransactionFound] = useState<boolean>(true)
  const [status, setStatus] = useState("idle")

  const alchemyConfig: AlchemyConfig = {
    apiKey: config.tokens[0].alchemyApiKey,
    network: config.tokens[0].alchemyNetwork,
    maxRetries: config.tokens[0].alchemyMaxRetries,
    batchRequests: false,
    getProvider: function (): Promise<types.AlchemyProvider> {
      throw new Error("Function not implemented.")
    },
    getWebSocketProvider: function (): Promise<types.AlchemyWebSocketProvider> {
      throw new Error("Function not implemented.")
    },
    url: config.tokens[0].alchemyUrl
  }

  const alchemy = new Alchemy(alchemyConfig)

  const getAssetTransfer = async () => {
    setStatus("loading")
    try {
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

      let transfers = []

      for (let i = 0; i < data.length; i++) {
        const transfer = {
          ...data[i],
          // @ts-ignore
          blockDate: data[i].metadata.blockTimestamp.split("T")[0],
          // @ts-ignore
          blockTime: data[i].metadata.blockTimestamp
            .split("T")[1]
            .replace(".000Z", ""),
          // @ts-ignore
          blockTimestamp: data[i].metadata.blockTimestamp,
          fiatSymbol: data[i].asset === "USDC" ? "$" : "€",
          transactionType:
            wallet.address.toLowerCase() === data[i].to ? "Receive" : "Send"
        }

        // @ts-ignore
        transfers.push(transfer)
      }

      // @ts-ignore
      setTransactions(sortBy(transfers, ["blockTimestamp"]).reverse())
      setStatus("loaded")
    } catch (error: any) {
      if (error.code === 429) {
        console.log(error.message)
      } else {
        setError(error.message)
        console.error(error)
      }
      return
    }
  }

  useEffect(() => {
    if (transactions.length <= 0 && transactionFound) {
      getAssetTransfer()
    }
  }, [transactions])

  return {
    error,
    transactionFound,
    isLoading: status === "loading",
    isLoaded: status === "loaded",
    transactions
  }
}

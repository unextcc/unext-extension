import React, { useState } from "react"
import { createContext } from "react"

type TransactionType = {
  goBackPageName: string
  date: string
  network: string
  time: string
  title: string
  transactionHash: string
  tokenSymbol: string
  value: number
}

type TransactionContextType = {
  transactionDetail: TransactionType
  setTransactionDetailHandler: (
    goBackPageName: string,
    date: string,
    network: string,
    time: string,
    title: string,
    transactionHash: string,
    tokenSymbol: string,
    value: number
  ) => void
}

interface Props {
  children?: React.ReactNode
}

export const TransactionContext = createContext<TransactionContextType>({
  transactionDetail: {
    goBackPageName: "",
    date: "",
    network: "",
    time: "",
    title: "",
    transactionHash: "",
    tokenSymbol: "",
    value: 0
  },
  setTransactionDetailHandler: () => {}
})

const TransactionContextProvider: React.FC<Props> = (props) => {
  const [transactionDetail, setTransactionDetail] = useState<TransactionType>({
    goBackPageName: "",
    date: "",
    network: "",
    time: "",
    title: "",
    transactionHash: "",
    tokenSymbol: "",
    value: 0
  })

  const setTransactionDetailHandler = (
    goBackPageName: string,
    date: string,
    network: string,
    time: string,
    title: string,
    transactionHash: string,
    tokenSymbol: string,
    value: number
  ) => {
    setTransactionDetail({
      goBackPageName,
      date,
      network,
      time,
      title,
      transactionHash,
      tokenSymbol,
      value
    })
  }

  const transactionContextValue: TransactionContextType = {
    transactionDetail: transactionDetail,
    setTransactionDetailHandler: setTransactionDetailHandler
  }

  return (
    <TransactionContext.Provider value={transactionContextValue}>
      {props.children}
    </TransactionContext.Provider>
  )
}

export default TransactionContextProvider

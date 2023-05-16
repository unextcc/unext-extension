import React, { useState } from "react"
import { createContext } from "react"

type TransactionDetailType = {
  goBackPageName: string
  title: string
  transactionHash: string
  transactionType: string
  from: string
  to: string
  date: string
  time: string
  transactionStatus: string
  fiatSymbol: string
  value: number
  networkFee: number
  total: number
}

type TransactionContextType = {
  transactionDetail: TransactionDetailType
  setTransactionDetailHandler: (
    goBackPageName: string,
    title: string,
    transactionHash: string,
    transactionType: string,
    from: string,
    to: string,
    date: string,
    time: string,
    transactionStatus: string,
    fiatSymbol: string,
    value: number,
    networkFee: number,
    total: number
  ) => void
}

interface Props {
  children?: React.ReactNode
}

export const TransactionContext = createContext<TransactionContextType>({
  transactionDetail: {
    goBackPageName: "",
    title: "",
    transactionHash: "",
    transactionType: "",
    from: "",
    to: "",
    date: "",
    time: "",
    transactionStatus: "",
    fiatSymbol: "",
    value: 0,
    networkFee: 0,
    total: 0
  },
  setTransactionDetailHandler: () => {}
})

const TransactionContextProvider: React.FC<Props> = (props) => {
  const [transactionDetail, setTransactionDetail] =
    useState<TransactionDetailType>({
      goBackPageName: "",
      title: "",
      transactionHash: "",
      transactionType: "",
      from: "",
      to: "",
      date: "",
      time: "",
      transactionStatus: "",
      fiatSymbol: "",
      value: 0,
      networkFee: 0,
      total: 0
    })

  const setTransactionDetailHandler = (
    goBackPageName: string,
    title: string,
    transactionHash: string,
    transactionType: string,
    from: string,
    to: string,
    date: string,
    time: string,
    transactionStatus: string,
    fiatSymbol: string,
    value: number,
    networkFee: number,
    total: number
  ) => {
    setTransactionDetail({
      goBackPageName,
      title,
      transactionHash,
      transactionType,
      from,
      to,
      date,
      time,
      transactionStatus,
      fiatSymbol,
      value,
      networkFee,
      total
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

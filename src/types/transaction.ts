export type TokenTransactionType = {
  blockDate: string
  blockTime: string
  fiatSymbol: string
  hash: string
  value: number
  tokenSymbol: string
  transactionType: string // in or out
}

export type TokenTransactionsType = TokenTransactionType[]

export type TransactionDetail = {
  date: string
  from: string
  hash: string
  network: number
  networkFee: string
  status: string
  time: string
  to: string
  transactionType: string
  value: number
}

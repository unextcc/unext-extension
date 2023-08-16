export const timeout = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay))
}

export const getTimeNow = () => {
  const date: Date = new Date()
  const now: number = date.getTime()
  return now
}

export const getFiatSymbol = (tokenSymbol: string) => {
  switch (tokenSymbol) {
    case "USDC":
      return "$"
    case "EUROC":
      return "€"
    case "GBPC":
      return "£"
  }

  return ""
}

export const timeout = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay))
}

export const getTimeNow = () => {
  const date: Date = new Date()
  const now: number = date.getTime()
  return now
}

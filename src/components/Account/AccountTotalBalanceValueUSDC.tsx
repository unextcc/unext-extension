import React, { useContext, useEffect } from "react"

import { config } from "~contents/config"
import { useSnowGetAccountTokenBalance } from "~hooks/use-snow"
import { useWeb3TokenBalance } from "~hooks/use-web3"
import { WalletContext } from "~store/wallet-context"

const AccountTotalBalanceValueUSDC = () => {
  const walletContext = useContext(WalletContext)
  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  const {
    balance: balanceUsdcAvalanche,
    error: errorUsdcAvalanche,
    status: statusUsdcAvalance,
    getAccountTokenBalance: getAccountTokenBalanceUsdcAvalanche
  } = useSnowGetAccountTokenBalance()

  const {
    balance: balanceUsdcEthereum,
    status: statusUsdcEthereum,
    error: errorUsdcEthereum,
    getTokenBalance: getTokenBalanceUsdcEthereum
  } = useWeb3TokenBalance()

  const {
    balance: balanceUsdcPolygon,
    status: statusUsdcPolygon,
    error: errorUsdcPolygon,
    getTokenBalance: getTokenBalanceUsdcPolygon
  } = useWeb3TokenBalance()

  let totalBalance = 0

  useEffect(() => {
    // avalanche
    if (config.tokens[0].networks[0].enabled) {
      getAccountTokenBalanceUsdcAvalanche(
        wallet.address,
        config.tokens[0].networks[0].snowTraceApiUrl,
        config.tokens[0].networks[0].contractAddress,
        config.tokens[0].decimals
      )
    }

    // ethereum
    if (config.tokens[0].networks[1].enabled) {
      getTokenBalanceUsdcEthereum(
        wallet.address,
        config.tokens[0].networks[1].contractAddress,
        config.tokens[0].decimals,
        config.tokens[0].networks[1].providerUrl
      )
    }

    // polygon
    if (config.tokens[0].networks[2].enabled) {
      getTokenBalanceUsdcPolygon(
        wallet.address,
        config.tokens[0].networks[2].contractAddress,
        config.tokens[0].decimals,
        config.tokens[0].networks[2].providerUrl
      )
    }
  }, [])

  totalBalance =
    Number(balanceUsdcAvalanche) +
    Number(balanceUsdcEthereum) +
    Number(balanceUsdcPolygon)

  return (
    <React.Fragment>
      {statusUsdcAvalance == "done" &&
      statusUsdcEthereum == "done" &&
      statusUsdcPolygon == "done"
        ? totalBalance.toFixed(2)
        : "Loading..."}
    </React.Fragment>
  )
}

export default AccountTotalBalanceValueUSDC

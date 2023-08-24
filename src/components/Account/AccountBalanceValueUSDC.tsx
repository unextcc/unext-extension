import React, { useContext, useEffect } from "react"

import { config } from "~contents/config"
import { useSnowGetAccountTokenBalance } from "~hooks/use-snow"
import { useWeb3TokenBalance } from "~hooks/use-web3"
import { WalletContext } from "~store/wallet-context"
import { Web3AuthContext } from "~store/web3auth-context"

interface Props {
  children?: React.ReactNode
  network: string
}

const AccountBalanceValueUSDC = (props: Props) => {
  const walletContext = useContext(WalletContext)
  const web3authContext = useContext(Web3AuthContext)

  // @ts-ignore
  const wallet = walletContext.wallets[0][0]

  let balance: number = 0
  let balanceStatus: string = "idle"

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

  useEffect(() => {
    // avalanche
    if (config.tokens[0].networks[0].enabled && props.network === "avalanche") {
      getAccountTokenBalanceUsdcAvalanche(
        web3authContext.address,
        config.tokens[0].networks[0].snowTraceApiUrl,
        config.tokens[0].networks[0].contractAddress,
        config.tokens[0].decimals
      )
    }

    // ethereum
    if (config.tokens[0].networks[1].enabled && props.network === "ethereum") {
      getTokenBalanceUsdcEthereum(
        wallet.address,
        config.tokens[0].networks[1].contractAddress,
        config.tokens[0].decimals,
        config.tokens[0].networks[1].providerUrl
      )
    }

    // polygon
    if (config.tokens[0].networks[2].enabled && props.network === "polygon") {
      getTokenBalanceUsdcPolygon(
        wallet.address,
        config.tokens[0].networks[2].contractAddress,
        config.tokens[0].decimals,
        config.tokens[0].networks[2].providerUrl
      )
    }
  }, [])

  if (props.network === "avalanche") {
    balance = Number(balanceUsdcAvalanche)
    balanceStatus = statusUsdcAvalance
  } else if (props.network === "ethereum") {
    balance = Number(balanceUsdcEthereum)
    balanceStatus = statusUsdcEthereum
  } else if (props.network === "polygon") {
    balance = Number(balanceUsdcPolygon)
    balanceStatus = statusUsdcPolygon
    console.log("balanceStatus " + balanceStatus)
  }

  return (
    <React.Fragment>
      {balanceStatus == "done" ? balance.toFixed(2) : "Loading..."}
    </React.Fragment>
  )
}

export default AccountBalanceValueUSDC

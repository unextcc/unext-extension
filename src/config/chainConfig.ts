import { CHAIN_NAMESPACES, type CustomChainConfig } from "@web3auth/base"

import { config } from "~contents/config"

export const CHAIN_CONFIG = {
  mainnet: {
    blockExplorer: config.tokens[0].networks[1].scannerUrl + "/",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1",
    displayName: "Ethereum Mainnet",
    rpcTarget: config.tokens[0].networks[1].providerUrl,
    ticker: "ETH",
    tickerName: "Ethereum"
  } as CustomChainConfig,
  avalanche: {
    blockExplorer: config.tokens[0].networks[0].scannerUrl + "/",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xA86A",
    displayName: "Avalanche C-Chain Mainnet",
    rpcTarget: config.tokens[0].networks[0].providerUrl,
    ticker: "AVAX",
    tickerName: "AVAX"
  } as CustomChainConfig,
  polygon: {
    blockExplorer: config.tokens[0].networks[1].scannerUrl + "/",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x89",
    displayName: "Polygon Mainnet",
    rpcTarget: config.tokens[0].networks[1].providerUrl,
    ticker: "matic",
    tickerName: "Matic"
  } as CustomChainConfig
} as const

export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG

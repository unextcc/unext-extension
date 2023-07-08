import { Network } from "alchemy-sdk"

type envType = {
  tokens: {
    id: number
    decimals: number
    enabled: boolean
    fiat: string
    fiatSymbol: string
    name: string
    networks: {
      id: number
      alchemyApiKey: string
      alchemyNetwork: Network
      alchemyMaxRetries: number
      alchemyUrl: string
      chaindId: string
      contractAddress: string
      enabled: boolean
      name: string
      network: string
      providerUrl: string
      scannerUrl: string
    }[]
    symbol: string
  }[]
  cryptoTokens: {
    id: number
    decimals: number
    enabled: boolean
    name: string
    networks: {
      id: number
      alchemyApiKey: string
      alchemyNetwork: Network
      alchemyMaxRetries: number
      alchemyUrl: string
      chaindId: string
      contractAddress: string
      enabled: boolean
      name: string
      network: string
      providerUrl: string
      scannerUrl: string
    }[]
    symbol: string
  }[]
}

const prod: envType = {
  tokens: [
    {
      id: 0,
      decimals: 6,
      enabled: true,
      fiat: "USD",
      fiatSymbol: "$",
      name: "USD Coin",
      networks: [
        {
          id: 0,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "",
          chaindId: "none",
          contractAddress: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
          enabled: true,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "https://api.avax.network/ext/bc",
          scannerUrl: "https://subnets.avax.network"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-ethereum",
          chaindId: "none",
          contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          enabled: false,
          name: "ethereum",
          network: "z",
          providerUrl: "https://api.unext.cc/infura-ethereum",
          scannerUrl: "https://etherscan.io"
        }
      ],
      symbol: "USDC"
    },
    {
      id: 0,
      decimals: 6,
      enabled: false,
      fiat: "EUR",
      fiatSymbol: "€",
      name: "Euro Coin",
      networks: [
        {
          id: 0,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "",
          chaindId: "none",
          contractAddress: "0xC891EB4cbdEFf6e073e859e987815Ed1505c2ACD",
          enabled: true,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "https://api.avax.network/ext/bc",
          scannerUrl: "https://subnets.avax.network"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-ethereum",
          chaindId: "none",
          contractAddress: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c",
          enabled: true,
          name: "ethereum",
          network: "mainnet",
          providerUrl: "https://api.unext.cc/infura-ethereum",
          scannerUrl: "https://etherscan.io"
        }
      ],
      symbol: "EUROC"
    }
  ],
  cryptoTokens: [
    {
      id: 0,
      decimals: 18,
      enabled: true,
      name: "Avalanche",
      networks: [
        {
          id: 0,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "",
          chaindId: "",
          contractAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
          enabled: true,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "https://api.avax.network/ext/bc",
          scannerUrl: "https://subnets.avax.network"
        }
      ],
      symbol: "AVAX"
    },
    {
      id: 1,
      decimals: 18,
      enabled: false,
      name: "Ethereum",
      networks: [
        {
          id: 0,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-ethereum",
          chaindId: "none",
          contractAddress: "none",
          enabled: true,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "https://api.unext.cc/infura-ethereum",
          scannerUrl: "https://etherscan.com"
        }
      ],
      symbol: "ETH"
    }
  ]
}

const dev: envType = {
  tokens: [
    {
      id: 0,
      decimals: 6,
      enabled: true,
      fiat: "USD",
      fiatSymbol: "$",
      name: "USD Coin",
      networks: [
        {
          id: 0,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_GOERLI,
          alchemyUrl: "none",
          chaindId: "none",
          contractAddress: "0x5425890298aed601595a70ab815c96711a31bc65",
          enabled: true,
          name: "avalanche",
          network: "testnet",
          providerUrl: "https://api.avax-test.network/ext/bc",
          scannerUrl: "https://subnets-test.avax.network"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_GOERLI,
          alchemyUrl: "http://localhost:8000/alchemy-ethereum-goerli",
          chaindId: "none",
          contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
          enabled: false,
          name: "ethereum",
          network: "goerli",
          providerUrl: "http://localhost:8000/infura-ethereum-goerli",
          scannerUrl: ""
        }
      ],
      symbol: "USDC"
    },
    {
      id: 1,
      decimals: 6,
      enabled: false,
      fiat: "EUR",
      fiatSymbol: "€",
      name: "Euro Coin",
      networks: [
        {
          id: 0,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_GOERLI,
          alchemyUrl: "none",
          chaindId: "none",
          contractAddress: "0x5E44db7996c682E92a960b65AC713a54AD815c6B",
          enabled: false,
          name: "avalanche",
          network: "testnet",
          providerUrl: "https://api.avax-test.network/ext/bc",
          scannerUrl: "https://subnets-test.avax.network"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_GOERLI,
          alchemyUrl: "http://localhost:8000/alchemy-ethereum-goerli",
          chaindId: "none",
          contractAddress: "0xA683d909e996052955500DDc45CA13E25c76e286",
          enabled: false,
          name: "ethereum",
          network: "goerli",
          providerUrl: "http://localhost:8000/infura-ethereum-goerli",
          scannerUrl: ""
        }
      ],
      symbol: "EUROC"
    }
  ],
  cryptoTokens: [
    {
      id: 0,
      decimals: 18,
      enabled: true,
      name: "Avalanche",
      networks: [
        {
          id: 0,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_GOERLI,
          alchemyUrl: "",
          chaindId: "none",
          contractAddress: "",
          enabled: true,
          name: "avalanche",
          network: "testnet",
          providerUrl: "https://api.avax-test.network/ext/bc",
          scannerUrl: "https://subnets-test.avax.network"
        }
      ],
      symbol: "AVAX"
    },
    {
      id: 1,
      decimals: 18,
      enabled: false,
      name: "Ethereum",
      networks: [
        {
          id: 0,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "http://localhost:8000/alchemy-ethereum-goerli",
          chaindId: "none",
          contractAddress: "none",
          enabled: true,
          name: "ethereum",
          network: "goerli",
          providerUrl: "http://localhost:8000/infura-ethereum-goerli",
          scannerUrl: "https://goerli.etherscan.io"
        }
      ],
      symbol: "ETH"
    }
  ]
}

export const config = process.env.NODE_ENV === "development" ? dev : prod

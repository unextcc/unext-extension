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
          contractAddress: "",
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
          alchemyUrl: "",
          contractAddress: "",
          enabled: false,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "",
          scannerUrl: ""
        },
        {
          id: 2,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.MATIC_MAINNET,
          alchemyUrl: "",
          contractAddress: "",
          enabled: false,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "https://api.avax.network/ext/bc",
          scannerUrl: "https://subnets.avax.network"
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
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "",
          contractAddress: "",
          enabled: true,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "https://api.avax.network/ext/bc",
          scannerUrl: "https://subnets.avax.network"
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
          contractAddress: "",
          enabled: true,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "https://api.avax.network/ext/bc",
          scannerUrl: "https://subnets.avax.network"
        }
      ],
      symbol: "AVAX"
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
          alchemyUrl: "",
          contractAddress: "",
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
          alchemyUrl: "",
          contractAddress: "",
          enabled: false,
          name: "ethereum",
          network: "testnet",
          providerUrl: "",
          scannerUrl: ""
        },
        {
          id: 2,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.MATIC_MUMBAI,
          alchemyUrl: "",
          contractAddress: "",
          enabled: false,
          name: "polygon",
          network: "testnet",
          providerUrl: "",
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
          alchemyUrl: "",
          contractAddress: "",
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
          alchemyUrl: "",
          contractAddress: "",
          enabled: false,
          name: "ethereum",
          network: "testnet",
          providerUrl: "",
          scannerUrl: ""
        },
        {
          id: 2,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.MATIC_MUMBAI,
          alchemyUrl: "",
          contractAddress: "",
          enabled: false,
          name: "polygon",
          network: "testnet",
          providerUrl: "",
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
          contractAddress: "",
          enabled: true,
          name: "avalanche",
          network: "testnet",
          providerUrl: "https://api.avax-test.network/ext/bc",
          scannerUrl: "https://subnets-test.avax.network"
        }
      ],
      symbol: "AVAX"
    }
  ]
}

export const config = process.env.NODE_ENV === "development" ? dev : prod

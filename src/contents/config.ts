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
      chaindId: number
      contractAddress: string
      enabled: boolean
      gasStationUrl: string
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
      chaindId: number
      contractAddress: string
      enabled: boolean
      gasStationUrl: string
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
          chaindId: 1,
          contractAddress: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
          enabled: true,
          gasStationUrl: "",
          name: "avalanche",
          network: "mainnet",
          providerUrl: "api.avax.network",
          scannerUrl: "https://snowtrace.io"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-ethereum",
          chaindId: 0,
          contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          enabled: false,
          gasStationUrl: "",
          name: "ethereum",
          network: "mainnet",
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
          chaindId: 1,
          contractAddress: "0xC891EB4cbdEFf6e073e859e987815Ed1505c2ACD",
          gasStationUrl: "",
          enabled: true,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "api.avax.network",
          scannerUrl: "https://snowtrace.io"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-ethereum",
          chaindId: 0,
          contractAddress: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c",
          enabled: true,
          gasStationUrl: "",
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
          chaindId: 0,
          contractAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
          enabled: true,
          gasStationUrl: "",
          name: "avalanche",
          network: "mainnet",
          providerUrl: "api.avax.network",
          scannerUrl: "https://snowtrace.io"
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
          chaindId: 0,
          contractAddress: "0x",
          enabled: true,
          gasStationUrl: "",
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
          chaindId: 1,
          contractAddress: "0x5425890298aed601595a70ab815c96711a31bc65",
          enabled: true,
          gasStationUrl: "",
          name: "avalanche",
          network: "testnet",
          providerUrl: "api.avax-test.network",
          scannerUrl: "https://testnet.snowtrace.io"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_GOERLI,
          alchemyUrl: "http://localhost:8000/alchemy-ethereum-goerli",
          chaindId: 0,
          contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
          enabled: false,
          gasStationUrl:
            "https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=H8HXPX42N8MTQS7TZBD7RFTZUEJ2YV8Y98",
          name: "ethereum",
          network: "goerli",
          providerUrl: "http://localhost:8000/infura-ethereum-goerli",
          scannerUrl: "https://goerli.etherscan.io"
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
          chaindId: 1,
          contractAddress: "0x5E44db7996c682E92a960b65AC713a54AD815c6B",
          enabled: false,
          name: "avalanche",
          gasStationUrl: "",
          network: "testnet",
          providerUrl: "api.avax-test.network",
          scannerUrl: "https://testnet.snowtrace.io"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_GOERLI,
          alchemyUrl: "http://localhost:8000/alchemy-ethereum-goerli",
          chaindId: 0,
          contractAddress: "0xA683d909e996052955500DDc45CA13E25c76e286",
          enabled: false,
          gasStationUrl:
            "https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=H8HXPX42N8MTQS7TZBD7RFTZUEJ2YV8Y98",
          name: "ethereum",
          network: "goerli",
          providerUrl: "http://localhost:8000/infura-ethereum-goerli",
          scannerUrl: "https://goerli.etherscan.io"
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
          chaindId: 1,
          contractAddress: "",
          gasStationUrl: "",
          enabled: true,
          name: "avalanche",
          network: "testnet",
          providerUrl: "api.avax-test.network",
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
          chaindId: 0,
          contractAddress: "0x",
          enabled: true,
          gasStationUrl:
            "https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=H8HXPX42N8MTQS7TZBD7RFTZUEJ2YV8Y98",
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

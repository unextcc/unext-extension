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
      snowTraceApiUrl: string
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
      snowTraceApiUrl: string
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
          scannerUrl: "https://snowtrace.io",
          snowTraceApiUrl: "https://api.unext.cc/snow-trace"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-ethereum",
          chaindId: 0,
          contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          enabled: true,
          gasStationUrl: "",
          name: "ethereum",
          network: "mainnet",
          providerUrl: "https://api.unext.cc/infura-ethereum",
          scannerUrl: "https://etherscan.io",
          snowTraceApiUrl: ""
        },
        {
          id: 2,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.MATIC_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-polygon",
          chaindId: 0,
          contractAddress: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          enabled: true,
          gasStationUrl: "",
          name: "polygon",
          network: "mainnet",
          providerUrl: "https://api.unext.cc/infura-polygon",
          scannerUrl: "https://polygonscan.com",
          snowTraceApiUrl: ""
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
          contractAddress: "0xc891eb4cbdeff6e073e859e987815ed1505c2acd",
          gasStationUrl: "",
          enabled: false,
          name: "avalanche",
          network: "mainnet",
          providerUrl: "api.avax.network",
          scannerUrl: "https://snowtrace.io",
          snowTraceApiUrl: "https://api.unext.cc/snow-trace"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-ethereum",
          chaindId: 0,
          contractAddress: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c",
          enabled: false,
          gasStationUrl: "",
          name: "ethereum",
          network: "mainnet",
          providerUrl: "https://api.unext.cc/infura-ethereum",
          scannerUrl: "https://etherscan.io",
          snowTraceApiUrl: ""
        },
        {
          id: 2,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.MATIC_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-polygon",
          chaindId: 0,
          contractAddress: "",
          enabled: false,
          gasStationUrl: "",
          name: "polygon",
          network: "mainnet",
          providerUrl: "https://api.unext.cc/infura-polygon",
          scannerUrl: "https://polygonscan.com",
          snowTraceApiUrl: ""
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
          contractAddress: "",
          enabled: true,
          gasStationUrl: "",
          name: "avalanche",
          network: "mainnet",
          providerUrl: "api.avax.network",
          scannerUrl: "https://snowtrace.io",
          snowTraceApiUrl: "https://api.unext.cc/snow-trace"
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
          id: 1,
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
          scannerUrl: "https://etherscan.com",
          snowTraceApiUrl: ""
        }
      ],
      symbol: "ETH"
    },
    {
      id: 2,
      decimals: 18,
      enabled: true,
      name: "Matic",
      networks: [
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.MATIC_MAINNET,
          alchemyUrl: "https://api.unext.cc/alchemy-polygon",
          chaindId: 0,
          contractAddress: "0x0000000000000000000000000000000000001010",
          enabled: true,
          gasStationUrl: "",
          name: "avalanche",
          network: "mainnet",
          providerUrl: "https://api.unext.cc/infura-polygon",
          scannerUrl: "https://polygonscan.com",
          snowTraceApiUrl: ""
        }
      ],
      symbol: "MATIC"
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
          scannerUrl: "https://testnet.snowtrace.io",
          snowTraceApiUrl: "http://localhost:8000/snow-trace-testnet"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_GOERLI,
          alchemyUrl: "http://localhost:8000/alchemy-ethereum-goerli",
          chaindId: 0,
          contractAddress: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
          enabled: true,
          gasStationUrl:
            "http://localhost:8000/ethereum-gas-station?module=gastracker&action=gasestimate&gasprice=2000000000",
          name: "ethereum",
          network: "goerli",
          providerUrl: "http://localhost:8000/infura-ethereum-goerli",
          scannerUrl: "https://goerli.etherscan.io",
          snowTraceApiUrl: "http://localhost:8000/snow-trace-testnet"
        },
        {
          id: 2,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.MATIC_MUMBAI,
          alchemyUrl: "http://localhost:8000/alchemy-polygon-mumbai",
          chaindId: 0,
          contractAddress: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
          enabled: true,
          gasStationUrl: "",
          name: "polygon",
          network: "mumbai",
          providerUrl: "http://localhost:8000/infura-polygon-mumbai",
          scannerUrl: "https://mumbai.polygonscan.com",
          snowTraceApiUrl: ""
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
          contractAddress: "0x5e44db7996c682e92a960b65ac713a54ad815c6b",
          enabled: false,
          name: "avalanche",
          gasStationUrl: "",
          network: "testnet",
          providerUrl: "api.avax-test.network",
          scannerUrl: "https://testnet.snowtrace.io",
          snowTraceApiUrl: "http://localhost:8000/snow-trace-testnet"
        },
        {
          id: 1,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_GOERLI,
          alchemyUrl: "http://localhost:8000/alchemy-ethereum-goerli",
          chaindId: 0,
          contractAddress: "0xa683d909e996052955500ddc45ca13e25c76e286",
          enabled: false,
          gasStationUrl:
            "http://localhost:8000/ethereum-gas-station?module=gastracker&action=gasestimate&gasprice=2000000000",
          name: "ethereum",
          network: "goerli",
          providerUrl: "http://localhost:8000/infura-ethereum-goerli",
          scannerUrl: "https://goerli.etherscan.io",
          snowTraceApiUrl: ""
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
          scannerUrl: "https://subnets-test.avax.network",
          snowTraceApiUrl: "http://localhost:8000/snow-trace-testnet"
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
            "http://localhost:8000/ethereum-gas-station?module=gastracker&action=gasestimate&gasprice=2000000000",
          name: "ethereum",
          network: "goerli",
          providerUrl: "http://localhost:8000/infura-ethereum-goerli",
          scannerUrl: "https://goerli.etherscan.io",
          snowTraceApiUrl: ""
        }
      ],
      symbol: "ETH"
    },
    {
      id: 2,
      decimals: 18,
      enabled: false,
      name: "Matic",
      networks: [
        {
          id: 0,
          alchemyApiKey: "",
          alchemyMaxRetries: 3,
          alchemyNetwork: Network.ETH_MAINNET,
          alchemyUrl: "http://localhost:8000/alchemy-polygon-mumbai",
          chaindId: 0,
          contractAddress: "0x0000000000000000000000000000000000001010",
          enabled: true,
          gasStationUrl:
            "http://localhost:8000/ethereum-gas-station?module=gastracker&action=gasestimate&gasprice=2000000000",
          name: "Matic",
          network: "testnet",
          providerUrl: "http://localhost:8000/infura-polygon-mumbai",
          scannerUrl: "https://goerli.polygonscan.io",
          snowTraceApiUrl: ""
        }
      ],
      symbol: "MATIC"
    }
  ]
}

export const config = process.env.NODE_ENV === "development" ? dev : prod

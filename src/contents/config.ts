import {Network} from "alchemy-sdk";

type envType = {
  providerUrl: string;
  alchemyApiKey: string;
  alchemyNetwork: string;
  alchemyMaxRetries: number;
  etherScanUrl: string;
  tokens: {
    id: number;
    alchemyApiKey: string;
    alchemyNetwork: string;
    alchemyMaxRetries: number;
    blockchain: string;
    contractAddress: string;
    decimals: number;
    enabled: boolean;
    fiat: string;
    fiatSymbol: string;
    name: string;
    network: string;
    symbol: string;
    scannerUrl: string;
    providerUrl: string;
  }[];
  cryptoTokens: {
    id: number;
    alchemyApiKey: string;
    alchemyNetwork: string;
    alchemyMaxRetries: number;
    blockchain: string;
    contractAddress: string;
    decimals: number;
    enabled: boolean;
    name: string;
    network: string;
    symbol: string;
    scannerUrl: string;
    providerUrl: string;
  }[]
}

const prod = <envType>({
  tokens: [
    {
      id: 0,
      alchemyApiKey: 'vvihhyWLDnyBDx_UEdaB0f24ItIbeMyn',
      alchemyNetwork: Network.MATIC_MAINNET,
      alchemyMaxRetries: 1,
      blockchain: 'polygon',
      contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      decimals: 6,
      enabled: true,
      fiat: 'USD',
      fiatSymbol: '$',
      name: 'USD Coin',
      network: "mainnet",
      symbol: 'USDC',
      scannerUrl: 'https://polygonscan.com',
      providerUrl: ''
    },
    {
      id: 1,
      alchemyApiKey: '4RXAc01ERD8TgwdOzJknjQSmU5fxCAKP',
      alchemyNetwork: Network.ETH_MAINNET,
      alchemyMaxRetries: 1,
      blockchain: 'ethereum',
      contractAddress: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c",
      decimals: 6,
      enabled: true,
      fiat: 'EUR',
      fiatSymbol: '€',
      name: 'Euro Coin',
      network: "mainnet",
      symbol: 'EUROC',
      scannerUrl: 'https://etherscan.io',
      providerUrl: '',
    }
  ],
  cryptoTokens: [
    {
      id: 0,
      alchemyApiKey: 'vvihhyWLDnyBDx_UEdaB0f24ItIbeMyn',
      alchemyNetwork: Network.MATIC_MAINNET,
      alchemyMaxRetries: 1,
      blockchain: "polygon",
      contractAddress: "0x0000000000000000000000000000000000001010",
      decimals: 18,
      enabled: true,
      name: "Matic",
      network: "mainnet",
      symbol: "MATIC",
      scannerUrl: "https://polygonscan.com",
      providerUrl: "https://polygon-mainnet.unext.cc",
    }
  ]
});

const dev = <envType>({
  tokens: [
    {
      id: 0,
      alchemyApiKey: 'l1pSvMC4vAu8hap2qu5cN6nsuTnryRkT',
      alchemyNetwork: Network.MATIC_MUMBAI,
      alchemyMaxRetries: 1,
      blockchain: 'polygon',
      contractAddress: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
      decimals: 6,
      enabled: true,
      fiat: 'USD',
      fiatSymbol: '$',
      name: 'USD Coin',
      network: "mumbai",
      symbol: 'USDC',
      scannerUrl: 'https://mumbai.polygonscan.com',
      providerUrl: 'http://localhost:8000/infura-polygon-mumbai',
    },
    {
      id: 1,
      alchemyApiKey: 'zFXR_i23EsYS1DJ13gb3IOXrf7iR82kR',
      alchemyNetwork: Network.ETH_GOERLI,
      alchemyMaxRetries: 1,
      blockchain: 'polygon',
      contractAddress: "0xA683d909e996052955500DDc45CA13E25c76e286",
      decimals: 6,
      enabled: true,
      fiat: 'EUR',
      fiatSymbol: '€',
      name: 'Euro Coin',
      network: "mumbai",
      symbol: 'EUROC',
      scannerUrl: 'https://mumbai.polygonscan.com/',
      providerUrl: 'http://localhost:8000/infura-polygon-mumbai',
    }
  ],
  cryptoTokens: [
    {
      id: 0,
      alchemyApiKey: 'vvihhyWLDnyBDx_UEdaB0f24ItIbeMyn',
      alchemyNetwork: Network.MATIC_MUMBAI,
      alchemyMaxRetries: 1,
      blockchain: "polygon",
      contractAddress: "0x0000000000000000000000000000000000001010",
      decimals: 18,
      enabled: true,
      name: "Matic",
      network: "mumbai",
      symbol: "MATIC",
      scannerUrl: "https://mumbai.polygonscan.com",
      providerUrl: "http://localhost:8000/infura-polygon-mumbai",
    }
  ]
});

export const config = process.env.NODE_ENV === "development" ? dev : prod;

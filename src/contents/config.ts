import {Network} from "alchemy-sdk";

type envType = {
  providerUrl: string;
  alchemyApiKey: string;
  alchemyNetwork: string;
  alchemyMaxRetries: number;
  etherScanUrl: string;
  tokens: {
    id: number;
    contractAddress: string;
    decimals: number;
    enabled: boolean;
    fiat: string;
    fiatSymbol: string;
    name: string;
    network: string;
    symbol: string;
  }[];
}

const prod = <envType>({
  providerUrl: "https://mainnet.infura.io/v3/b401a8aed4fd4473aa9442f1b4c5cf98",
  alchemyApiKey: "4RXAc01ERD8TgwdOzJknjQSmU5fxCAKP",
  alchemyNetwork: Network.ETH_MAINNET,
  alchemyMaxRetries: 1,
  etherScanUrl: 'https://etherscan.io/tx',
  tokens: [
    {
      id: 0,
      contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      decimals: 6,
      enabled: true,
      fiat: 'USD',
      fiatSymbol: '$',
      name: 'USD Coin',
      network: "mainnet",
      symbol: 'USDC'
    },
    {
      id: 1,
      contractAddress: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c",
      decimals: 6,
      enabled: true,
      fiat: 'EUR',
      fiatSymbol: '€',
      name: 'Euro Coin',
      network: "mainnet",
      symbol: 'EUROC'
    }
  ],
});

const dev = <envType>({
  providerUrl: "https://goerli.infura.io/v3/b401a8aed4fd4473aa9442f1b4c5cf98",
  alchemyApiKey: "zFXR_i23EsYS1DJ13gb3IOXrf7iR82kR",
  alchemyNetwork: Network.ETH_GOERLI,
  alchemyMaxRetries: 1,
  etherScanUrl: 'https://goerli.etherscan.io/tx',
  tokens: [
    {
      id: 0,
      contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      decimals: 6,
      enabled: true,
      fiat: 'USD',
      fiatSymbol: '$',
      name: 'USD Coin',
      network: "goerli",
      symbol: 'USDC'
    },
    {
      id: 1,
      contractAddress: "0xA683d909e996052955500DDc45CA13E25c76e286",
      decimals: 6,
      enabled: true,
      fiat: 'EUR',
      fiatSymbol: '€',
      name: 'Euro Coin',
      network: "goerli",
      symbol: 'EUROC'
    }
  ]
});

export const config = process.env.NODE_ENV === "development" ? dev : prod;

import React, { createContext, useEffect, useState } from "react";
import { useStorage } from "@plasmohq/storage/dist/hook";
import {decryptAES} from "~utils/encryption";


type WalletContextType = {
  getPrivateKey: (walletId: number, lockPassword: string) => string;
  isWalletConfigured: boolean;
  saveWallet: (wallet: object) => void;
  wallets: {
    address: string,
    chain: string,
    currency: string,
    encryptedPrivateKey: string,
    id: number,
    network: string,
    tokens: {id: number, decimal: number, name: string, symbol: string}[]
  }[];
}

interface Props {
  children?: React.ReactNode;
}

export const WalletContext = createContext<WalletContextType>({
  getPrivateKey(walletId: number, lockPassword: string): string {return "";},
  isWalletConfigured: false,
  saveWallet(wallet: object): void {},
  wallets: []
});

const WalletContextProvider: React.FC<Props> = (props) => {
  const [wallets, setWallets] = useStorage(
    "unext-wallets",
    (v) => v === "undefined" ? "wallet" : v);

  const [isWalletConfigured, setIsWalletConfigured] = useState<boolean>(false);

  // Get privateKeys
  const getPrivateKey = (walletId: number, lockPassword: string): string => {
    return decryptAES(wallets[walletId].encryptedPrivateKey, lockPassword);
  }

  const saveWallet = async (wallet: object) => {
    await setWallets(wallet);
  }

  const walletContextValue: WalletContextType = {
    getPrivateKey: getPrivateKey,
    isWalletConfigured: isWalletConfigured,
    saveWallet: saveWallet,
    wallets: wallets
  }

  return (
    <WalletContext.Provider value={walletContextValue}>
      {props.children}
    </WalletContext.Provider>
  );
}

export default WalletContextProvider;

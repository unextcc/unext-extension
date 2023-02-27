import React, { createContext, useEffect, useState } from "react";
import { useStorage } from "@plasmohq/storage/dist/hook";
import {decryptAES} from "~utils/encryption";

type walletType = {
  id: number,
  address: string,
  chain: string,
  currency: string,
  encryptedPrivateKey: string,
  network: string,
  tokens: []
}[];


type WalletContextType = {
  getPrivateKey: (walletId: number, lockPassword: string) => string;
  isWalletConfigured: boolean;
  saveWallet: (wallet: walletType) => void;
  wallets: walletType[];
}

interface Props {
  children?: React.ReactNode;
}

export const WalletContext = createContext<WalletContextType>({
  getPrivateKey(walletId: number, lockPassword: string): string {return "";},
  isWalletConfigured: false,
  saveWallet(wallet: walletType): void {},
  wallets: []
});

const WalletContextProvider: React.FC<Props> = (props) => {
  const [wallets, setWallets] = useStorage(
    "wallets",
    (v) => v === "undefined" ? "wallets" : v);

  const [isWalletConfigured, setIsWalletConfigured] = useState<boolean>(true);

  // Get privateKeys
  const getPrivateKey = (walletId: number, lockPassword: string): string => {
    return decryptAES(wallets[walletId].encryptedPrivateKey, lockPassword);
  }

  const saveWallet = async (wallet: walletType) => {
    await setWallets([...wallets, wallet]);
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

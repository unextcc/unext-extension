import React, { createContext, useEffect, useState } from "react";
import { useStorage } from "@plasmohq/storage/dist/hook";
import {decryptAES} from "~utils/encryption";

type walletType = {
  id: number,
  address: string,
  chain: string,
  encryptedPrivateKey: string,
  network: string,
  tokens: number[]
};


type WalletContextType = {
  getPrivateKey: (walletId: number, lockPassword: string) => string;
  isWalletConfigured: boolean;
  saveWallet: (wallet: walletType) => void;
  wallets: walletType;
}

interface Props {
  children?: React.ReactNode;
}

export const WalletContext = createContext<WalletContextType>({
  getPrivateKey(walletId: number, lockPassword: string): string {return "";},
  isWalletConfigured: false,
  saveWallet(wallet: walletType): void {},
  wallets: {} as walletType
});

const WalletContextProvider: React.FC<Props> = (props) => {
  const [wallets, setWallets] = useStorage(
    "wallets",
    (v) => typeof v === "undefined" ? [] : v);

  const [isWalletConfigured, setIsWalletConfigured] = useState<boolean>(false);

  useEffect(() => {
    if (wallets.length !==0) {
      if (wallets.length > 0) {
        setIsWalletConfigured(true);
      }
    }
  },[wallets])

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

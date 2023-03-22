import React, { createContext, useEffect, useState } from "react";
import { useStorage } from "@plasmohq/storage/dist/hook";
import { decryptAES, encryptAES } from "~utils/encryption";

type walletType = {
  id: number,
  address: string,
  chain: string,
  network: string,
  tokens: number[]
}[];


type WalletContextType = {
  encryptedPrivateKey: string;
  changeWalletPassword: (
    currentEncryptedPrivateKey: string,
    currentLockPassword: string,
    newLockPassword: string
  ) => void;
  deleteWallet: () => void;
  getPrivateKey: (encryptedPrivateKey: string, lockPassword: string) => string;
  isWalletConfigured: boolean;
  saveWallet: (wallet: walletType) => void;
  saveEncryptedPrivateKey: (encryptedPrivateKey: string) => void;
  wallets: walletType;
}

interface Props {
  children?: React.ReactNode;
}

export const WalletContext = createContext<WalletContextType>({
  encryptedPrivateKey: "",
  changeWalletPassword(currentLockPassword, newLockPassword): void {},
  deleteWallet(): void {},
  getPrivateKey(encryptedPrivateKey, lockPassword): string {return "";},
  isWalletConfigured: false,
  saveWallet(wallet: walletType): void {},
  saveEncryptedPrivateKey(encryptedPrivateKey: string): void {},
  wallets: [] as walletType
});

const WalletContextProvider: React.FC<Props> = (props) => {
  const [wallets, setWallets] = useStorage(
    "wallets",
    (v) => typeof v === "undefined" ? [] : v);

  const [encryptedPrivateKey, setEncryptedPrivateKey] = useStorage(
    "encrypted-private-key",
    (v) => typeof v === "undefined" ? "" : v);

  const [isWalletConfigured, setIsWalletConfigured] = useState<boolean>(false);

  useEffect(() => {
    if (wallets.length !==0) {
      if (wallets.length > 0) {
        setIsWalletConfigured(true);
      }
    }
  },[wallets])


  // Get privateKeys
  const getPrivateKey = (encryptedPrivateKey: string, lockPassword: string): string => {
    return decryptAES(encryptedPrivateKey, lockPassword);
  };

  const saveEncryptedPrivateKey = async (encryptedPrivateKey: string) => {
    await setEncryptedPrivateKey(encryptedPrivateKey);
  };

  const saveWallet = async (wallet: walletType) => {
    console.log(wallets);

    await setWallets([wallet]);
  };

  const changeWalletPassword = async (
    currentEncryptedPrivateKey: string,
    currentLockPassword: string,
    newLockPassword: string
  ) => {
    const privateKey = getPrivateKey(currentEncryptedPrivateKey, currentLockPassword);
    const newEncryptedPrivateKey = encryptAES(privateKey, newLockPassword);

    await setEncryptedPrivateKey(newEncryptedPrivateKey);
  }

  const deleteWallet = async () => {
    await setWallets([])
  }

  const walletContextValue: WalletContextType = {
    encryptedPrivateKey: encryptedPrivateKey,
    changeWalletPassword: changeWalletPassword,
    deleteWallet: deleteWallet,
    getPrivateKey: getPrivateKey,
    isWalletConfigured: isWalletConfigured,
    saveWallet: saveWallet,
    saveEncryptedPrivateKey: saveEncryptedPrivateKey,
    wallets: wallets
  }

  return (
    <WalletContext.Provider value={walletContextValue}>
      {props.children}
    </WalletContext.Provider>
  );
}

export default WalletContextProvider;

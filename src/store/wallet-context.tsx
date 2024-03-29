import React, { createContext, useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/dist/hook"

import { decryptAES, encryptAES } from "~utils/encryption"
import { timeout } from "~utils/other"

type walletType = {
  id: number
  address: string
  avalancheCAddress: string
  avalanchePAddress: string
  avalancheXAddress: string
  tokens: number[]
  cryptoTokens: number[]
}[]

type WalletContextType = {
  avalancheEncryptedPrivateKey: string
  encryptedPrivateKey: string
  changeWalletPassword: (
    currentEncryptedPrivateKey: string,
    currentLockPassword: string,
    newLockPassword: string
  ) => void
  deleteWallet: () => void
  getPrivateKey: (encryptedPrivateKey: string, lockPassword: string) => string
  isWalletConfigured: boolean
  isWalletConfiguredLoaded: boolean
  saveWallet: (wallet: walletType) => void
  saveAvalancheEncryptedPrivateKey: (
    avalancheEncryptedPrivateKey: string
  ) => void
  saveEncryptedPrivateKey: (encryptedPrivateKey: string) => void
  wallets: walletType
}

interface Props {
  children?: React.ReactNode
}

export const WalletContext = createContext<WalletContextType>({
  avalancheEncryptedPrivateKey: "",
  encryptedPrivateKey: "",
  changeWalletPassword(currentLockPassword, newLockPassword): void {},
  deleteWallet(): void {},
  getPrivateKey(encryptedPrivateKey, lockPassword): string {
    return ""
  },
  isWalletConfigured: false,
  isWalletConfiguredLoaded: false,
  saveWallet(wallet: walletType): void {},
  saveAvalancheEncryptedPrivateKey(avalancheEncryptedPrivateKey): void {},
  saveEncryptedPrivateKey(encryptedPrivateKey: string): void {},
  wallets: [] as walletType
})

const WalletContextProvider: React.FC<Props> = (props) => {
  const [wallets, setWallets, { remove: removeWallets }] = useStorage(
    "wallets",
    (v) =>
      typeof v === "undefined"
        ? [
            [
              {
                address: "0x0000000000000000000000000000000000000000",
                chain: "none",
                id: 0,
                network: "none",
                tokens: [],
                cryptoTokens: []
              }
            ]
          ]
        : v
  )

  const [
    avalancheEncryptedPrivateKey,
    setAvalancheEncryptedPrivateKey,
    { remove: removeAvalancheEncryptedPrivateKey }
  ] = useStorage("avalanche-encrypted-private-key", (v) =>
    typeof v === "undefined" ? "" : v
  )

  const [
    encryptedPrivateKey,
    setEncryptedPrivateKey,
    { remove: removeEncryptedPrivateKey }
  ] = useStorage("encrypted-private-key", (v) =>
    typeof v === "undefined" ? "" : v
  )

  const [isWalletConfigured, setIsWalletConfigured] = useState<boolean>(true)
  const [isWalletConfiguredLoaded, setIsWalletConfiguredLoaded] =
    useState<boolean>(false)

  useEffect(() => {
    const isWalletConfiguredHandler = async () => {
      const storage = new Storage()

      try {
        setIsWalletConfiguredLoaded(false)

        const wallets = await storage.get("wallets")
        const wallet = wallets?.[0]?.[0]

        if (
          // @ts-ignore
          wallet?.address === "0x0000000000000000000000000000000000000000" &&
          !encryptedPrivateKey
        ) {
          setIsWalletConfigured(false)
        }

        await timeout(300)

        setIsWalletConfiguredLoaded(true)
      } catch (error) {
        console.error(error)
      }
    }

    isWalletConfiguredHandler()
  }, [wallets, encryptedPrivateKey])

  // Get privateKeys
  const getPrivateKey = (
    encryptedPrivateKey: string,
    lockPassword: string
  ): string => {
    return decryptAES(encryptedPrivateKey, lockPassword)
  }

  const saveAvalancheEncryptedPrivateKey = async (
    avalancheEncryptedPrivateKey: string
  ) => {
    await setAvalancheEncryptedPrivateKey(avalancheEncryptedPrivateKey)
  }

  const saveEncryptedPrivateKey = async (encryptedPrivateKey: string) => {
    await setEncryptedPrivateKey(encryptedPrivateKey)
  }

  const saveWallet = async (wallet: walletType) => {
    await setWallets([wallet])
  }

  const changeWalletPassword = async (
    currentEncryptedPrivateKey: string,
    currentLockPassword: string,
    newLockPassword: string
  ) => {
    const privateKey = getPrivateKey(
      currentEncryptedPrivateKey,
      currentLockPassword
    )
    const newEncryptedPrivateKey = encryptAES(privateKey, newLockPassword)

    await setEncryptedPrivateKey(newEncryptedPrivateKey)
  }

  const deleteWallet = async () => {
    // delete wallet date from local storage
    removeWallets()
    // delete encrypted private key from local storage
    removeEncryptedPrivateKey()
  }

  const walletContextValue: WalletContextType = {
    avalancheEncryptedPrivateKey: avalancheEncryptedPrivateKey,
    encryptedPrivateKey: encryptedPrivateKey,
    changeWalletPassword: changeWalletPassword,
    deleteWallet: deleteWallet,
    getPrivateKey: getPrivateKey,
    isWalletConfigured: isWalletConfigured,
    isWalletConfiguredLoaded: isWalletConfiguredLoaded,
    saveWallet: saveWallet,
    saveAvalancheEncryptedPrivateKey: saveAvalancheEncryptedPrivateKey,
    saveEncryptedPrivateKey: saveEncryptedPrivateKey,
    wallets: wallets
  }

  return (
    <WalletContext.Provider value={walletContextValue}>
      {props.children}
    </WalletContext.Provider>
  )
}

export default WalletContextProvider

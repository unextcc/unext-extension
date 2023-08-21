import ThresholdKey from "@tkey/default"
import { SecurityQuestionsModule } from "@tkey/security-questions"
import { WebStorageModule } from "@tkey/web-storage"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import BN from "bn.js"
import React, { createContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import Web3 from "web3"

import { config } from "~contents/config"
import { tKey } from "~utils/tkey"

export interface Web3TKContextInterface {
  address: string
  oAuthShare: any
  user: any | null
  privateKey: string
  provider: any | null
  changeSecurityQuestionAndAnswer: (password: string) => Promise<void> | null
  ethProvider: () => Promise<void> | null
  getAccounts: () => Promise<void> | null
  generateNewShareWithPassword: (password: string) => Promise<void> | null
  getPrivateKey: () => Promise<void> | null
  logout: () => void | null
  isLoading: boolean
  init: () => Promise<void> | null
  initializeNewKey: (password: string) => Promise<void> | null
  initWeb3Tk: () => Promise<void> | null
  recoverShare: (password: string) => Promise<void> | null
  resetAccount: () => Promise<void> | null
  triggerLogin: () => Promise<void>
}

interface Props {
  children?: React.ReactNode
}

export const Web3TKContext = createContext<Web3TKContextInterface>({
  address: "",
  oAuthShare: null,
  privateKey: "",
  provider: null,
  user: null,
  changeSecurityQuestionAndAnswer: () => null,
  ethProvider: () => null,
  getAccounts: () => null,
  generateNewShareWithPassword: () => null,
  getPrivateKey: () => null,
  logout: () => null,
  isLoading: true,
  init: () => null,
  initializeNewKey: () => null,
  initWeb3Tk: () => null,
  recoverShare: () => null,
  resetAccount: () => null,
  triggerLogin: async () => {}
})

export const Web3TKContextProvider: React.FC<Props> = (props: Props) => {
  const [address, setAddress] = useState("")
  const [isLoading, setIsloading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [oAuthShare, setOAuthShare] = useState<any>(null)
  const [privateKey, setPrivateKey] = useState("")
  const [provider, setProvider] = useState<any>(null)

  const getPrivateKey = async () => {}

  const init = async () => {
    setIsloading(true)

    await initWeb3Tk()
    await ethProvider()

    setIsloading(false)
  }

  const initWeb3Tk = async () => {
    // Initialization of Service Provider
    try {
      await (tKey.serviceProvider as any).init({ skipInit: true })
      if (
        window.location.pathname === "/auth" &&
        window.location.hash.includes("#state")
      ) {
        let result = await (
          tKey.serviceProvider as any
        ).directWeb.getRedirectResult()
        tKey.serviceProvider.postboxKey = new BN(
          (result.result as any).privateKey!,
          "hex"
        )
        setUser((result.result as any).userInfo)
        setOAuthShare((result.result as any).privateKey)
        initializeNewKey("password")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsloading(false)
    }
  }

  const ethProvider = async () => {
    const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
      /*
      used for privateKey generation only
      */
      config: {
        chainConfig: {
          chainId: "0x5",
          rpcTarget: config.cryptoTokens[1].networks[0].providerUrl,
          displayName: "Ethereum " + config.cryptoTokens[1].networks[0].network,
          blockExplorer: config.cryptoTokens[1].networks[0].scannerUrl,
          ticker: "ETH",
          tickerName: "Ethereum"
        }
      }
    })
    /*
    pass user's private key here.
    after calling setupProvider, we can use
    */
    if (privateKey) {
      await ethereumPrivateKeyProvider.setupProvider(privateKey)
      console.log(ethereumPrivateKeyProvider.provider)
      setProvider(ethereumPrivateKeyProvider)
    }
  }

  const triggerLogin = async () => {
    if (!tKey) {
      console.log("tKey not initialized yet")
      return
    }

    try {
      // Triggering Login using Service Provider ==> opens the popup
      const loginResponse = await (tKey.serviceProvider as any).triggerLogin({
        typeOfLogin: "google",
        verifier: "tkey-google-test",
        clientId:
          "635149666301-lgpmqrs6gnmh5pj297hph0kvertqm5fb.apps.googleusercontent.com"
      })
      console.log(loginResponse)
      setUser(loginResponse.userInfo)
      setOAuthShare(loginResponse.privateKey)
      setAddress(loginResponse.publicAddress)
    } catch (error) {
      console.error(error)
    }
  }

  const initializeNewKey = async (password: string) => {
    if (!tKey) {
      console.log("tKey not initialized yet")
      return
    }
    try {
      // Initialization of tKey
      await tKey.initialize() // 1/2 flow
      // Gets the deviceShare
      try {
        // throw new Error('Device share not found');
        await (tKey.modules.webStorage as any).inputShareFromWebStorage() // 2/2 flow
      } catch (e) {
        console.log(e)
        await recoverShare(password)
      }

      // Checks the requiredShares to reconstruct the tKey,
      // starts from 2 by default and each of the above share reduce it by one
      const { requiredShares } = tKey.getKeyDetails()
      if (requiredShares <= 0) {
        const reconstructedKey = await tKey.reconstructKey()
        setPrivateKey(reconstructedKey?.privKey.toString("hex"))
      }
    } catch (error) {
      console.error(error, "cought")
    }
  }

  const changeSecurityQuestionAndAnswer = async (password: string) => {
    if (!tKey) {
      console.log("tKey not initialized yet")
      return
    }

    if (password.length < 10) {
      console.log("password must be at least 10 charater long")
      return
    }

    await (
      tKey.modules.securityQuestions as any
    ).changeSecurityQuestionAndAnswer(password, "What is your password?")
    Swal.fire(
      "Success",
      "Successfully changed new share with password.",
      "success"
    )
    console.log("Successfully changed new share with password.")
  }

  const generateNewShareWithPassword = async (password: string) => {
    if (!tKey) {
      console.log("tKey not initialized yet")
      return
    }

    if (password.length < 10) {
      console.log("password must be at least 10 charater long")
      return
    }

    try {
      await (
        tKey.modules.securityQuestions as any
      ).generateNewShareWithSecurityQuestions(
        password,
        "What is your password?"
      )
      Swal.fire(
        "Success",
        "Successfully generated new share with password.",
        "success"
      )
      console.log("Successfully generated new share with password.")
    } catch (error) {
      Swal.fire("Error", (error as any)?.message.toString(), "error")
    }
  }

  const recoverShare = async (password: string) => {
    if (!tKey) {
      console.log("tKey not initialized yet")
      return
    }

    if (password.length < 10) {
      console.log("password must be at least 10 charater long")
      return
    }

    try {
      await (
        tKey.modules.securityQuestions as any
      ).inputShareFromSecurityQuestions(password) // 2/2 flow
      const { requiredShares } = tKey.getKeyDetails()
      if (requiredShares <= 0) {
        const reconstructedKey = await tKey.reconstructKey()
        setPrivateKey(reconstructedKey?.privKey.toString("hex"))
      }
      const newShare = await tKey.generateNewShare()
      const shareStore = await tKey.outputShareStore(newShare.newShareIndex)
      await (tKey.modules.webStorage as any).storeDeviceShare(shareStore)
      Swal.fire(
        "Success",
        "Successfully logged you in with the recovery password.",
        "success"
      )
      console.log("Successfully logged you in with the recovery password.")
    } catch (error) {
      Swal.fire("Error", (error as any)?.message.toString(), "error")
      console.error(error)
      logout()
    }
  }

  const resetAccount = async () => {
    if (!tKey) {
      console.log("tKey not initialized yet")
      return
    }

    try {
      await tKey.storageLayer.setMetadata({
        privKey: oAuthShare,
        input: { message: "KEY_NOT_FOUND" }
      })
      Swal.fire("Success", "Reset account successful!", "success")
      console.log("Reset account successful!")
    } catch (error) {
      console.error(error)
    }
  }

  const logout = (): void => {
    setUser(null)
    Swal.fire("Success", "Log out successful!", "success")
    console.log("Log out successful!")
  }

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet")
      return
    }
    const web3 = new Web3(provider)
    const address = (await web3.eth.getAccounts())[0]
    setAddress(address)
  }

  const web3ContextValue: Web3TKContextInterface = {
    address,
    oAuthShare,
    privateKey,
    provider,
    user,
    getPrivateKey,
    initWeb3Tk,
    changeSecurityQuestionAndAnswer,
    ethProvider,
    getAccounts,
    generateNewShareWithPassword,
    logout,
    initializeNewKey,
    recoverShare,
    resetAccount,
    triggerLogin,
    isLoading,
    init
  }

  return (
    <Web3TKContext.Provider value={web3ContextValue}>
      {props.children}
    </Web3TKContext.Provider>
  )
}

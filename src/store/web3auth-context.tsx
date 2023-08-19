import {
  type Maybe,
  type RequestArguments,
  type SafeEventEmitterProvider,
  type UserAuthInfo,
  WALLET_ADAPTERS
} from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { Web3AuthNoModal } from "@web3auth/no-modal"
import {
  OpenloginAdapter,
  type OpenloginUserInfo
} from "@web3auth/openlogin-adapter"
import React, { createContext, useState } from "react"

import RPC from "~utils/web3RPC"

import { type WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork"

export interface IWeb3AuthContext {
  address: string
  chainIdFromRPC: string | null
  user: OpenloginUserInfo | undefined
  userIdToken: UserAuthInfo | null
  privateKey: string | null
  error: any | null
  isLoading: boolean
  provider: SafeEventEmitterProvider | null
  web3auth: Web3AuthNoModal | null
  initWeb3auth: (
    clientId: string,
    chainNamespace: "eip155" | "solana" | "other",
    chainId: string,
    rpcTarget: string,
    displayName: string,
    blockExplorer: string,
    ticker: string,
    tickerName: string,
    web3AuthNetwork: WEB3AUTH_NETWORK_TYPE
  ) => Promise<void> | null
  authenticateUser: () => Promise<void> | null
  login: () => Promise<void> | null
  logout: () => Promise<void> | null
  getChainId: () => Promise<void> | null
  getAddresse: () => Promise<void> | null
  getUserInfo: () => Promise<void> | null
  getPrivateKey: () => Promise<void> | null
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  address: "",
  chainIdFromRPC: "",
  user: {
    verifier: "",
    verifierId: "",
    typeOfLogin: "line"
  },
  userIdToken: {
    idToken: ""
  },
  privateKey: "",
  error: {},
  isLoading: false,
  provider: {
    //@ts-ignore
    sendAsync: undefined,
    //@ts-ignore
    send: undefined,
    request: function <T>(args: RequestArguments): Promise<Maybe<T>> {
      throw new Error("Function not implemented.")
    },
    emit: function (type: string, ...args: any[]): boolean {
      throw new Error("Function not implemented.")
    },
    addListener: function (
      eventName: string | symbol,
      listener: (...args: any[]) => void
    ): SafeEventEmitterProvider {
      throw new Error("Function not implemented.")
    },
    on: function (
      eventName: string | symbol,
      listener: (...args: any[]) => void
    ): SafeEventEmitterProvider {
      throw new Error("Function not implemented.")
    },
    once: function (
      eventName: string | symbol,
      listener: (...args: any[]) => void
    ): SafeEventEmitterProvider {
      throw new Error("Function not implemented.")
    },
    removeListener: function (
      eventName: string | symbol,
      listener: (...args: any[]) => void
    ): SafeEventEmitterProvider {
      throw new Error("Function not implemented.")
    },
    off: function (
      eventName: string | symbol,
      listener: (...args: any[]) => void
    ): SafeEventEmitterProvider {
      throw new Error("Function not implemented.")
    },
    removeAllListeners: function (
      event?: string | symbol | undefined
    ): SafeEventEmitterProvider {
      throw new Error("Function not implemented.")
    },
    setMaxListeners: function (n: number): SafeEventEmitterProvider {
      throw new Error("Function not implemented.")
    },
    getMaxListeners: function (): number {
      throw new Error("Function not implemented.")
    },
    listeners: function (eventName: string | symbol): Function[] {
      throw new Error("Function not implemented.")
    },
    rawListeners: function (eventName: string | symbol): Function[] {
      throw new Error("Function not implemented.")
    },
    listenerCount: function (eventName: string | symbol): number {
      throw new Error("Function not implemented.")
    },
    prependListener: function (
      eventName: string | symbol,
      listener: (...args: any[]) => void
    ): SafeEventEmitterProvider {
      throw new Error("Function not implemented.")
    },
    prependOnceListener: function (
      eventName: string | symbol,
      listener: (...args: any[]) => void
    ): SafeEventEmitterProvider {
      throw new Error("Function not implemented.")
    },
    eventNames: function (): (string | symbol)[] {
      throw new Error("Function not implemented.")
    }
  },
  web3Auth: null,
  initWeb3auth: () => null,
  authenticateUser: () => null,
  login: () => null,
  logout: () => null,
  getChainId: () => null,
  getAddresse: () => null,
  getUserInfo: () => null,
  getPrivateKey: () => null
})

interface Props {
  children?: React.ReactNode
}

export const Web3AuthProvider: React.FC<Props> = (props) => {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null)
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any | null>(null)
  const [user, setUser] = useState<OpenloginUserInfo>()
  const [userIdToken, setUserIdToken] = useState<UserAuthInfo | null>(null)
  const [chainIdFromRPC, setChainIdFromRPC] = useState<string | null>(null)
  const [address, setAddress] = useState<string>("")
  const [privateKey, setPrivateKey] = useState<string | null>(null)

  const initWeb3auth = async (
    clientId: string,
    chainNamespace: "eip155" | "solana" | "other",
    chainId: string,
    rpcTarget: string,
    displayName: string,
    blockExplorer: string,
    ticker: string,
    tickerName: string,
    web3AuthNetwork: WEB3AUTH_NETWORK_TYPE
  ) => {
    try {
      setIsLoading(true)

      const chainConfig = {
        chainNamespace: chainNamespace,
        chainId: chainId,
        rpcTarget: rpcTarget,
        displayName: displayName,
        blockExplorer: blockExplorer,
        ticker: ticker,
        tickerName: tickerName
      }

      const web3auth = new Web3AuthNoModal({
        clientId,
        web3AuthNetwork,
        chainConfig: chainConfig
      })

      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig }
      })

      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          whiteLabel: {
            name: "uNeXT",
            logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
            logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            defaultLanguage: "en",
            dark: false
          }
        },
        privateKeyProvider: privateKeyProvider
      })
      web3auth.configureAdapter(openloginAdapter)
      setWeb3auth(web3auth)

      await web3auth.init()

      if (web3auth.provider) {
        setProvider(web3auth.provider)
      }
    } catch (error) {
      setError(error)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async () => {
    if (!web3auth) {
      console.error("web3auth not initialized yet!")
      return
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        mfaLevel: "none",
        loginProvider: "google"
      }
    )
    setProvider(web3authProvider)
  }

  const authenticateUser = async () => {
    if (!web3auth) {
      console.error("web3auth not initialized yet")
      return
    }
    const idToken = await web3auth.authenticateUser()
    setUserIdToken(idToken)
  }

  const getUserInfo = async () => {
    if (!web3auth) {
      console.error("web3auth not initialized yet")
      return
    }
    const userInfo = await web3auth.getUserInfo()
    //@ts-ignore
    setUser(userInfo)
  }

  const logout = async () => {
    if (!web3auth) {
      console.error("web3auth not initialized yet")
      return
    }
    await web3auth.logout()
    setProvider(null)
  }

  const getChainId = async () => {
    if (!provider) {
      console.error("provider not initialized yet")
      return
    }
    const rpc = new RPC(provider)
    const chainId = await rpc.getChainId()
    setChainIdFromRPC(chainId)
  }

  const getAddresse = async () => {
    if (!provider) {
      console.error("provider not initialized yet")
      return
    }
    const rpc = new RPC(provider)
    const address = await rpc.getAccounts()
    setAddress(address)
  }

  const getPrivateKey = async () => {
    if (!provider) {
      console.error("provider not initialized yet")
      return
    }
    const rpc = new RPC(provider)
    const privateKey = await rpc.getPrivateKey()
    setPrivateKey(privateKey)
  }

  const contextProvider: IWeb3AuthContext = {
    address,
    authenticateUser,
    chainIdFromRPC,
    error,
    getAddresse,
    getChainId,
    getPrivateKey,
    getUserInfo,
    isLoading,
    login,
    logout,
    privateKey,
    provider,
    user,
    userIdToken,
    web3auth,
    initWeb3auth
  }

  return (
    <Web3AuthContext.Provider value={contextProvider}>
      {props.children}
    </Web3AuthContext.Provider>
  )
}

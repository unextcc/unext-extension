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
  loggedIn: boolean
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
  login: (provider: string) => Promise<void> | null
  loginEmail: (email: string) => Promise<void> | null
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
  loggedIn: false,
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
  loginEmail: () => null,
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
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

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
        chainConfig: chainConfig,
        enableLogging: true,
        storageKey: "local",
        sessionTime: 3600
      })

      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig }
      })

      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          storageKey: "local",
          loginConfig: {
            google: {
              verifier: "tkey-google-test",
              typeOfLogin: "google",
              clientId:
                "635149666301-lgpmqrs6gnmh5pj297hph0kvertqm5fb.apps.googleusercontent.com"
            },
            facebook: {
              verifier: "unext-testing-facebook",
              typeOfLogin: "facebook",
              clientId: "314373137759612"
            },
            twitch: {
              verifier: "unext-test-twitch",
              typeOfLogin: "twitch",
              clientId: "grg8pb0o1uuuqnq43cjy9i5typed2v"
            },
            discord: {
              verifier: "unext-test-discord",
              typeOfLogin: "discord",
              clientId: "1143580750394961941"
            }
          },
          sessionTime: 3600,
          uxMode: "popup",
          whiteLabel: {
            name: "uNeXT",
            url: "https://unext.cc",
            logoLight: "https://unext.cc/img/usdn_logo.svg",
            logoDark: "https://unext.cc/img/usdn_logo.svg",
            defaultLanguage: "en",
            dark: false
          },
          mfaSettings: {
            deviceShareFactor: {
              enable: true,
              priority: 1,
              mandatory: true
            },
            backUpShareFactor: {
              enable: true,
              priority: 2,
              mandatory: true
            },
            socialBackupFactor: {
              enable: false,
              priority: 3,
              mandatory: false
            },
            passwordFactor: {
              enable: true,
              priority: 4,
              mandatory: true
            }
          }
        },
        loginSettings: {
          mfaLevel: "mandatory"
        },
        privateKeyProvider: privateKeyProvider
      })
      web3auth.configureAdapter(openloginAdapter)
      setWeb3auth(web3auth)

      await web3auth.init()

      setProvider(web3auth.provider)

      if (web3auth.connected) {
        setLoggedIn(true)
      }
    } catch (error) {
      setError(error)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (provider: string) => {
    if (!web3auth) {
      console.error("web3auth not initialized yet!")
      return
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: provider
      }
    )
    setProvider(web3authProvider)
    setLoggedIn(true)
  }

  const loginWithEmail = async (email: string) => {
    if (!web3auth) {
      console.log("web3auth not initialized yet")
      return
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "email_passwordless",
        extraLoginOptions: {
          login_hint: email
        }
      }
    )
    setProvider(web3authProvider)

    if (web3auth.connected) {
      setLoggedIn(true)
    }
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
    setLoggedIn(true)
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
    loggedIn,
    login,
    loginEmail: loginWithEmail,
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

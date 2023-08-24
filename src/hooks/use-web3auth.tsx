import {
  CHAIN_NAMESPACES,
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
import { useState } from "react"

import type { WEB3AUTH_NETWORK_TYPE } from "~config/web3AuthNetwork"
import RPC from "~utils/web3RPC"

export const useWeb3auth = () => {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null)
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)
  const [user, setUser] = useState<OpenloginUserInfo>()
  const [userIdToken, setUserIdToken] = useState<UserAuthInfo | null>(null)
  const [chainIdFromRPC, setChainIdFromRPC] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
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

  return {
    address: address,
    chainIdFromRPC: chainIdFromRPC,
    user: user,
    userIdToken: userIdToken,
    privateKey: privateKey,
    error: error,
    isLoading: isLoading,
    initWeb3auth: initWeb3auth,
    provider: provider,
    web3auth: web3auth,
    login: login,
    authenticateUser: authenticateUser,
    logout: logout,
    getChainId: getChainId,
    getAddresse: getAddresse,
    getUserInfo: getUserInfo,
    getPrivateKey: getPrivateKey
  }
}

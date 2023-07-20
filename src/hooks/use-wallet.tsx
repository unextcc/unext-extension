import { Buffer as BufferAvalanche } from "@avalabs/avalanchejs"
import { KeyChain as AVMKeyChain } from "@avalabs/avalanchejs/dist/apis/avm"
import { KeyChain } from "@avalabs/avalanchejs/dist/apis/evm"
import { KeyChain as PlatformKeyChain } from "@avalabs/avalanchejs/dist/apis/platformvm"
import { privateToAddress } from "ethereumjs-util"
import { useState } from "react"

import { config } from "~contents/config"
import { ava, avm, bintools, pChain } from "~utils/AVA"
import { encryptAES } from "~utils/encryption"

type accountType = {
  address: string
  avalancheCAddress: string
  avalanchePAddress: string
  avalancheXAddress: string
}

export const useCreateAccount = () => {
  const [account, setAccount] = useState<accountType>({
    address: "",
    avalancheCAddress: "",
    avalanchePAddress: "",
    avalancheXAddress: ""
  })

  const [chainId, setChainId] = useState<string>()
  const [chainIdPlatform, setChainIdPlatform] = useState<string>()

  const [encryptedPrivateKey, setEncryptedPrivateKey] = useState<string>("")
  const [encryptedAvalanchePrivateKey, setEncryptedAvalanchePrivateKey] =
    useState<string>("")

  const [error, setError] = useState<{}>({})
  const [status, setStatus] = useState<string>("idle")

  const createAccount = async (password: string) => {
    setStatus("working")

    try {
      // get chain alias or id & set them to state
      const chainId = avm.getBlockchainAlias() || avm.getBlockchainID()
      const chainIdPlatform =
        pChain.getBlockchainAlias() || pChain.getBlockchainID()
      setChainId(chainId)
      setChainIdPlatform(chainIdPlatform)

      const hrp = ava.getHRP()

      // AVM key chain & key pair
      const keyChain = new AVMKeyChain(hrp, chainId)
      const pk = keyChain.makeKey().getPrivateKeyString()
      const keyPair = keyChain.importKey(pk)
      setEncryptedAvalanchePrivateKey(
        encryptAES(password, keyPair.getPrivateKeyString())
      )

      // Platform key chain & key pair
      const pKeyChain = new PlatformKeyChain(hrp, chainIdPlatform)
      const pKeyPair = pKeyChain.importKey(pk)

      // EVM keychain & keypair
      const pkBuf = bintools.cb58Decode(pk.split("-")[1])
      const pkHex = pkBuf.toString("hex")
      const pkBuffNative = Buffer.from(pkHex, "hex")

      const ethereumPrivateKey = pkHex
      const ethereumAddress = privateToAddress(pkBuffNative).toString("hex")
      setEncryptedPrivateKey(encryptAES(password, ethereumPrivateKey))

      const cPrivKey =
        `PrivateKey-` + bintools.cb58Encode(BufferAvalanche.from(pkBuf))

      const cKeyChain = new KeyChain(ava.getHRP(), "C")
      const cKeyPair = cKeyChain.importKey(cPrivKey)

      // set account to state
      setAccount({
        address: "0x" + ethereumAddress,
        avalancheCAddress: cKeyPair.getAddressString(),
        avalanchePAddress: pKeyPair.getAddressString(),
        avalancheXAddress: keyPair.getAddressString()
      })

      setStatus("success")
    } catch (err: any) {
      setError(err)
      setStatus("error")
    }
  }

  return {
    account,
    chainId,
    chainIdPlatform,
    encryptedAvalanchePrivateKey,
    encryptedPrivateKey,
    error,
    isError: status === "error",
    status,
    createAccount
  }
}

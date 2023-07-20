import BinTools from "@avalabs/avalanchejs/dist/utils/bintools"
import { useEffect, useState } from "react"

import { cChain } from "~utils/AVA"

export const useAvalancheGetAssetBalance = (
  address: string,
  block: string,
  assetId: string
) => {
  const [balance, setBalance] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState("idle")

  const bintools: BinTools = BinTools.getInstance()

  useEffect(() => {
    if (!address || !assetId || !block) return

    const getAssetBalance = async (
      address: string,
      block: string = "latest",
      assetId: string
    ) => {
      setStatus("loading")

      try {
        const tx_id_cb58 = await bintools.cb58Encode(
          bintools.stringToBuffer(
            "0x81c8dd94df9073e0b846f0fef890359af49302416897764f049842321067949e"
          )
        )
        console.log("tx_id_cb58: " + tx_id_cb58)
        const tx = await cChain.getAtomicTx(tx_id_cb58)
        console.log(tx)

        // const balance = await cChain.getAssetBalance(address, block, assetId)
        // console.log("Avalanche Balance: " + balance)
        // setBalance(balance.toString())
      } catch (err: any) {
        setError("error")
        console.error(err)
      }
    }

    getAssetBalance(address, block, assetId)
  }, [])

  return {
    balance,
    error,
    isError: status === "error",
    isLoading: status === "loading",
    isLoaded: status === "loaded"
  }
}

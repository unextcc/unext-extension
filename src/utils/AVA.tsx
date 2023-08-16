import Avalanche from "@avalabs/avalanchejs"
import {
  AVMAPI,
  KeyChain as AVMKeyChain
} from "@avalabs/avalanchejs/dist/apis/avm"
import { EVMAPI } from "@avalabs/avalanchejs/dist/apis/evm"
import { InfoAPI } from "@avalabs/avalanchejs/dist/apis/info"
import BinTools from "@avalabs/avalanchejs/dist/utils/bintools"

import { config } from "~contents/config"

const ip: string = config.tokens[0].networks[0].providerUrl
const port: number = 443
const protocol: string = "https"
const network_id: number = config.tokens[0].networks[0].chaindId
const chain_id: string = "C"
const bintools: BinTools = BinTools.getInstance()
const ava: Avalanche = new Avalanche(ip, port, protocol, network_id, chain_id)

const avm: AVMAPI = ava.XChain()
const cChain: EVMAPI = ava.CChain()
const pChain = ava.PChain()
const infoApi: InfoAPI = ava.Info()
const keyChain: AVMKeyChain = avm.keyChain()

function isValidAddress(addr: string) {
  try {
    const res = bintools.stringToAddress(addr)
    return true
  } catch (err) {
    return false
  }
}

export { ava, avm, pChain, cChain, infoApi, bintools, isValidAddress, keyChain }

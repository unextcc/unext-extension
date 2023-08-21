import ThresholdKey from "@tkey/default"
import SecurityQuestionsModule from "@tkey/security-questions"
import WebStorageModule from "@tkey/web-storage"

import { config } from "~contents/config"

// Configuration of Service Provider
const customAuthArgs = {
  web3AuthClientId:
    "BDt0goadT_ranJPDFQOFQ99lyxgztp6bwD07ebFkoHN3KvEdZlKuDPJ6ivtqoSABlzB6QlaBJgpZU0o7xztLjpQ",
  baseUrl: window.location.origin,
  redirectPathName: "auth",
  enableLogging: true,
  uxMode: "redirect",
  network: config.web3TkAuthNetwork // based on the verifier network.
}
// Configuration of Modules
const webStorageModule = new WebStorageModule()
const securityQuestionsModule = new SecurityQuestionsModule()

// Instantiation of tKey
export const tKey = new ThresholdKey({
  modules: {
    webStorage: webStorageModule,
    securityQuestions: securityQuestionsModule
  },
  customAuthArgs: customAuthArgs as any
})

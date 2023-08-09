import CryptoJS from "crypto-js"

/*
 * Encrypt a derived hd private key with a given pin and return it in Base64 form
 */
export const encryptAES = (text: string, key: string) => {
  return CryptoJS.AES.encrypt(text, key).toString()
}

/**
 * Decrypt an encrypted message
 * @param encryptedBase64 encrypted data in base64 format
 * @param key The secret key
 * @return The decrypted content
 */

export const decryptAES = (encryptedBase64: string, key: string): string => {
  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key)

  if (decrypted) {
    try {
      const str: string = decrypted.toString(CryptoJS.enc.Utf8)
      if (str.length > 0) {
        return str
      } else {
        return "Could not decrypt the private key! Check your wallet password!"
      }
    } catch (error: any) {
      return error
    }
  }

  return "Something went wrong!"
}

/**
 * Verify wallet password
 * @param encryptedBase64 encrypted data in base64 format
 * @param key The secret key
 * @return true if password is correct, false if password is incorrect
 */
export const verifyPassword = (
  encryptedBase64: string,
  key: string
): boolean => {
  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key)

  console.log(decrypted)

  if (decrypted) {
    try {
      const str = decrypted.toString(CryptoJS.enc.Utf8)
      console.log(str)
      return str.length > 0
    } catch (error: any) {
      console.log("The wallet password is wrong! (Probably)")
      console.log(error)
      return false
    }
  }

  return false
}

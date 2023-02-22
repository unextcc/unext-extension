import Web3 from 'web3';
import { useState } from "react";

export const useWeb3CreateAccount = () => {
  const [account, setAccount] = useState<{ address: string; privateKey: string; encryptedPrivateKey: string }>({
    encryptedPrivateKey: "", privateKey: "", address: ""
  });
  const [error, setError] = useState<{}>({});
  const [status, setStatus] = useState<string>("idle");

  const createAccount = async (password: string, providerUrl: string) => {}

}

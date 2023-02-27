import Web3 from 'web3';
import { useState } from "react";
import { config } from "~contents/config";
import { encryptAES } from "~utils/encryption";

type accountType = {
  address: string,
  privateKey: string;
  encryptedPrivateKey: string;
}

export const useWeb3CreateAccount = () => {
  const [account, setAccount] = useState<accountType>(
    {encryptedPrivateKey: "", privateKey: "", address: ""}
  );
  const [error, setError] = useState<{}>({});
  const [status, setStatus] = useState<string>("idle");

  const createAccount = async (password: string, providerUrl: string) => {
    setStatus('working');
    try {
      const web3 = await new Web3(new Web3.providers.HttpProvider(providerUrl));
      const createAccount = await web3.eth.accounts.create();
      const encryptedPrivateKey = encryptAES(createAccount.privateKey, password);

      setAccount({
        address: createAccount.address,
        privateKey: createAccount.privateKey,
        encryptedPrivateKey
      });
      setStatus('success')
    } catch (err: any) {
      setError(err);
      setStatus('error');
    }
    setStatus('done');
  };

  return {
    account,
    error,
    isError: status === 'error',
    status,
    createAccount
  }
}

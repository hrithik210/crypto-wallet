import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useWallet } from "@/app/context/WalletContext";

export const EthWallet = () => {
  const { mnemonic, setMnemonic, setNetwork } = useWallet();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  // Handle adding an ETH wallet
  const addEthWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic); 
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);``
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    setCurrentIndex(currentIndex + 1);
    setAddresses((prevAddresses) => [...prevAddresses, wallet.address]); // Update the addresses list
  };

  return (
    <div>
      <button onClick={addEthWallet}>Add ETH wallet</button>

      {addresses.map((address, index) => (
        <div key={index}>Eth - {address}</div>
      ))}
    </div>
  );
};

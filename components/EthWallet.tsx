import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useWallet } from "@/app/context/WalletContext";
import { Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/Button";

const EthWallet = () => {
  const { mnemonic } = useWallet();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [showPrivateKey, setShowPrivateKey] = useState<boolean[]>([]);

  const addEthWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    setCurrentIndex(currentIndex + 1);
    setAddresses((prevAddresses) => [...prevAddresses, wallet.address]);
    setShowPrivateKey((prev) => [...prev, false]);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleTogglePrivateKey = (index: number) => {
    setShowPrivateKey((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-300 shadow-lg rounded-lg sm:p-8">
      <Button
        onClick={addEthWallet}
        className="bg-[#007AFF] text-white hover:bg-[#0056B3] mb-6 w-full sm:w-auto"
      >
        Add ETH Wallet
      </Button>
      {addresses.map((address, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row bg-gray-800 shadow-md rounded-md mb-4 p-4 justify-between items-center"
        >
          <div className="mb-4 sm:mb-0 sm:mr-4">
            <p className="text-[#c4cdd7] font-medium">ETH Address {index + 1}: {address}</p>
            <div className="sm:flex items-center">
              <p className="text-[#c0cad4] font-medium text-sm sm:text-base break-all">Private Key {index + 1}:</p>
              <div className="bg-gray-800 py-1 px-2 rounded-md flex items-center">
                {showPrivateKey[index] ? (
                  <p className="text-gray-400 font-medium truncate">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </p>
                ) : (
                  <p className="text-gray-400 font-medium">********************</p>
                )}
                <button
                  onClick={() => handleCopy(address)}
                  className="bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors ml-2"
                >
                  <Copy className="w-5 h-5 text-[#007AFF]" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopy(address)}
              className="bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
            >
              <Copy className="w-5 h-5 text-[#007AFF]" />
            </button>
            <button
              onClick={() => handleTogglePrivateKey(index)}
              className="bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
            >
              {showPrivateKey[index] ? (
                <Eye className="w-5 h-5 text-[#007AFF]" />
              ) : (
                <EyeOff className="w-5 h-5 text-[#007AFF]" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EthWallet;
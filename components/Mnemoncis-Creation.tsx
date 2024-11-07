"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { generateMnemonic } from "bip39";
import { Button } from './ui/Button';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { useWallet } from '@/app/context/WalletContext';



const GenerateMnemonics = () => {
  const { mnemonic, setMnemonic } = useWallet();
  const [isChecked, setIsChecked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonic);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    toast.success("Copied to clipboard");
  };

  const handleCheckboxChange = useCallback((e: any) => {
    setIsChecked(e.target.checked);
  }, []);

  const handleGenerateMnemonic = async () => {
    const generatedMnemonic = generateMnemonic();
    setMnemonic(generatedMnemonic); 
  };

  useEffect(() => {
    handleGenerateMnemonic();
  }, []);

  return (
    <div className='flex flex-col justify-center min-h-screen text-center items-center p-4'>
      <h2 className='text-white font-semibold text-4xl mt-4'>Secret Recovery Phrase</h2>
      <p className="text-gray-300 mt-4">Save these words somewhere safe, or you're cooked!</p>
      
      <div className='flex flex-col justify-center items-center bg-zinc-800 rounded-lg p-6 max-w-screen-md mt-10 w-full' onClick={handleCopy}>
        <div className='text-center text-lg'>
          <div className="space-y-2">
            {mnemonic.split(" ").map((word, index) => (
              <div key={index} className="flex justify-center space-x-1 px-5">
                <span className="text-white">{index + 1}.</span>
                <span className="font-semibold text-white">{word}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-4'>
          <p className='text-gray-300 text-center gap-2'>
            Click anywhere on this card to copy
          </p>
          <Copy />
        </div>
      </div>

      <span className='p-2 text-white text-lg'>
        <input type="checkbox" className='rounded-lg p-2' onClick={handleCheckboxChange} />
        I have saved my recovery phrase
      </span>
      
      <div className='mt-5 space-y-2 space-x-3'>
        <Button className='bg-white text-black hover:bg-gray-500 px-5' disabled={!isChecked}>
          Create Wallet
        </Button>
      </div>
    </div>
  );
}

export default GenerateMnemonics;
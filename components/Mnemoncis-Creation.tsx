"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { generateMnemonic } from "bip39";
import { Button } from './ui/Button';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

interface GenerateMnemonicsProps {
  confirmed: boolean;
  setConfirmed: (value: boolean) => void;
}

const GenerateMnemonics = () => {
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [isChecked , setIsChecked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);


  const handleCopy = () =>{
    navigator.clipboard.writeText(mnemonic.join(" "));
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    toast.success("Copied to clipboard");
  }


  const handleCheckboxChange = useCallback((e : any) => {
    setIsChecked(e.target.checked);
  }, []);


  const handleGenerateMnemonic = async() => {
    const generatedmnemonics = generateMnemonic();
    setMnemonic(generatedmnemonics.split(" "));
  }

  useEffect(() => {
    handleGenerateMnemonic();
  }, []);
 

  return (
    <div className='flex flex-col justify-center min-h-screen  text-center items-center p-4'>
      <h2 className='text-white font-semibold text-4xl mt-4'>Secret Recovery phase</h2>
      <p className="text-gray-300 mt-4 ">Save this words somewhere or you are cooked!</p>
      
      <div className='bg-zinc-800 rounded-lg p-6 max-w-screen-md mt-10 w-full '
          onClick={handleCopy}>
        <div className='grid grid-cols-3 gap-5 space-x-4 text-center text-lg'>
          {mnemonic.map((word, index) => (
              <div key={index} className="flex items-center justify-center space-x-1 px-5">
                <span className="text-white">{index + 1}.</span>
                <span className="font-semibold text-white ">{word}</span>
              </div>
            ))}
        </div>
        <div>
          <span className='flex justify-between items-center text-center'>
            <p className='text-gray-300 mt-5 border-t border-gray-600 text-center gap-2'>
              Click anywhere on this card to copy
            </p>
            <Copy/>
          </span>
         
        </div>
       
      </div>

      <span className='p-2 text-white text-lg'>
        <input type="checkbox"  className='rounded-lg p-2'
        onClick={handleCheckboxChange}/>
        I have saved my recovery phase
      </span>
      
      <div className='mt-5 space-y-2 space-x-3'>
       <Button className='bg-white text-black hover:bg-gray-500 px-5'
       disabled={!isChecked}>Create Wallet
        </Button> 

        
      </div>

    
    </div>
  )
}

export default GenerateMnemonics;
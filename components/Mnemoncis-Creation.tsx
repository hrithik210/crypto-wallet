"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { generateMnemonic } from "bip39";
import { Button } from './ui/Button';
import { toast } from 'sonner';
import { Copy, ClipboardCheck } from 'lucide-react';
import { useWallet } from '@/app/context/WalletContext';

interface GenerateMnemonicsProps {
  onCreateWallet: () => void;
}

const GenerateMnemonics = ({ onCreateWallet }: GenerateMnemonicsProps) => {
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

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  }, []);

  const handleGenerateMnemonic = async () => {
    const generatedMnemonic = generateMnemonic();
    setMnemonic(generatedMnemonic);
  };

  const handleCreateWallet = () => {
    if (isChecked) {
      onCreateWallet();
    }
  };

  useEffect(() => {
    handleGenerateMnemonic();
  }, []);

  return (
    <div className='flex flex-col justify-center min-h-screen text-center items-center p-4 max-w-4xl mx-auto bottom-0 '>
      <h2 className='text-white font-semibold text-4xl mb-4'>Secret Recovery Phrase</h2>
      <p className="text-gray-300 mb-8">Save these words somewhere safe, or you're cooked!</p>
      
      <div className='bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 w-full shadow-2xl border border-zinc-800/50'>
        <div className='grid grid-cols-3 gap-4 mb-6'>
          {mnemonic.split(" ").map((word, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-sm group-hover:bg-purple-500/30 transition-all duration-300"></div>
              <div className="relative bg-zinc-800 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between border border-zinc-700/50">
                <span className="text-gray-400 text-sm">{index + 1}.</span>
                <span className="font-medium text-white">{word}</span>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleCopy}
          className="group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-300 border border-zinc-700/50"
        >
          <span className="text-gray-300 group-hover:text-white transition-colors">
            {isCopied ? "Copied!" : "Click to copy recovery phrase"}
          </span>
          {isCopied ? (
            <ClipboardCheck className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
          )}
        </button>
      </div>

      <label className='flex items-center gap-3 py-6 text-white text-lg cursor-pointer mt-6 select-none'>
        <div className="relative">
          <input 
            type="checkbox"
            className='w-5 h-5 rounded border-2 border-purple-500 bg-transparent checked:bg-purple-500 appearance-none cursor-pointer transition-all duration-300'
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 check-icon">
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <span className="text-gray-200">I have saved my recovery phrase</span>
      </label>
      
      <Button 
        className={`px-8 py-2 mt-2 rounded-lg font-medium transition-all duration-300 ${
          isChecked 
            ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-purple-500/25' 
            : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
        }`}
        disabled={!isChecked}
        onClick={handleCreateWallet}
      >
        Create Wallet
      </Button>

      <style jsx>{`
        .check-icon {
          transition: opacity 0.3s ease;
        }
        input:checked ~ .check-icon {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default GenerateMnemonics;
'use client'

import React, { useState } from "react"
import { mnemonicToSeed } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { Keypair } from "@solana/web3.js"
import nacl from "tweetnacl"
import { Copy, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Button } from "./ui/Button"

export default function Component({ mnemonic = "your mnemonic phrase here" }: { mnemonic?: string }) {
  const [publicKeys, setPublicKeys] = useState<string[]>([])
  const [privateKeys, setPrivateKeys] = useState<string[]>([])
  const [showPrivateKey, setShowPrivateKey] = useState<boolean[]>([])

  const handleGenerateKey = () => {
    const seed = mnemonicToSeed(mnemonic)
    const path = `m/44'/501'/0'/0'`
    const derivedSeed = derivePath(path, seed.toString()).key
    const keypair = Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
    const publicKey = keypair.publicKey.toBase58()
    const privateKey = Buffer.from(keypair.secretKey).toString("hex")

    setPublicKeys((prev) => [...prev, publicKey])
    setPrivateKeys((prev) => [...prev, privateKey])
    setShowPrivateKey((prev) => [...prev, false])
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const handleTogglePrivateKey = (index: number) => {
    setShowPrivateKey((prev) => {
      const updated = [...prev]
      updated[index] = !updated[index]
      return updated
    })
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg sm:p-6">
      <Button
        onClick={handleGenerateKey}
        className="bg-[#007AFF] text-white hover:bg-[#0056B3] mb-6 w-full sm:w-auto"
      >
        Generate Solana Keys
      </Button>
      {publicKeys.map((publicKey, index) => (
        <div key={index} className="bg-[#EBF8FF] shadow-md rounded-md mb-4 p-4">
          <div className="mb-2">
            <p className="text-[#007AFF] font-medium text-sm sm:text-base break-all">
              Public Key {index + 1}: {publicKey}
            </p>
          </div>
          <div className="mb-2">
            <p className="text-[#333333] font-medium text-sm sm:text-base">Private Key {index + 1}:</p>
            <div className="bg-[#EBF8FF] py-1 px-2 rounded-md flex items-center justify-between mt-1">
              <p
                className={`text-[#333333] font-medium text-sm sm:text-base ${
                  showPrivateKey[index] ? "break-all" : "truncate"
                }`}
              >
                {showPrivateKey[index] ? privateKeys[index] : "********************"}
              </p>
              <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                <button
                  onClick={() => handleCopy(privateKeys[index])}
                  className="bg-[#EBF8FF] rounded-full p-1 hover:bg-[#D4F6FF] transition-colors"
                >
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-[#007AFF]" />
                </button>
                <button
                  onClick={() => handleTogglePrivateKey(index)}
                  className="bg-[#EBF8FF] rounded-full p-1 hover:bg-[#D4F6FF] transition-colors"
                >
                  {showPrivateKey[index] ? (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#007AFF]" />
                  ) : (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-[#007AFF]" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => handleCopy(publicKey)}
              className="bg-[#EBF8FF] rounded-full p-1 hover:bg-[#D4F6FF] transition-colors"
            >
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-[#007AFF]" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
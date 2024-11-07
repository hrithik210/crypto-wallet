// components/SolanaWallet.tsx
import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

  const handleGenerateKey = () => {
    const seed = mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/0'/0'`;
    const derivedSeed = derivePath(path, seed.toString()).key;
    const keypair = Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey);
    setPublicKeys((prev) => [...prev, keypair.publicKey.toBase58()]);
  };

  return (
    <div>
      <button onClick={handleGenerateKey}>Generate Solana Keys</button>
      {publicKeys.map((key, index) => (
        <div key={index}>
          <p>Public Key {index + 1}: {key}</p>
        </div>
      ))}
    </div>
  );
}

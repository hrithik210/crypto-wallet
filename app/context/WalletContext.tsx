"use client";

import React, { createContext, useContext, useState } from "react";

interface WalletContextProps {
  mnemonic: string;
  setMnemonic: React.Dispatch<React.SetStateAction<string>>;
  network: string | null;
  setNetwork: React.Dispatch<React.SetStateAction<string | null>>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [network, setNetwork] = useState<string | null>(null);

  return (
    <WalletContext.Provider value={{ mnemonic, setMnemonic, network, setNetwork }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

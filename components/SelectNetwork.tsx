// app/select-network.tsx
import { useWallet } from "@/app/context/WalletContext";
import GenerateMnemonics from "./Mnemoncis-Creation";

interface SelectNetworkProps {
  handleSelectNetwork: () => void;
}

export default function SelectNetwork({
  handleSelectNetwork
}: SelectNetworkProps) {
  const { setNetwork } = useWallet();

  const handleNetwork = (network: string) => {
    setNetwork(network);
  };


  return (
    <div onClick={handleSelectNetwork}>
      <button onClick={() => handleNetwork("Solana")}>Solana</button>
      <button onClick={() => handleNetwork("Ethereum")}>Ethereum</button>
    </div>
  );
}

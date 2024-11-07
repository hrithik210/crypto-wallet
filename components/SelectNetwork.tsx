import { useWallet } from "@/app/context/WalletContext";

interface SelectNetworkProps {
  handleSelectNetwork: () => void;
}

export default function SelectNetwork({
  handleSelectNetwork,
}: SelectNetworkProps) {
  const { setNetwork } = useWallet();

  const handleNetwork = (network: string) => {
    setNetwork(network);
    handleSelectNetwork();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold mb-4">Select Blockchain Network</h2>
      <div className="flex space-x-4">
        <button
          className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          onClick={() => handleNetwork("Solana")}
        >
          Solana
        </button>
        <button
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          onClick={() => handleNetwork("Ethereum")}
        >
          Ethereum
        </button>
      </div>
    </div>
  );
}
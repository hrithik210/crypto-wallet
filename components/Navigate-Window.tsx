"use client";

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/Button"
import { useState } from "react"
import StartingComponent from "./Starting-Component"
import GenerateMnemonics from "./Mnemoncis-Creation";
import SelectNetwork from "./SelectNetwork";
import { useWallet } from "@/app/context/WalletContext";
import { EthWallet } from "./EthWallet";
import SolanaWallet from "./SolanaWallet";

const WarningStep = () => (
  <div className="space-y-4 text-center mb-5">
    <h2 className="text-2xl font-bold">Important Warning</h2>
    <p className="text-muted-foreground">Please read this carefully before proceeding.</p>
    <ul className="text-left list-disc list-inside">
      <li>Never share your recovery phrase with anyone</li>
      <li>Store it in a secure location</li>
      <li>We will never ask for your recovery phrase</li>
    </ul>
  </div>
)

const NavigateWindow = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const { mnemonic, network } = useWallet();

  const handleSelectNetwork = () => {
    setCurrentStep(3);
  }

  const handleCreateWallet = () => {
    setCurrentStep(4);
  }

  const steps = [
    { title: "Home", component: <StartingComponent /> },
    { title: "Warning", component: <WarningStep /> },
    { title: "Select Network", component: <SelectNetwork handleSelectNetwork={handleSelectNetwork}/> },
    { title: "Secret Recovery Phrase", component: <GenerateMnemonics onCreateWallet={handleCreateWallet} /> },
    { title: "Show Wallet", component: network === "Solana" ? <SolanaWallet mnemonic={mnemonic} /> : <EthWallet /> }
  ]

  const canGoNext = currentStep < steps.length - 1 && currentStep !== 2 && currentStep !== 3;

  return (
    <div className="flex justify-center flex-col h-screen items-center text-white p-6">
      {steps[currentStep].component}
      <div className="flex justify-center items-center mt-6">
        <Button
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2 mx-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        {canGoNext && (
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default NavigateWindow
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/Button"
import { useState } from "react"
import StartingComponent from "./Starting-Component"
import GenerateMnemonics from "./Mnemoncis-Creation";
import SelectNetwork from "./SelectNetwork";

// Step-specific components
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



const VerifyStep = () => (
  <div className="space-y-4 text-center">
    <h2 className="text-2xl font-bold">Verify Recovery Phrase</h2>
    <p className="text-muted-foreground">Please verify your recovery phrase.</p>
    {/* Add verification input fields here */}
  </div>
)
const NavigateWindow = () => {
  const [currentStep, setCurrentStep] = useState(0)


  const steps = [
    { title: "Home", component: <StartingComponent /> },
    { title: "Warning", component: <WarningStep /> },
    {title : "Select Network", component: <SelectNetwork />},
    { title: "Secret Recovery Phrase", component: <GenerateMnemonics /> },
    { title: "Verify", component: <VerifyStep /> },
  ]

  return (
    <div className="flex justify-center flex-col h-screen items-center text-white p-6 ">
      
        {steps[currentStep].component}
        <div className="flex justify-center items-center">
          <Button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <Button
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    </div>
  )
}

export default NavigateWindow
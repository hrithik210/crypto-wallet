import React from "react";
import { Button } from "./ui/Button";

interface StartingComponentProps {
  onClick: () => void;
}

const StartingComponent = ({ onClick }: StartingComponentProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-white font-bold text-3xl">
        Yokkoso Welcome to my Wallet
      </h1>
      <h1>Lets get Started</h1>

      <div className="mt-5 space-y-2 space-x-3">
        <Button
          className="bg-white text-black hover:bg-gray-500"
          onClick={onClick}
        >
          Create Wallet
        </Button>
      </div>
    </div>
  );
};

export default StartingComponent;

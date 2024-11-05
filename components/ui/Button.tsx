"use client";

import React from 'react'

interface buttonProps {
    label? :string;
    onClick ? : () => void;
    disabled ? : boolean;
}

const Button = ({
  label,
  onClick,
  disabled
}: buttonProps) => {
  return (
    <div>
      <button type="button" 
              onClick={onClick}
              disabled={disabled}
                className={`bg-white border border-gray-300 focus:outline-none
                          focus:ring-4 focus:ring-gray-100 font-medium rounded-full 
                          text-sm px-5 py-2.5 me-2 mb-2 ${disabled ? 'cursor-not-allowed bg-gray-500': "cursor-pointer"}`}>
        {label}
        
        </button>
    </div>
  )
}

export default Button
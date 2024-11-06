"use client";

import React from 'react'
import { Button } from './ui/Button';

const SelectNetwork = () => {
  return (
    <div className='flex flex-col text-center items-center mx-auto mb-5'>
      <h1 className='text-3xl font-semibold mb-5 z-10'>Select your BlockChain</h1>
      <div className='flex gap-2'>
        <Button className='bg-white text-black text-xl  hover:bg-gray-200 '>Solana</Button>
        <Button className='bg-white text-black text-xl hover:bg-gray-200'>Etherium</Button>
      </div>
     
    </div>
  )
}

export default SelectNetwork
import React from 'react'
import { Button } from './ui/Button'

const StartingComponent = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-white font-bold text-3xl'>Yokkoso Welcome to the Wallet</h1>
      <h1>Lets get Started</h1>

      <div className='mt-5 space-y-2 space-x-3'>
       <Button className='bg-white text-black hover:bg-gray-500'>Create Wallet
        </Button> 

       <Button className='bg-white text-black hover:bg-gray-500'>Import Wallet</Button>

        
      </div>
    </div>
  )
}

export default StartingComponent
import React from 'react'

const Footer = () => {
  return (
    <footer className='text-white flex flex-col items-center py-4 bg-transparent w-full fixed bottom-0 left-0'>
      <div className='flex items-center gap-2'>
        <span className='text-green-700 font-bold text-xl'>&lt;</span>
        <span className='font-bold text-white'>PassOp</span>
        <span className='text-green-700 font-bold text-xl'>/&gt;</span>
      </div>
      <p className='text-xs mt-1'>Created with <img src="/icons/heart.png" alt="heart" className='inline-block w-4 h-4' /> by Himanshu</p>
    </footer>
  )
}

export default Footer

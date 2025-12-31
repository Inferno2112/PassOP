import React from 'react'

const Navbar = () => {
    return (
        <div className='flex justify-between bg-black mt-5 h-15 pt-3 text-2xl px-40 '>
            <div className=''>
                <span className='text-green-700 font-bold text-xl'>&lt;</span>
                <span className='font-bold text-white'>PassOp</span>
                <span className='text-green-700 font-bold text-xl'>/&gt;</span>
            </div>
            <img className='w-7 h-7' src="/icons/github.png " alt="github" />

        </div>
    )
}

export default Navbar

import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Header = () => {
  return (

    <div className='py-8 px-5 w-[97%] flex items-center justify-end top-6 left-5 right-5 fixed z-10 '>
       <div>
         <button className='bg-black border-4 border-blue-200 hover:bg-gray-500 px-4 py-1 cursor-pointer rounded-2xl text-white text-lg'>
            Hire Me
        </button>
        <i className="ri-more-2-fill text-2xl "></i>
       </div>
    </div>
  )
}

export default Header
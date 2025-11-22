import React from 'react'
import TiltText from '../components/TiltText'
import Page1Bottom from '../components/Page1Bottom'

const Page1 = () => {
  return (
    <div className='h-screen p-6 bg-white'>

        <div className=' py-8 px-10 h-full overflow-hidden shadow-xl bg-no-repeat bg-cover bg-center bg-[url("./src/assets/main_image.png")] shadow-gray-500 rounded-2xl w-full'>

            <img  className='h-20 cursor-pointer' src="/src/assets/logo.png" alt="" />
            <TiltText/>
            <Page1Bottom/>
        </div>
    </div>
  )
}

export default Page1
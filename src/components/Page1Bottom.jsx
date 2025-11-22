import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

const Page1Bottom = () => {

    useGSAP(()=>{
        gsap.to("#round",{
            rotate:360,
            duration:5,
            repeat:-1,
            ease:"linear"
        })
    })

  return (
    <div className='absolute bottom-0 left-0 px-15 pb-10 flex items-end justify-between w-full'>
        <div className='border p-2  rounded-2xl bg-black '>
            <h2 className='text-2xl text-white font-[u8] uppercase'>Brand Design | Website Design,</h2>
            <h3 className='text-2xl text-white font-[u7]  uppercase'>Freelance</h3>
        </div>
        <div>
            <img id='round' className='mb-10' src="/src/assets/Images/circle1.avif" alt="" />
            <img id='round' src="/src/assets/Images/circle2.avif" alt="" />
        </div>
    </div>
  )
}

export default Page1Bottom
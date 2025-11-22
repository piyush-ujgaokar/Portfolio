import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React from 'react'

const Page2 = () => {

    gsap.registerPlugin(ScrollTrigger)

    useGSAP(()=>{
        gsap.from(".rotateText",{
            transform:'rotateX(-80deg)',
            duration:1,
            opacity:0,
            stagger:0.2,
            scrollTrigger:{
                trigger:'.rotateText',
                markers:true,
                start:"top 50%",
                end:"top -70%",
                scrub:1,
            }
        })
    })


  return (
    <div id='section2' className='mt-30'>
      <div className='rotateText'>
          <h1 className='text-[30vw] uppercase font-[font3] text-center leading-[25vw]'>Not Your</h1>
      </div>
      <div className='rotateText'>
          <h1 className='text-[30vw] uppercase font-[font3] text-center leading-[25vw]'>Boring</h1>
      </div>
      <div className='rotateText'>
          <h1 className='text-[30vw] uppercase font-[font3] text-center leading-[25vw]'>Developer</h1>
      </div>
    
    </div>
  )
}

export default Page2
import React, { useRef, useState } from 'react'
import Page1Bottom from '../components/Page1Bottom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import TiltText from '../assets/fonts/TiltText'

const Page1 = () => {

    const tiltRef=useRef(null)
    const [xVal, setXVal] = useState(0)
    const [yVal, setYVal] = useState(0)

    const mouseMoving=(e)=>{
     setXVal((e.clientX-tiltRef.current.getBoundingClientRect().x- tiltRef.current.getBoundingClientRect().width/2)/30);
     setYVal(-(e.clientY-tiltRef.current.getBoundingClientRect().y- tiltRef.current.getBoundingClientRect().height/2)/10);
    // setXVal(e.clientX/60)
    // setYVal(e.clientY/60)
    
     
        
    }

    useGSAP(()=>{
        gsap.to(tiltRef.current,{
            transform:`rotateX(${yVal}deg) rotateY(${xVal}deg)`,
            duration:1,
            ease:'power4.out'
        })
    },[xVal,yVal])

  return (
    <div onMouseMove={(e)=>{
        mouseMoving(e)
    }} className='h-screen p-6 bg-white'>

        <div id='page1-in' className='relative py-8 px-10 h-full overflow-hidden shadow-xl bg-no-repeat bg-cover bg-center bg-[url("./src/assets/images/main_image.png")] shadow-gray-500 rounded-2xl w-full'>

            <img  className='h-15 cursor-pointer' src="/src/assets/images/logo.png" alt="" />
            <TiltText abc={tiltRef}/>
            <Page1Bottom/>
        </div>
    </div>
  )
}

export default Page1
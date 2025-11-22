import React from 'react'

const TiltText = (props) => {
  return (
        <div ref={props.abc} id='tiltDiv' className='mt-40 relative'> 
            <h1 className='text-gray-600 leading-[3.5vw] uppercase  text-[4.5vw] font-[u8]'>I Am <span className='text-black'>Piyush Uj</span>™</h1>
            <h1 className='text-[7vw] leading-[5.5vw] text-gray-600 uppercase font-[u8]'>Developer</h1>
            <h1 className='text-[5vw] leading-[4vw] uppercase text-black font-[u8]'>To Hire</h1>
        </div>
  )
}

export default TiltText
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFount404 = () => {



let useHomeRediract = useNavigate()


let backTohome = ()=>{
    useHomeRediract("/")
}

setTimeout(()=>{
   backTohome() 
},3000)




  return (
    <div>
        <h1 className=' text-2xl md:text-6xl text-center pt-5 md:py-10 notFount404'>Not Fount 404</h1>
        <div className="">
             <DotLottieReact
      src="https://lottie.host/00cf3a4c-50b8-4d0f-b56d-576c2ce1d8f3/fjqFhGaFsq.lottie"
      className='md:w-1/2 m-auto'
      loop
      autoplay
    />
        </div>
    </div>
  )
}

export default NotFount404
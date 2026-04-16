import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useLang } from '../context/LangContext';

const NotFount404 = () => {
  const { t } = useLang();
  let useHomeRediract = useNavigate()

  let backTohome = () => {
    useHomeRediract("/")
  }
  setTimeout(() => { backTohome() }, 5000)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-5 font-sans">
      <h1 className='text-2xl md:text-4xl font-black text-[rgb(7,81,89)] mb-2'>{t('pageNotFound')}</h1>
      <p className="text-slate-500 mb-6 font-medium">{t('pageNotFoundSub')}</p>
      <div className="">
        <DotLottieReact
          src="https://lottie.host/00cf3a4c-50b8-4d0f-b56d-576c2ce1d8f3/fjqFhGaFsq.lottie"
          className='md:w-1/2 m-auto'
          loop
          autoplay
        />
      </div>
      <Link to="/" className="mt-4 bg-[rgb(7,81,89)] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-500 transition-colors">
        {t('goHome')}
      </Link>
    </div>
  )
}

export default NotFount404
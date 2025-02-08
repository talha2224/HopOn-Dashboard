import React from 'react'
import HeroImage from '../../assets/landing/hero.png'
import PlayIcon from '../../assets/landing/learn-more.svg'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='mt-10 flex justify-center lg:justify-between items-center lg:flex-nowrap flex-wrap relative lg:h-[80vh] lg:mt-[-2rem] lg:mb-[2rem]'>


      <div className='lg:max-w-[50%] max-w-[100%]'>
        <h1 className='text-[1.6rem] lg:text-[3rem] font-bold w-fit text-[#0F172A] sm:block hidden'>Boost your business <br /> growth with AI-powered <br /> call automation.</h1>
        <h1 className='text-[1.6rem] lg:text-[2rem] font-bold w-fit text-[#0F172A] sm:hidden block'>Engaging Customers Anytime with AI-Powered Calling</h1>
        <p className='mt-4 text-base w-[100%] text-[#0F172A] leading-7'>Revolutionize customer connections with our AI-powered call automation platform. Engage leads, handle inquiries, and schedule appointments effortlessly—all in real-time. Streamline communication while your team focuses on growth.</p>

        <div className='flex items-center gap-x-5 mt-4'>
          <Link to={"/register"}><button className='bg-[#FF6600] rounded-md w-[8rem] h-[2.5rem] text-[#fff] text-sm'>Get Started</button></Link>
          <div className='flex items-center gap-x-3'>
            <img src={PlayIcon} alt="AI Cold Calling" className='h-[2.5rem] cursor-pointer' />
            <p className='font-medium'>Watch Demo</p>
          </div>
        </div>

      </div>


      <div className='lg:mt-0 mt-10 flex justify-center items-center'>
        <img src={HeroImage} loading="lazy" alt="HopOn Dashboard- Hero " className='sm:h-[50vh]' />
      </div>

      <h1 className="text-[20vw] lg:text-[10rem] text-white text-stroke-3 text-center mt-5 font-bold absolute right-0 bottom-[1rem] -z-10">Hop OnDashboard</h1>



    </div>
  )
}

export default Hero

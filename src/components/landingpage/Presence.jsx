import React from 'react'
import PresenceImage from '../../assets/landing/presence.svg'
import ConsultationImage from '../../assets/landing/consultation.svg'

const Presence = () => {
    return (

        <div className='mt-[4rem] lg:mt-[2rem] pb-10'>


            <div className='flex justify-between items-center w-[100%] flex-wrap'>
                <div className='lg:order-1 order-2 lg:mt-0 mt-5 lg:block flex justify-center items-center lg:w-fit w-[100%]'>
                    <img src={PresenceImage} alt="HopOn Dashboard- Presence" className='h-[18rem]' />
                </div>
                <div className='w-[100%] lg:w-[50%] flex items-start flex-col lg:order-2 order-1'>
                    <h1 className='text-[1.6rem] font-medium'>Enhance Customer Engagement with Our <br /> AI-Powered Calling Assistant.</h1>
                    <p className='mt-3 text-sm max-w-[100%] text-start'>On a mission to empower comapnies with AI-driven calling solutions, helping them scale with exceptional customer engagement, lead generation and performance.</p>
                    <p className='mt-3 font-semibold text-sm'>Trusted by hundreds of clients </p>
                    <button className='bg-[#FF6600] rounded-md w-[8rem] h-[2.5rem] text-[#fff] text-sm mt-4'>Contact Us</button>
                </div>
            </div>


            <div className='flex items-center justify-center mt-[2rem] lg:mt-[8rem]'>
                <img src={ConsultationImage} alt="HopOn Dashboard- Consultation" className='lg:h-[20rem]' />
            </div>


        </div>
    )
}

export default Presence
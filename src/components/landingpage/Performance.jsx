import React from 'react'
import { FaGraduationCap, FaHeadset, FaHome, FaHospital, FaMoneyBillWave, FaShoppingCart, FaUserTie } from 'react-icons/fa';
import DemoImage from '../../assets/landing/demo.svg'

const Performance = () => {

    const industries = [
        {
            name: "Lead Generation",
            icon: <FaHeadset className='text-[#FF6600]' />,
            description: "Streamline lead qualification and conversions with automated AI-driven calls."
        },
        {
            name: "Customer Support",
            icon: <FaUserTie className='text-[#FF6600]' />,
            description: "Enhance customer satisfaction with 24/7 AI-powered support calls."
        },
        {
            name: "Sales",
            icon: <FaHeadset className='text-[#FF6600]' />,
            description: "Close deals faster with intelligent, automated sales calls."
        },
        {
            name: "Real Estate",
            icon: <FaHome className='text-[#FF6600]' />,
            description: "Engage prospects and schedule property viewings effortlessly."
        },
        {
            name: "Healthcare",
            icon: <FaHospital className='text-[#FF6600]' />,
            description: "Automate appointment scheduling and patient follow-ups seamlessly."
        },
        {
            name: "Education",
            icon: <FaGraduationCap className='text-[#FF6600]' />,
            description: "Efficiently connect with students and parents for inquiries and updates."
        },
        {
            name: "E-commerce",
            icon: <FaShoppingCart className='text-[#FF6600]' />,
            description: "Boost sales and handle customer queries with AI-powered calls."
        },
        {
            name: "Financial Services",
            icon: <FaMoneyBillWave className='text-[#FF6600]' />,
            description: "Provide quick assistance for account management and financial queries."
        }
    ];

    return (
        <div className='mt-[5rem] flex justify-center items-center flex-col pb-10'>

            <div className='flex justify-center items-center flex-col flex-1'>
                <h1 className='text-[1.3rem] lg:text-[1.6rem] font-semibold'>Our Performance solutions will keep you ahead of the competition</h1>
                <p className='text-[#454545] w-[100%] lg:w-[50%] lg:text-center text-sm mt-4'>The industries in which we bring expertise in</p>
            </div>

            <div className='max-w-[95vw] overflow-x-auto h-[3rem] bg-[#F4F4F4] mt-6 flex justify-between items-center gap-x-3 p-5 overflow-y-hidden'>
                {
                    industries.map((i) => (

                        <div key={i.description} className='flex items-center gap-x-4'>
                            {i.icon}
                            <p className=' text-nowrap'>{i.name}</p>
                        </div>
                    ))
                }
            </div>


            <div className='w-[100%] mt-[2rem] lg:mt-[8rem] flex justify-center items-center'>
                <img src={DemoImage} alt="HopOn Dashboard- Demo" className='cursor-pointer'/>
            </div>




        </div>
    )
}

export default Performance
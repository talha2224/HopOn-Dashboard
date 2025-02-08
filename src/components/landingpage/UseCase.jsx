import React from 'react'
import StatsImage from '../../assets/landing/stats.svg'

const UseCase = () => {

    const stats = [
        {
            value: "$1M",
            label: "Revenue Generated",
        },
        {
            value: "500+",
            label: "Projects Completed",
        },
        {
            value: "230%",
            label: "Yearly Growth",
        },
        {
            value: "100+",
            label: "Trusted Brands",
        },
    ];

    return (
        <div className='mt-[2rem] lg:mt-[8rem] flex justify-between items-center flex-wrap'>

            <div className='lg:max-w-[50%] max-w-[100%]'>
                <h1 className='text-[1.3rem] lg:text-[1.6rem] font-medium'>Leverage the power of <br /> AI-driven call automation.</h1>
                <p className='mt-3 text-[#454545] w-[100%] lg:w-[100%]'>With 3000+ successful AI-driven calls and 100+ tailored automation strategies, we know what it takes to revolutionize your client interactions and scale your business effectively.</p>

                <div className='mt-5 flex items-center gap-x-3'>
                    {
                        stats.map((i)=>(
                            <div key={i.label} className='flex justify-center items-center flex-col border-r pr-4 border-[lightgray]'>
                                <h1 className='text-[1rem] lg:text-[1.6rem] font-semibold'>{i.value}</h1>
                                <p className='mt-2 text-xs lg:text-sm lg:text-start text-center'>{i.label}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='lg:block flex justify-center items-center lg:mt-0 mt-3'>
                <img src={StatsImage} alt="HopOn Dashboard- Stats" className='lg:min-h-[15rem] lg:min-w-[15rem] h-[20rem]' />
            </div>

        </div>
    )
}

export default UseCase
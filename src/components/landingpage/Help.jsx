import React from 'react'
import ChartIcon from '../../assets/landing/chart.svg'
import PeopleIcon from '../../assets/landing/people.svg'
import ShoppingCartIcon from '../../assets/landing/shoppingcart.svg'
import ArrowSquaretIcon from '../../assets/landing/arrowsquare.svg'


const Help = () => {

    const data = [{id:1,icon:ChartIcon,title:"Performance",description:"Get exponential growth with our marketing strategies.",other:"Learn More"},{id:2,icon:PeopleIcon,title:"Retention",description:"Let us help you retarget your customer base.",other:"Learn More"},{id:3,icon:ShoppingCartIcon,title:"Marketplaces",description:"Get more visibility, more customers, and more sales.",other:"Learn More"},{id:4,icon:ArrowSquaretIcon,title:"Other Services",description:"Besides marketing, we do a lot more.",other:"Learn More"}]

    return (
        <div className='mt-[5rem] flex justify-center items-center flex-col'>

            <div className='flex justify-center items-center flex-col'>
                <h1 className='text-[1.3rem] lg:text-[1.6rem] font-semibold'>We elevate your business growth</h1>
                <p className='text-[#454545] w-[100%] lg:w-[50%] text-start lg:text-center text-sm mt-4'>One stop for all your call automation needs. Revolutionize client communication with our AI-powered, result-driven solutions. Ready to transform the way you engage and close leads?</p>
                <button className='bg-[#FF6600] rounded-md w-[8rem] h-[2.5rem] text-[#fff] text-sm mt-4'>Get Quote</button>
            </div>


            <div className='flex items-center gap-x-[2rem] mb-3 mt-10 max-w-[95vw] overflow-x-auto'>

                {
                    data.map((i)=>(
                        <div key={i.id} className='min-w-[336px] min-h-[200px] border border-[lightgray] rounded-md p-4 mb-2'>
                            <img src={i.icon} alt="HopOn Dashboard- Icon" className='mb-4' />
                            <h1 className='font-semibold mb-2'>{i.title}</h1>
                            <p className='text-[#454545] mb-2 text-sm'>{i.description}</p>
                            <p className='text-[#FF6600] cursor-pointer'>{i.other}</p>
                        </div>
                    ))
                }

            </div>


        </div>
    )
}

export default Help
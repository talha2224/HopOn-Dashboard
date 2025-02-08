import React from 'react'
import { MdManageAccounts } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { ImOffice } from "react-icons/im";
import { SiGoogleanalytics } from "react-icons/si";
import { GrSchedules } from "react-icons/gr";
import { LiaLanguageSolid } from "react-icons/lia";
import { BiTask } from "react-icons/bi";
import { RiVoiceprintLine } from "react-icons/ri";
import { BsCurrencyDollar } from "react-icons/bs";
import { CgTranscript } from "react-icons/cg";
import { TbClock24 } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import { FaHubspot } from "react-icons/fa";


const Work = () => {

    const data = [
        { id: 1, icon: <BiSupport className='text-[2.5rem] text-[#FF6600]' />, title: "AI Cold Calling", description: "Automate your calls with AI-powered conversations tailored to your business.", other: "Learn More" },
        {id: 12,icon: <FaHubspot className='text-[2.5rem] text-[#FF6600]' />,title: "HubSpot Integration",description: "Seamlessly integrate with HubSpot CRM to manage and track leads effortlessly.",other: "Learn More"},
        { id: 2, icon: <MdManageAccounts className='text-[2.5rem] text-[#FF6600]' />, title: "Multi-User Management", description: "Easily add and manage multiple sub-users for different teams or departments.", other: "Learn More" },
        { id: 3, icon: <ImOffice className='text-[2rem] text-[#FF6600]' />, title: "Multiple Company Support", description: "Manage multiple companies with a single account, integrated with HubSpot CRM.", other: "Learn More" },
        { id: 4, icon: <SiGoogleanalytics className='text-[2.5rem] text-[#FF6600]' />, title: "Call Analytics", description: "Get detailed insights into call performance and reasons behind customer interactions.", other: "Learn More" },
        { id: 10, icon: <CgTranscript className='text-[2.5rem] text-[#FF6600]' />, title: "Customizable Transcripts", description: "Customize call transcripts to match your business needs and review key call details.", other: "Learn More" },
        { id: 5, icon: <GrSchedules className='text-[2.5rem] text-[#FF6600]' />, title: "Automated Call Scheduling", description: "Set up automated calls and schedule follow-ups based on your business needs.", other: "Learn More" },
        { id: 6, icon: <LiaLanguageSolid className='text-[2.5rem] text-[#FF6600]' />, title: "Multi-Language Support", description: "AI-powered calling in multiple languages to reach a broader audience.", other: "Learn More" },
        { id: 7, icon: <BiTask className='text-[2.5rem] text-[#FF6600]' />, title: "Task Management", description: "Assign tasks to sub-users, track performance, and stay organized.", other: "Learn More" },
        { id: 8, icon: <RiVoiceprintLine className='text-[2.5rem] text-[#FF6600]' />, title: "Customizable Voices", description: "Choose from different voice types and accents to suit your business tone.", other: "Learn More" },
        { id: 9, icon: <BsCurrencyDollar className='text-[2.5rem] text-[#FF6600]' />, title: "Affordable Pricing", description: "Get started for just $0.2 per minute with no hidden costs.", other: "Learn More" },
        { id: 11, icon: <TbClock24 className='text-[2.5rem] text-[#FF6600]' />, title: "24/7 Support", description: "We’re here to help you with responsive support anytime, anywhere.", other: "Learn More" },
    ];



    return (
        <div id='solution' className='mt-[5rem] flex justify-center items-center flex-col'>

            <div className='flex justify-center items-center flex-col'>
                <h1 className='text-[1.3rem] lg:text-[1.6rem] font-semibold'>What We Offer</h1>
                <h1 className='text-[#454545] w-[100%] lg:w-[50%] text-start lg:text-center text-sm mt-4'>HopOn Dashboardsimplifies your call automation with AI-driven solutions. Effortlessly engage with clients, qualify leads, and follow up—all automatically. Ready to revolutionize the way you connect and close deals?</h1>
                <button className='bg-[#FF6600] rounded-md w-[8rem] h-[2.5rem] text-[#fff] text-sm mt-4'>Signup Now</button>
            </div>


            <div className='flex items-center gap-x-[2rem] mb-3 mt-10 max-w-[95vw] overflow-x-auto lg:justify-center lg:flex-wrap flex-nowrap'>

                {
                    data.map((i) => (
                        <div key={i.id} className='min-w-[336px] max-w-[336px] min-h-[200px] border border-[lightgray] rounded-md p-4 mb-2'>
                            <span>{i.icon}</span>
                            <h1 className='font-semibold mb-2 mt-4'>{i.title}</h1>
                            <p className='text-[#454545] mb-2 text-sm'>{i.description}</p>
                            <p className='text-[#FF6600] cursor-pointer'>{i.other}</p>
                        </div>
                    ))
                }

            </div>


        </div>
    )
}

export default Work
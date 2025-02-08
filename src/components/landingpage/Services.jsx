import React from 'react'
import { MdLocalPhone } from "react-icons/md";
import { SiGoogleads } from "react-icons/si";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsMicrosoftTeams } from "react-icons/bs";

const servicesData = [
    {
        "id": 1,
        "title": "Cold Calling",
        "description": "AI-based cold calling support with call scheduling features.",
        "icon": MdLocalPhone,
        "bgColor": "#EFEAFF",
        "iconColor": "#4628A4"
    },
    {
        "id": 2,
        "title": "Lead Generation",
        "description": "Import or add leads from HubSpot, Excel, or manually.",
        "icon": SiGoogleads,
        "bgColor": "#ECFFDA",
        "iconColor": "#5FC300"
    },
    {
        "id": 3,
        "title": "Customer Support",
        "description": "AI-based inbound calling support.",
        "icon": RiCustomerService2Fill,
        "bgColor": "#DAE6FF",
        "iconColor": "#00329B"
    },
    {
        "id": 4,
        "title": "Team Management",
        "description": "Add members to your team for managing leads.",
        "icon": BsMicrosoftTeams,
        "bgColor": "#FFE5DA",
        "iconColor": "#BB3800"
    }
];

const Services = () => {
    return (
        <div className=''>
            <div className='flex justify-center items-center flex-col mt-[5rem] lg:mt-[0rem]'>
                <h1 className='text-[1.7rem] lg:text-[2rem] font-semibold'>AI Solutions For Your Business</h1>
                <h1 className='text-[#454545] w-[100%] lg:w-[50%] text-start lg:text-center text-base mt-4 leading-6 hidden'>HopOn Dashboardstreamlines call automation with AI-driven solutions for lead management, cold calling, inbound support, and team task coordination. Effortlessly engage clients, qualify leads, and follow up—all automatically. Transform how you connect, manage, and close deals today!</h1>
            </div>

            <div className='flex xl:justify-center items-center overflow-x-auto mt-5 md:mt-10 pb-10'>
                {servicesData.map((service) => (
                    <div key={service.id} className='shadow-navShadow p-4 rounded-md bg-white border mr-[2rem] max-w-[21rem] min-w-[21rem] mt-2 flex items-start gap-x-3'>
                        <div className={`min-w-[4rem] h-[4rem] rounded-md flex justify-center items-center`} style={{ backgroundColor: service.bgColor }}>
                            <service.icon className='text-[2rem]' style={{ color: service.iconColor }} />
                        </div>
                        <div>
                            <h1 className='text-lg font-semibold'>{service.title}</h1>
                            <p className='text-sm'>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services;

import React from 'react'
import StatsImage from '../../assets/landing/stats2.svg'
import TaskIcon from '../../assets/landing/task_alt.svg'


const Ideas = () => {

    const data = [
        {
            "title": "Enhanced Retention",
            "icon": TaskIcon
        },
        {
            "title": "Rise in Customer Value",
            "icon": TaskIcon
        },
        {
            "title": "Creating customer-centric brands",
            "icon": TaskIcon
        },
        {
            "title": "Escalation in Acquisition",
            "icon": TaskIcon
        },
        {
            "title": "Unique Solutions Approach",
            "icon": TaskIcon
        }
    ];

    return (
        <div className='mt-[2rem] flex justify-between items-center'>

            <div>
                <h1 className='text-[1.6rem] font-medium'>Make bright ideas happen.</h1>

                <div className='flex items-start flex-col'>
                    {
                        data.map((i) => (
                            <div key={i.title} className='flex justify-center items-center gap-x-3 '>
                                <img src={i.icon} alt="HopOn Dashboard- Icon" className='h-[1rem]' />
                                <p className='mt-2 text-sm'>{i.title}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <img src={StatsImage} alt="HopOn Dashboard- Stats" className='h-[25rem]' />
            </div>

        </div>
    )
}

export default Ideas
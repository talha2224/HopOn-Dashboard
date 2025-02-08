import React, { useEffect, useState } from 'react'
import config from '../../config';
import axios from 'axios';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import toast from 'react-hot-toast';

const Plan = () => {

    const [data, setData] = useState(null)
    const userId = localStorage.getItem("accountId");

    const fetchData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/account/single/${userId}`);
            setData(res.data?.data);
        }
        catch (error) { console.log(error); }
    };

    const handleUpgrade = async (price) => {
        if (data?.activePlan === price) {
            return
        }
        else {
            let loader = toast.loading("Changing Plan ....")
            try {
                let res = await axios.put(`${config.baseUrl}/account/plan/${userId}`, { activePlan: price })
                if (res?.data) {
                    fetchData()
                    toast.dismiss(loader)
                    toast.success(res?.data?.msg)
                }
            }
            catch (error) {
                toast.dismiss(loader)
                toast.error("Please contact support")
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (

        <div className='flex justify-between items-start flex-wrap mt-[1rem]'>

            <div className='p-5 bg-white shadow-navShadow flex-1 mr-10 mt-5 rounded-md'>
                <h1 className='text-lg'>Basic Plan</h1>
                <p className='text-[#a6b0cf] mt-1'>Ideal for individuals or startups</p>
                <div className='flex items-end mt-5'>
                    <h1 className='text-4xl font-bold'>$0.20</h1>
                    <p className='text-sm text-gray-500'>/min</p>
                </div>
                <button onClick={() => handleUpgrade(0.20)} className='mt-5 text-sm bg-[#FF6600] rounded-md text-white w-[100%] h-[2.5rem]'>{data?.activePlan == 0.20 ? "Currently Active" : "Activate"}</button>
                <div className="flex items-center gap-x-2 flex-wrap mt-5">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>3 free call minutes per month</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Basic call analytics</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Add 2 companies and 3 users</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>HubSpot integration</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <ImCross className="text-red-500 text-sm mx-2" />
                    <p>Custom number at $2 /month</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <ImCross className="text-red-500 text-sm mx-2" />
                    <p>AI transcript generation</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <ImCross className="text-red-500 text-sm mx-2" />
                    <p>Team management</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <ImCross className="text-red-500 text-sm mx-2" />
                    <p>Calendy integration</p>
                </div>

            </div>


            <div className='p-5 bg-white shadow-navShadow flex-1 mr-10 mt-5 rounded-md'>
                <h1 className='text-lg'>Pro Plan</h1>
                <p className='text-[#a6b0cf] mt-1'>Perfect for small businesses</p>
                <div className='flex items-end mt-5'>
                    <h1 className='text-4xl font-bold'>$0.23</h1>
                    <p className='text-sm text-gray-500'>/min</p>
                </div>
                <button onClick={() => handleUpgrade(0.23)} className='mt-5 text-sm bg-[#FF6600] rounded-md text-white w-[100%] h-[2.5rem]'>{data?.activePlan == 0.23 ? "Currently Active" : "Activate"}</button>

                {/* Included Features */}
                <div className="flex items-center gap-x-2 flex-wrap mt-5">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>5 free call minutes per month</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Advanced analytics</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Add up to 4 companies & users</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Customizable call transcripts</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>AI transcript generation</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>HubSpot integration</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Custom number at $2 / month</p>
                </div>

                {/* Excluded Features */}
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <ImCross className="text-red-500 text-sm mx-2" />
                    <p>Calendy integration</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <ImCross className="text-red-500 text-sm mx-2" />
                    <p>Advance Team management</p>
                </div>
            </div>

            <div className='p-5 bg-white shadow-navShadow flex-1 mr-10 mt-5 rounded-md'>
                <h1 className='text-lg'>Enterprise Plan</h1>
                <p className='text-[#a6b0cf] mt-1'>Designed for enterprises</p>
                <div className='flex items-end mt-5'>
                    <h1 className='text-4xl font-bold'>$0.25</h1>
                    <p className='text-sm text-gray-500'>/min</p>
                </div>
                <button onClick={() => handleUpgrade(0.25)} className='mt-5 text-sm bg-[#FF6600] rounded-md text-white w-[100%] h-[2.5rem]'>{data?.activePlan == 0.25 ? "Currently Active" : "Activate"}</button>

                <div className="flex items-center gap-x-2 flex-wrap mt-5">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>8 free call minutes per month</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Premium analytics with insights</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Unlimited companies and users</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>AI-driven custom workflows</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Fully customizable transcripts</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Dedicated account manager</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Custom number at $2 / month</p>
                </div>
                <div className="flex items-center gap-x-2 flex-wrap mt-1">
                    <TiTick className="text-[#FF6600] text-3xl" />
                    <p>Calendy integration</p>
                </div>
            </div>

        </div>
    )
}

export default Plan
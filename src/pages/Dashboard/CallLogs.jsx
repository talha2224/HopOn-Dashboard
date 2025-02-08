import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import config from '../../config';
import axios from 'axios';
import { formatReadableDate } from '../../helpers/function';
import Pagination from '../../components/dashboard/Pagination';

const CallLogs = () => {
    let thStyle = " py-2 px-4 text-left text-sm font-normal text-nowrap text-[#030229]"
    const [callData, setCallData] = useState([])
    const [paginatedData, setPaginatedData] = useState([]);
    const [modelData, setmodelData] = useState("")
    const [showModel, setShowModel] = useState("")
    const companyId = localStorage.getItem("companyId")
    const handleDataChange = (data) => {
        setPaginatedData(data);
    };
    const openModel = (data) => { setShowModel(!showModel); setmodelData(data) }
    const closeModel = () => { setShowModel(!showModel); setmodelData("") }

    const fetchData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/vapi/company/${companyId}`)
            setCallData(res.data?.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])




    return (

        <div>


            {/* HEADER  */}

            <div className='flex justify-start md:justify-end items-center gap-x-4 flex-wrap'>


                <div className='bg-[#fff] border rounded-md py-2 px-3 flex items-center justify-between w-fit sm:w-[16rem] mt-2 '>
                    <input type="text" placeholder='Search' className='w-[100%] sm:w-[12rem] rounded-md mr-3 outline-none border-none bg-transparent' />
                    <CiSearch />
                </div>


            </div>


            {/* TABLE */}

            {
                callData?.length > 0 ?
                    <div className="rounded-md min-w-[100%] flex-1 mt-6 overflow-x-auto">
                        <div className="overflow-x-auto w-full">
                            <table style={{ borderSpacing: "0 10px" }} className="min-w-[100%] border-separate ">
                                <thead className='bg-[#ececec] h-[3rem]'>
                                    <tr>
                                        <th className={thStyle}>Id</th>
                                        <th className={thStyle}>User Name</th>
                                        <th className={thStyle}>User Email</th>
                                        <th className={thStyle}>Phone Number</th>
                                        <th className={thStyle}>Call By</th>
                                        <th className={thStyle}>Attend Status</th>
                                        <th className={thStyle}>Transcript</th>
                                        <th className={thStyle}>Call Logs</th>
                                        <th className={thStyle}>Call Duration</th>
                                        <th className={thStyle}>Total Cost</th>
                                        <th className={thStyle}>Call Date</th>
                                        <th className={thStyle}>Lead Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData?.map((call, index) => (
                                        <tr style={{ borderRadius: "1rem" }} key={index} className="bg-white text-sm font-normal pb-4 h-[3rem]">
                                            <td className="py-2 px-4 text-sm text-nowrap">{index + 1}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{call?.contactId?.name ? call?.contactId?.name : "-"}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{call?.contactId?.email ? call?.contactId?.email : "-"}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{call?.contactId?.phone ? call?.contactId?.phone : "-"}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{call.userId?.username}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap"><button className={`px-4 py-1 text-white ${call?.status?.toLowerCase() == "pick" ? "bg-[#4285F4]" : "bg-red-500"} text-xs rounded-md`}>{call?.status}</button></td>
                                            <td className="py-2 px-4 text-sm text-nowrap"><button onClick={() => openModel(call?.callLogs)} className='bg-[#4285F4] text-xs text-white px-2 rounded-[0.3rem] text-nowrap h-[2rem]'>View</button></td>
                                            <td className="py-2 px-4 text-sm text-nowrap"><button onClick={() => openModel(call?.summary)} className='bg-[#4285F4] text-xs text-white px-2 rounded-[0.3rem] text-nowrap h-[2rem]'>View</button></td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{call?.duration?call?.duration?.toFixed(2) + " /min":"-"}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{call?.cost?"$ "+call?.cost:"-"}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{formatReadableDate(call?.createdAt)}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">
                                                <button className={`${call?.leadStatus?.toLowerCase()?.includes("converted")? "bg-[#4285F4]" : call?.leadStatus?.toLowerCase()?.includes("lost") ? "bg-red-500" : "bg-green-500"} text-xs text-white px-2 rounded-[0.3rem] text-nowrap py-1`}>{call?.leadStatus}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination data={callData} itemsPerPageOptions={[1,5, 10, 15, 20]}onDataChange={handleDataChange}/>

                    </div> :

                    <div className='h-[50vh] flex justify-center items-center'>
                        <h1 className='text-[#000] text-sm mt-4 text-center flex-1'>Oops ! No Calls Initiated</h1>
                    </div>

            }




            {

                showModel && (
                    <div className="fixed top-0 left-0 w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out" onClick={closeModel}>
                        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md transform scale-95 opacity-0 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-lg font-medium mb-4">Call Details</h2>

                            <div className="mb-4">
                                <label htmlFor="transcript" className="text-sm mb-2 block">Call Analysis</label>
                                <textarea id="transcript" name="transcript" value={modelData} placeholder="" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm min-h-[20rem]" />
                            </div>
                        </div>
                    </div>
                )
            }






        </div>

    )
}

export default CallLogs
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaFileExcel, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import config from '../../config';
import axios from 'axios';
import CreateContactPopup from '../../components/dashboard/popups/CreateContactPopup';
import UpdateContactPopup from '../../components/dashboard/popups/UpdateContactPopup';
import { formatReadableDate } from '../../helpers/function';
import toast from 'react-hot-toast';
import Pagination from '../../components/dashboard/Pagination';
import * as XLSX from 'xlsx';

let thStyle = " py-2 px-4 text-left text-sm font-normal text-nowrap text-[#030229]"

const Contacts = () => {
    const [createContactModel, setCreateContactModel] = useState(false)
    const [updateContactModel, setupdateContactModel] = useState(false)
    const [saveContactData, setSaveContactData] = useState({ contactId: "", name: "" })
    const [contactData, setContactData] = useState([])
    const [paginatedData, setPaginatedData] = useState([]);


    const fetchData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/wallet/all`)
            console.log(res.data?.data, 'res.data?.data')
            setContactData(res.data?.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    const deleteContact = async (contactId) => {
        let loader = toast.loading("Processing Request...");
        try {
            let res = await axios.delete(`${config.baseUrl}/contacts/delete/${contactId}`)
            console.log(res.data)
            if (res.data) {
                toast.dismiss(loader)
                toast.success(res?.data?.msg)
                fetchData()
            }
        }
        catch (error) {
            console.log(error)
            toast.dismiss(loader)
            toast.error("Something went wrong contact support")
        }
    }

    const handleDataChange = (data) => {
        setPaginatedData(data);
    };


    useEffect(() => {
        fetchData()
    }, [createContactModel, updateContactModel])

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
                contactData?.length > 0 ?
                    <div className="rounded-md min-w-[100%] flex-1 mt-6 overflow-x-auto">
                        <div className="overflow-x-auto w-full">
                            <table style={{ borderSpacing: "0 10px" }} className="min-w-[100%] border-separate ">
                                <thead>
                                    <tr>
                                        <th className={thStyle}>Transaction Id</th>
                                        <th className={thStyle}>Rider Name</th>
                                        <th className={thStyle}>Driver Name</th>
                                        <th className={thStyle}>Message</th>
                                        <th className={thStyle}>Amount</th>
                                        <th className={thStyle}>Deposit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paginatedData?.map((company, index) => (
                                            <tr style={{ borderRadius: "1rem" }} key={index} className="bg-white text-sm font-normal pb-4 h-[3rem]">
                                                <td className=" py-2 px-4 text-sm font-normal text-nowrap">{company?._id}</td>
                                                <td className="py-2 px-4 truncate w-[5rem] text-nowrap">{company?.riderId?.first_name + company?.riderId?.last_name || "-"}</td>
                                                <td className="py-2 px-4 truncate w-[5rem] text-nowrap">{company?.driverId?.first_name + company?.driverId?.last_name || "-"}</td>
                                                <td className='py-2 px-4'>{company?.message}</td>
                                                <td className='py-2 px-4'>$ {company?.amount}</td>
                                                <td className='py-2 px-4'>$ {company?.deposit ? `${company?.amount?.toFixed(2)} Send To Driver Name : ${company?.driverId?.first_name} ` : `${company?.amount?.toFixed(2)} Send To Admin`}</td>

                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <Pagination data={contactData} itemsPerPageOptions={[5, 10, 15, 20, 50, 100]} onDataChange={handleDataChange} />
                    </div>
                    :

                    <div className='h-[50vh] flex justify-center items-center'>
                        <h1 className='text-[#000] text-sm mt-4 text-center flex-1'>Oops ! No Wallet History Found</h1>
                    </div>
            }


            {
                createContactModel && (<CreateContactPopup contactInfo={saveContactData} setContactInfo={setSaveContactData} closeModel={setCreateContactModel} />)
            }


            {
                updateContactModel && (<UpdateContactPopup contactInfo={saveContactData} setContactInfo={setSaveContactData} closeModel={setupdateContactModel} />)
            }







        </div>

    )
}

export default Contacts
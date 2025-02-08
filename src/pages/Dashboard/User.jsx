import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import config from '../../config'
import toast from 'react-hot-toast';
import Pagination from '../../components/dashboard/Pagination';
import NotificationPopup from '../../components/dashboard/popups/NotificationPopup';

const User = () => {

    let thStyle = " py-2 px-4 text-left text-sm font-normal text-nowrap text-[#030229]"

    const [userData, setUserData] = useState([])
    const [paginatedData, setPaginatedData] = useState([]);
    const [notificationModel, setNotificationModel] = useState(false)
    const [user, setUser] = useState(null)
    const [notificationData,setNotificationData]=useState({title:"",description:""})


    const handleDataChange = (data) => {
        setPaginatedData(data);
    };
    const fetchInitialData = async () => {
        try {
            let subusers = await axios.get(`${config.baseUrl}/rider/all`)
            setUserData(subusers.data?.data)
        }
        catch (error) {
            return
        }
    }
    const toogleUser = async (accountId, toogle, role) => {
        try {
            let res = await axios.post(`${config.baseUrl}/rider/toogle-account`, { accountId, toogle, role })
            if (res.data) {
                toast.success(res?.data?.msg)
                fetchInitialData()
            }
        }
        catch (error) {
            toast.error("Something went wrong contact support")
        }
    }

    useEffect(() => {
        fetchInitialData()
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
                userData?.length > 0 ?
                    <div className="rounded-md min-w-[100%] flex-1 mt-6 overflow-x-auto">
                        <div className="overflow-x-auto w-full">
                            <table style={{ borderSpacing: "0 10px" }} className="min-w-[100%] border-separate ">
                                <thead className='bg-[#ececec] h-[3rem]'>
                                    <tr>
                                        <th className={thStyle}>Id</th>
                                        <th className={thStyle}>Username</th>
                                        <th className={thStyle}>Phone Number</th>
                                        <th className={thStyle}>Pending Amount</th>
                                        <th className={thStyle}>Role</th>
                                        <th className={thStyle}>Actions</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {paginatedData?.map((user, index) => (
                                        <tr style={{ borderRadius: "1rem" }} key={index} className="bg-white text-sm font-normal pb-4 h-[3rem]">
                                            <td className="py-2 px-4 text-sm text-nowrap">{user?._id}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{user.first_name + " " + user?.last_name}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{user.phone_number}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{user?.online ? "$ " + user?.pendingAmount : "-"}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{user?.online ? "driver" : "rider"}</td>
                                            <td className='py-2 px-4'>
                                                <div className='flex items-center gap-x-2'>
                                                    <button onClick={() => { toogleUser(user?._id, !user?.accountBlocked, user?.online ? "driver" : "rider") }} className={`${user.accountBlocked ? "bg-[#008000]" : "bg-red-500"} text-xs text-white px-2 rounded-[0.3rem] text-nowrap h-[2rem]`}>{user?.accountBlocked ? "Activate" : "Block"}</button>
                                                    <button onClick={() => { setNotificationModel(true); setUser(user) }} className={`text-xs text-white px-2 rounded-[0.3rem] text-nowrap h-[2rem] bg-[#4285F4]`}>Send Notification</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination data={userData} itemsPerPageOptions={[5, 10, 15, 20]} onDataChange={handleDataChange} />

                    </div>
                    :
                    <div className='h-[50vh] flex justify-center items-center'>
                        <h1 className='text-[#000] text-sm mt-4 text-center flex-1'>Oops ! No Users Found</h1>
                    </div>
            }




            {
                notificationModel && (<NotificationPopup contactInfo={notificationData} setContactInfo={setNotificationData} closeModel={setNotificationModel} userData={user}/>)
            }

        </div>

    )
}

export default User
import React, { useEffect, useState, useRef } from 'react';
import AvatarIcon from '../../assets/dashboard/avatar.jpg';
import config from '../../config';
import axios from 'axios';
import toast from 'react-hot-toast';

let inputStyle = "px-3 min-w-[100%] sm:min-w-[28rem] sm:max-w-[28rem] h-[2.4rem] border border-[#DCDADB] bg-transparent outline-none block rounded-md mt-2 cursor-not-allowed";

const Profile = () => {
    const [data, setData] = useState(null);
    const userId = localStorage.getItem("accountId");
    const fileInputRef = useRef();

    const fetchData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/admin/single/${userId}`);
            setData(res.data?.data);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='flex-1 md:h-[80vh] flex justify-center items-center'>
            {/* <div style={{ background: 'linear-gradient(to bottom, #FF6600, #FDBA74)' }} className='w-[100%] h-[6rem] rounded-tr-lg rounded-tl-lg relative'>
                <div className='flex items-center gap-x-2 cursor-pointer absolute left-6 top-7'>
                    <h1 className='text-white text-xl font-bold'>Hop OnDashboard</h1>
                </div>
            </div> */}

            {/* <div className='p-5 flex-1 flex justify-center items-center flex-col'>
                <div className='w-[100%] md:flex justify-between items-center mb-5'>
                    <div className='flex items-center gap-x-5'>
                        <img src={AvatarIcon} alt="" className='w-[4rem] h-[4rem] rounded-full bg-center cursor-pointer'/>
                        <input type="file" style={{ display: "none" }} accept="image/*"/>
                        <div>
                            <p className='text-lg mb-1 font-semibold'>{data?.username}</p>
                            <p className='text-sm truncate'>{data?.email}</p>
                        </div>
                    </div>
                </div>

                <div className='w-[100%] flex items-center gap-x-5 mb-2 flex-wrap justify-between'>
                    <div className='mt-2 flex-1'>
                        <p>Username</p>
                        <input type="text" value={data?.username} className={inputStyle} readOnly />
                    </div>
                    <div className='mt-2 flex-1'>
                        <p>Email</p>
                        <input type="text" value={data?.email} className={inputStyle} readOnly />
                    </div>
                </div>

            </div> */}

            <div className='shadow-2xl p-5 bg-white rounded-md sm:min-w-[20rem]'>

                <div className='flex items-center justify-center'>
                    <img src={AvatarIcon} alt="" className='w-[4rem] h-[4rem] rounded-full bg-center cursor-pointer' />
                </div>

                <div className='mt-6 border-b pb-2'>
                    <p>Username : {data?.username}</p>
                </div>
                <div className='mt-2 border-b pb-2'>
                    <p>Email : {data?.email}</p>
                </div>
                <div className='mt-2 border-b pb-2'>
                    <p>Role : Admin</p>
                </div>

            </div>

        </div>
    );
};

export default Profile;

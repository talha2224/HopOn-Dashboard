import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../../assets/leadbot.svg';
import FunnelImage from '../../../assets/dashboard/funnel.svg';
import AvatarIcon from '../../../assets/dashboard/avatar.jpg';
import { navData } from '../../../constants/sidebarData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { useSidebar } from '../../../context/SidebarContext';
import { handleLogout } from '../../../helpers/function';
import config from '../../../config';
import axios from 'axios';

const Sidebar = () => {
  const location = useLocation().pathname.split("/")[2];
  const [data, setData] = useState(null)
  const { isNavOpen, toggleNav } = useSidebar();
  const sidebarRef = useRef(null);
  const nav = useNavigate()
  const userId = localStorage.getItem("accountId");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleNav();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleNav]);

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
    <>
      {/* Desktop Sidebar */}
      <div className={`lg:block hidden w-[15rem] h-[100vh] bg-[#0F0F0F] p-5 relative`}>

        <div className='flex items-center gap-x-2'>
          <img src={Logo} alt="Hop On- Logo" className='h-[2rem] mr-2' />
          <h1 className='text-xl font-semibold text-white'>Hop On</h1>
        </div>
        <p className='text-[#a6b0cf] mt-[2rem] mb-4 text-xs'>MENU</p>

        <div className=''>
          {navData?.map((i) => (
            <Link to={`/dashboard/${i.link}`} key={i.id} className={`flex ${location == i.link && "bg-[#FF6600]"} p-2 rounded-md items-center gap-x-3 mb-2 cursor-pointer ${location == i.link ? "text-white" : "text-[#a6b0cf]"}`}>
              <div>{i.icon}</div>
              <p className='text-sm'>{i.name}</p>
            </Link>
          ))}
        </div>

        <div className='absolute bottom-5 w-[80%] flex justify-between items-center '>
          <div className='flex items-center gap-x-2'>
            <Link to={`/dashboard/profile`}  className='cursor-pointer'>
              <img src={data?.profile ? data?.profile : AvatarIcon} alt="" className='w-7 rounded-full' />
            </Link>
            <div>
              <p className='text-xs text-white'>{data?.username}</p>
            </div>
          </div>
          <IoLogOut onClick={() => handleLogout(nav)} className='text-[#fff] cursor-pointer text-xl' />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {
        isNavOpen && (
          <div className={`lg:hidden block w-[14rem] z-50 h-[100vh] bg-[#0F0F0F] p-5 fixed top-0 left-0 transition-all duration-300 ease-in-out ${isNavOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`} ref={sidebarRef}>
            <div className='flex items-center gap-x-2'>
              <img src={Logo} alt="leadbot-logo" className='h-[2rem] mr-2' />
              <h1 className='text-xl font-semibold text-white'>Hop On</h1>
            </div>

            <p className='text-[#a6b0cf] mt-[2rem] mb-4 text-xs'>MENU</p>

            <div>
              {navData?.map((i) => (
                <Link to={`/dashboard/${i.link}`} key={i.id} className={`flex ${location == i.link && "bg-[#FF6600]"} p-2 rounded-md items-center gap-x-3 mb-2 cursor-pointer ${location == i.link ? "text-white" : "text-[#a6b0cf]"}`}>
                  <div>{i.icon}</div>
                  <p className='text-sm'>{i.name}</p>
                </Link>
              ))}
            </div>


            <div className='absolute bottom-5 w-[80%] flex justify-between items-center '>
              <div className='flex items-center gap-x-2'>
                <Link to={`/dashboard/profile`} className='cursor-pointer' >
                  <img src={data?.profile ? data?.profile : AvatarIcon} alt="" className='w-7 rounded-full' />
                </Link>
                <div>
                  <p className='text-xs text-white'>{data?.username}</p>
                </div>
              </div>
              <IoLogOut onClick={() => handleLogout(nav)} className='text-[#fff] cursor-pointer text-xl' />
            </div>
          </div>
        )}
    </>
  );
};

export default Sidebar;

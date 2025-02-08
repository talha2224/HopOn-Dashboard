import React from 'react'
import Sidebar from './sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
const Layout = () => {
  const location = useLocation().pathname.split("/")[2];

  return (

    <div className='flex items-start bg-[#FAFAFB] w-screen h-screen'>
      <Sidebar />

      <div className='flex-1 h-[100vh] overflow-auto '>
        <Header location={location} />
        <div className='p-5 flex-1 overflow-x-auto'>
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Layout
import React, { useState } from 'react'
import Logo from '../../assets/leadbot.svg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [showNav, setShowNav] = useState(false);

    return (

        <div className=' flex justify-between items-center py-4 relative'>


            <Link to={"/"} className='flex items-center gap-x-2 cursor-pointer'>
                {/* <img src={Logo} alt="HopOn Dashboard- Logo" className='h-[2rem]' /> */}
                <h1 className='text-2xl font-medium'> <span className='text-[#FF6600]'>Lead</span> Dial</h1>
            </Link>


            <div className='md:flex items-center gap-x-4 hidden'>
                <Link to={"/"}><p className='text-[#0F172A] cursor-pointer'>Home</p></Link>
                <a href="#solution"><p className='text-[#0F172A] cursor-pointer'>Solution</p></a>
                <a href="#pricing"><p className='text-[#0F172A] cursor-pointer'>Pricing</p></a>
                <a href="#solution"><p className='text-[#0F172A] cursor-pointer'>Resources</p></a>
            </div>


            <div className='md:flex items-center gap-x-6 hidden'>
                <Link to={"/login"} className='text-[#0F172A] cursor-pointer'>Login</Link>
                <Link to={"/register"}><button className='text-[#fff] bg-[#FF6600] w-[6rem] h-[2.5rem] rounded-md text-sm'>Sign up</button></Link>
            </div>

            {/* RESPONSIVE  */}

            <div className='md:hidden block'>
                <GiHamburgerMenu onClick={() => { setShowNav(!showNav) }} className=' cursor-pointer text-xl text-[#FF6600]' />
            </div>


            {
                showNav && (
                    <div className='absolute bg-slate-50 w-[100%] top-[3.5rem] left-0 right-0 py-3 px-3'>
                        <div className='flex items-end justify-end w-[100%]'>
                            <ImCross onClick={() => { setShowNav(!showNav) }} className='text-sm cursor-pointer ' />
                        </div>

                        <Link to={"/"}><p className='text-[#0F172A] cursor-pointer'>Home</p></Link>
                        <p className='text-[#0F172A] cursor-pointer text-sm mb-1'>Solution</p>
                        <p className='text-[#0F172A] cursor-pointer text-sm mb-1'>Pricing</p>
                        <p className='text-[#0F172A] cursor-pointer text-sm mb-1'>Resources</p>
                        <Link to={"/login"} className='text-[#0F172A] cursor-pointer text-sm mb-1 block'>Login</Link>
                        <Link to={"/register"} className='text-[#0F172A] cursor-pointer text-sm mb-1'>Signup</Link>

                    </div>
                )
            }






        </div>


    )
}

export default Navbar
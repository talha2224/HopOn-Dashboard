import React, { useState } from 'react'
import Logo from '../../assets/leadbot.svg'
import RegisterBg from '../../assets/auth/illustration.png'
import { Link, useNavigate } from 'react-router-dom'
import config from '../../config'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const RegisterPage = () => {
  let inputStyle = "px-3 ml-3 sm:ml-0 w-[20rem] sm:min-w-[22rem] sm:max-w-[22rem] h-[3rem] border border-[#DCDADB] bg-transparent outline-none block rounded-md text-black"
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" })
  const nav = useNavigate()

  const onChangeInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    let loader = toast.loading("Processing Request....")
    try {
      if (credentials.email.length === 0 || credentials.username.length === 0 || credentials.password.length === 0) {
        toast.error("All Fields Are Required")
        toast.dismiss(loader)
      }
      else {
        let res = await axios.post(`${config.baseUrl}/account/register`, credentials)
        if (res.status == 200) {
          toast.dismiss(loader)
          toast.success(res?.data?.msg)
          await localStorage.setItem("roleId", res?.data?.data?.info?.roleId)
          await localStorage.setItem("accountId", res?.data?.data?.info?.id)
          await localStorage.setItem("token", res?.data?.data?.token)
          nav("/dashboard/home")
        }
      }
    }

    catch (error) {
      toast.error(error.response?.data?.msg)
      toast.dismiss(loader)
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hop OnDashboard",
    "url": "https://Hop OnDashboard.com",
    "logo": "https://Hop OnDashboard.com/leadbot.svg",
    "description":"HopOn Dashboardis an AI-based platform designed to revolutionize lead generation and customer interactions, providing advanced analytics and team management tools.",
  };

  return (
    <div className='w-screen h-screen flex justify-between items-center md:flex-row flex-col'>

      {/* LOGO  */}
      <Link to={"/"} className='flex items-center gap-x-5 fixed top-5 left-3 w-[100%] px-3'>
        <img src={Logo} alt="HopOn Dashboard- Logo" className='h-[2rem]' />
        <h1 className='text-lg'>Hop OnDashboard</h1>
      </Link>


      {/* IMAGE  */}
      <div className='hidden  bg-[#F8F5FF] h-[100vh] sm:flex justify-center items-center'>
        <img src={RegisterBg} alt="HopOn Dashboard- Register" className='h-[30rem] bg-contain' />
      </div>

      {/* RIGHT FORM  */}
      <div className='my-5 mx-10 flex-1 flex justify-center items-start flex-col'>

        <p className='text-4xl font-semibold ml-3 sm:ml-0'>Register</p>
        <p className='mt-2 text-sm ml-3 sm:ml-0'> <span className='text-[#FF6600] mr-1'>Let's create! </span>and account to use Hop OnDashboard</p>
        {/* FORM  */}
        <form action="" onSubmit={handleSubmit}>


          <p className='mt-6 mb-3 ml-3 sm:ml-0'>Username</p>
          <input onChange={(e) => onChangeInput(e)} type="text" name="username" placeholder='mark henry' required={true} className={inputStyle} />

          <p className='mt-6 mb-3 ml-3 sm:ml-0'>Email Address</p>
          <input onChange={(e) => onChangeInput(e)} type="email" name="email" placeholder='user@mail.com' required={true} className={inputStyle} />

          <p className='mt-6 mb-3 ml-3 sm:ml-0'>Password</p>
          <input onChange={(e) => onChangeInput(e)} type="password" name="password" placeholder='*******' required={true} className={inputStyle} />

          <input onClick={handleSubmit} type="submit" value="Sign Up" className='bg-[#FF6600] ml-3 sm:ml-0 w-[20.5rem] sm:w-[22rem] h-[3rem] mt-4 sm:mt-2 cursor-pointer hover:bg-[#FF6600] ease-in rounded-md text-white' />
          <p className='ml-3 sm:ml-0 w-[20.5rem] sm:w-[22rem] text-center mt-3 sm:mt-2 text-sm cursor-pointer md:pb-0 pb-3'>Already have an account? <Link to={"/"} className='text-[#FF6600] font-semibold'>Signin</Link></p>

        </form>

      </div>



    </div>
  )
}

export default RegisterPage

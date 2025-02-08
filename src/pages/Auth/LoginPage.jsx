import React, { useState } from 'react'
import Logo from '../../assets/leadbot.svg'
import LoginBg from '../../assets/auth/illustration.png'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import config from '../../config'
let inputStyle = "px-3 ml-3 sm:ml-0 min-w-[20.5rem] sm:min-w-[22rem] sm:max-w-[22rem] h-[3rem] border border-[#DCDADB] bg-transparent outline-none block rounded-md"

const LoginPage = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const nav = useNavigate()

  const onChangeInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let loader = toast.loading("Processing request....")
    try {
      if (credentials.email.length === 0 || credentials.password.length === 0) {
        toast.error("All fields are required")
        toast.dismiss(loader)
      }
      else {
        let res = await axios.post(`${config.baseUrl}/admin/login`, credentials)
        if (res.status == 200) {
          toast.dismiss(loader)
          toast.success(res?.data?.msg)
          console.log(res, 'res')
          localStorage.setItem("accountId", res?.data?.data?._id)
          nav("/dashboard/home")
        }
      }
    }

    catch (error) {
      toast.error(error.response?.data?.msg)
      toast.dismiss(loader)
    }
  }

  return (

    <div className='w-screen flex justify-between items-center md:flex-row flex-col h-[100vh]'>

      {/* LOGO */}
      <Link to={"/"} className='flex items-center gap-x-5 fixed top-5 left-3 w-[100%] px-3'>
        <img src={Logo} alt="HopOn Dashboard - Logo" className='h-[2rem]' />
        <h1 className='text-lg'>HopOn Dashboard</h1>
      </Link>

      {/* IMAGE */}
      <div className='hidden bg-[#F8F5FF] h-[100vh] sm:flex justify-center items-center'>
        <img src={LoginBg} alt="HopOn Dashboard - Login" className='h-[30rem] bg-contain' loading='lazy' />
      </div>

      {/* RIGHT FORM */}
      <div className='my-5 mx-10 flex-1 flex justify-center items-start flex-col '>

        <p className='text-4xl font-semibold ml-3 sm:ml-0'>Login</p>
        <p className='mt-2 text-sm ml-3 sm:ml-0'> <span className='text-[#FF6600] mr-1'>Welcome back! </span>Log in with your email and password</p>
        {/* FORM */}
        <form action="sm:mx-10" onSubmit={handleSubmit}>

          <p className='mt-6 mb-3 ml-3 sm:ml-0'>Email Address</p>
          <input onChange={(e) => onChangeInput(e)} type="email" name="email" placeholder='user@mail.com' required={true} className={inputStyle} />

          <p className='mt-6 mb-3 ml-3 sm:ml-0'>Password</p>
          <input onChange={(e) => onChangeInput(e)} type="password" name="password" placeholder='*******' required={true} className={inputStyle} />

          <p className='w-[20.5rem] sm:w-[22rem] text-right mt-2 text-sm cursor-pointer mr-6 sm:mr-0'>Forgot password?</p>

          <input onClick={handleSubmit} type="submit" value="Log in" className='bg-[#FF6600] w-[20.5rem] ml-3 sm:ml-0 sm:w-[22rem] h-[3rem] mt-2 cursor-pointer hover:bg-[#c7583a] ease-in text-white rounded-md' />
          {/* <p className='w-[20.5rem] sm:w-[22rem] ml-3 sm:ml-0 text-center mt-2 text-sm cursor-pointer md:pb-0 pb-3'>Don't have an account? <Link to={"/register"} className='text-[#ED5529] font-semibold'>Sign up</Link></p> */}

        </form>

      </div>
    </div>
  )
}

export default LoginPage

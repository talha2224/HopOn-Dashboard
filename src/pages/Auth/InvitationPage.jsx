import React, { useEffect, useState } from 'react'
import Logo from '../../assets/leadbot.svg'
import LoginBg from '../../assets/auth/illustration.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import config from '../../config'
let inputStyle = "px-3 min-w-[22rem] max-w-[22rem] h-[3rem] border border-[#DCDADB] bg-transparent outline-none block rounded-md"

const InvitationPage = () => {
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" })
    const nav = useNavigate()
    let token = useLocation().pathname.split("/")[4]

    const getAccountByToken = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/account/token/${token}`)
            setCredentials({ email: res?.data?.data?.email, username: res?.data?.data?.username })
        }
        catch (error) {
            nav("/login")
        }
    }
    const onChangeInput = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let loader = toast.loading("Processing Request....")
        try {
            if (credentials.password?.length === 0) {
                toast.error("All Fields Are Required")
                toast.dismiss(loader)
            }
            else {
                console.log("ENTER")
                let res = await axios.post(`${config.baseUrl}/account/accept`, { invitationKey: token, password: credentials.password })
                console.log(res?.data)
                if (res.status == 200) {
                    toast.dismiss(loader)
                    toast.success(res?.data?.msg)
                    nav("/login")
                }
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.response?.data?.msg)
            toast.dismiss(loader)
        }
    }

    useEffect(() => {
        getAccountByToken()
    }, [])

    return (
        <div className='w-screen flex justify-between items-center md:flex-row flex-col h-[100vh]'>

            {/* LOGO  */}
            <Link to={"/"} className='flex items-center gap-x-5 md:fixed top-2 left-3 w-[100%] px-3'>
                <img src={Logo} alt="HopOn Dashboard- Logo" className='h-[2rem]' />
                <h1 className='text-lg'>Hop OnDashboard</h1>
            </Link>


            {/* IMAGE  */}
            <div className='hidden  bg-[#F8F5FF] h-[100vh] sm:flex justify-center items-center'>
                <img src={LoginBg} alt="HopOn Dashboard- Login"  className='h-[30rem] bg-contain' />
            </div>

            {/* RIGHT FORM  */}
            <div className='my-5 mx-10 flex-1 flex justify-center items-start flex-col '>

                <p className='text-4xl font-semibold'>Set Password</p>
                <p className='mt-2 text-sm'> <span className='text-[#FF6600] mr-1'>Congrats {credentials?.username?.split(" ")[0]}! </span>set your password to get started !</p>
                {/* FORM  */}
                <form action="mx-10" onSubmit={handleSubmit}>

                    <p className='mt-6 mb-3'>Username</p>
                    <input value={credentials?.username} disabled type="text" name="username" placeholder='user@mail.com' required={true} className={inputStyle} />

                    <p className='mt-6 mb-3'>Email Address</p>
                    <input value={credentials?.email} disabled type="email" name="email" placeholder='user@mail.com' required={true} className={inputStyle} />

                    <p className='mt-6 mb-3'>Password</p>
                    <input onChange={(e) => onChangeInput(e)} type="password" name="password" placeholder='*******' required={true} className={inputStyle} />
                    <input onClick={handleSubmit} type="submit" value="Set Password" className='bg-[#FF6600] w-[22rem] h-[3rem] mt-2 cursor-pointer hover:bg-[#c7583a] ease-in text-white rounded-md' />

                </form>

            </div>



        </div>
    )
}

export default InvitationPage
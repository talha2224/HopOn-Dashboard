import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import config from '../../../config';
import Tippy from '@tippyjs/react';


const UpdateCompanyPopup = ({userData, companyInfo, setCompanyInfo, closeModel }) => {



    const handleUserSelection = (userId) => {
        setCompanyInfo((prev) => {
            const isAlreadyAssigned = prev.assignedUsers.includes(userId);
            return { ...prev, assignedUsers: isAlreadyAssigned ? prev.assignedUsers.filter((id) => id !== userId) : [...prev.assignedUsers, userId], };
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        let loader = toast.loading("Processing Request....")
        try {
            console.log(companyInfo,'companyInfo')
            let res = await axios.put(`${config.baseUrl}/companies/update/${companyInfo?.companyId}`, { ...companyInfo })
            if (res.data) {
                toast.dismiss(loader)
                toast.success(res?.data?.msg)
                setCompanyInfo({ name: "", description: "", assignedUsers: [], transcript: "",companyId:"", })
                closeModel(false)
            }
        }
        catch (error) {
            toast.dismiss(loader)
            toast.error(error.response?.data?.msg ? error.response?.data?.msg : "Failed to create user")
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out" onClick={() => closeModel(false)}>
            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 min-w-[95vw] sm:w-[90%] sm:max-w-md transform scale-95 opacity-0 animate-fade-in sm:h-fit h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-lg font-medium">Update Company</h2>
                    <Tippy content={"Don't replace customerName in the first message; the name is dynamic."}>
                        <button className="px-2 py-1 bg-red-500 text-white rounded-md text-xs">Important Note</button>
                    </Tippy>
                </div>
                {/* Company Name */}
                <div className="mb-4">
                    <label htmlFor="companyName" className="text-sm mb-2 block">Company Name</label>
                    <input type="text" id="companyName" name="name" value={companyInfo.name} onChange={handleInputChange} placeholder="Company Name" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />
                </div>

                {/* Company Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="text-sm mb-2 block">Company Description</label>
                    <textarea id="description" name="description" value={companyInfo.description} onChange={handleInputChange} placeholder="Company Description" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />
                </div>


                <div className="mb-4">
                    <label htmlFor="description" className="text-sm mb-2 block">First Message</label>
                    <input type="text" id="firstMessage" name="firstMessage" value={companyInfo?.firstMessage} onChange={handleInputChange} placeholder="AI's first message when the user picks up the call." className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />
                </div>


                {/* Company Transcript */}
                <div className="mb-4">
                    <label htmlFor="transcript" className="text-sm mb-2 block">Company Transcript</label>
                    <textarea id="transcript" name="transcript" value={companyInfo.transcript} onChange={handleInputChange} placeholder="Company Transcript" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />
                </div>

                {/* User Selection */}
                <div className="mb-4">
                    <label htmlFor="users" className="text-sm mb-3 block">Assign Users</label>
                    {
                        userData?.length === 0 ? <p className="text-sm text-gray-500">No users available</p> :
                            <div className="space-y-2">
                                {userData?.map(user => (
                                    <div key={user?._id} className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <input type="checkbox" value={user._id} checked={companyInfo?.assignedUsers.includes(user._id)} onChange={() => handleUserSelection(user._id)} className="mr-2 text-sm" />
                                            <span className='text-sm'>{user?.username}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                    }
                </div>


                {/* Buttons */}
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-gray-300 rounded-md mr-2 text-sm" onClick={() => closeModel(false)}>Cancel</button>
                    <button className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateCompanyPopup
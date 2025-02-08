import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import config from '../../../config';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const UpdateContactPopup = ({ contactInfo, setContactInfo, closeModel }) => {
    const companyId = localStorage.getItem("companyId")
    const userId = localStorage.getItem("accountId")

    console.log(contactInfo,'contactInfo')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        let loader = toast.loading("Processing Request....")
        console.log(contactInfo)
        if (contactInfo?.name?.length === "") {
            toast.dismiss(loader)
            toast.error("Please fill all the fields")
            return
        }
        else {
            try {
                let res = await axios.put(`${config.baseUrl}/category/update/${contactInfo?.contactId}`, { ...contactInfo})
                if (res.data) {
                    toast.dismiss(loader)
                    toast.success(res?.data?.msg)
                    setContactInfo({ contactId: "",name: ""})
                    closeModel(false)
                }
            }
            catch (error) {
                toast.dismiss(loader)
                toast.error(error.response?.data?.msg ? error.response?.data?.msg : "Failed to update category")
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out" onClick={() => closeModel(false)}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md transform scale-95 opacity-0 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-medium mb-4">Update Contact</h2>

                <div className="mb-4">
                    <label htmlFor="companyName" className="text-sm mb-2 block">Category Name</label>
                    <input type="text" id="companyName" name="name" value={contactInfo.name} onChange={handleInputChange} placeholder="Category Name" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />
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

export default UpdateContactPopup

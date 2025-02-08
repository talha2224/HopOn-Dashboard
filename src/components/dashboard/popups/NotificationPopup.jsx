import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import config from '../../../config';

const NotificationPopup = ({ contactInfo, setContactInfo, closeModel,userData }) => {
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        let loader = toast.loading("Processing Request....")
        if (contactInfo?.title?.length === "" || contactInfo?.description?.length === "") {
            toast.dismiss(loader)
            toast.error("Please fill all the fields")
            return
        }
        else {
            try {
                let res = await axios.post(`${config.baseUrl}/notifications/create`, { ...contactInfo,role:userData?.online ? "driver" : "rider",userId:userData?._id })
                if (res.data) {
                    toast.dismiss(loader)
                    toast.success("Notification Sent")
                    setContactInfo({ title: "",description: ""})
                    closeModel(false)
                }
            }
            catch (error) {
                toast.dismiss(loader)
                toast.error(error.response?.data?.msg ? error.response?.data?.msg : "Failed to create category")
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out" onClick={() => closeModel(false)}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md transform scale-95 opacity-0 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-medium mb-4">Send Notification</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="text-sm mb-2 block">Notification Title</label>
                    <input type="text" id="title" name="title" value={contactInfo.title} onChange={handleInputChange} placeholder="Title" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />
                    <label htmlFor="title" className="text-sm my-2 block">Notification Description</label>
                    <input type="text" id="description" name="description" value={contactInfo.description} onChange={handleInputChange} placeholder="Description" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />
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

export default NotificationPopup

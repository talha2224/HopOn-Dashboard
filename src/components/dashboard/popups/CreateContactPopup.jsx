import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import config from '../../../config';

const CreateContactPopup = ({ contactInfo, setPriceData, closeModel }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPriceData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        let loader = toast.loading("Processing Request....")
        if (!contactInfo?.perKmPrice || !contactInfo?.deductCharges) {
            toast.dismiss(loader)
            toast.error("Please fill all the fields")
            return
        }
        else {
            try {
                let res = await axios.post(`${config.baseUrl}/price/update`, { ...contactInfo })
                if (res.data) {
                    toast.dismiss(loader)
                    toast.success("Price Updated")
                    closeModel(false)
                }
            }
            catch (error) {
                toast.dismiss(loader)
                toast.error(error.response?.data?.msg ? error.response?.data?.msg : "Failed to update price")
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out" onClick={() => closeModel(false)}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md transform scale-95 opacity-0 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-medium mb-4">Update Pricing</h2>

                <div className="mb-4">
                    <label htmlFor="perKmPrice" className="text-sm mb-2 block">Per Miles Price</label>
                    <input type="number" id="perKmPrice" name="perKmPrice" value={contactInfo?.perKmPrice} onChange={(e)=>handleInputChange(e)} placeholder="Per Miles Price" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />

                    <label htmlFor="perKmPrice" className="text-sm my-2 block mt-4">Per KM Price</label>
                    <input type="number" id="perKmPrice" name="perMilePrice" value={contactInfo?.perMilePrice} onChange={(e)=>handleInputChange(e)} placeholder="Per KM Price" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />


                    <label htmlFor="deductCharges" className="text-sm my-2 block">Per Ride Fees %</label>
                    <input type="number" id="deductCharges" name="deductCharges" value={contactInfo?.deductCharges} onChange={(e)=>handleInputChange(e)} placeholder="Per Miles Fees %" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />

                </div>



                {/* Buttons */}
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-gray-300 rounded-md mr-2 text-sm" onClick={() => closeModel(false)}>Cancel</button>
                    <button className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default CreateContactPopup

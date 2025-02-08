import React from 'react'
import toast from 'react-hot-toast'
import config from '../../../config'
import axios from 'axios'
import { IoIosAlert } from "react-icons/io";
import Tippy from '@tippyjs/react';
const TranscriptPopup = ({ companyInfo, setTranscriptModel, updateCompanyInfo }) => {

    const handleSubmit = async () => {
        try {
            let res = await axios.put(`${config.baseUrl}/companies/update/transcript/${companyInfo?.companyId}`, companyInfo)
            toast.success("Transcript updated successfully")
            setTranscriptModel(false)
        }
        catch (error) {
            toast.error("Failed to update transcript")
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateCompanyInfo(prevState => ({ ...prevState, [name]: value }));
    };
    return (
        <div className="fixed top-0 left-0 w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out" onClick={() => setTranscriptModel(false)}>
            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 min-w-[95vw] sm:min-w-[70vh] sm:max-w-md transform scale-95 opacity-0 animate-fade-in" onClick={(e) => e.stopPropagation()}>

                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-base sm:text-lg font-medium">Transcript Details</h2>
                    <Tippy content={"Don't change anything inside [brackets], e.g., [Person's Name]."}>
                        <button className="px-2 py-1 bg-red-500 text-white rounded-md text-xs">Important Note</button>
                    </Tippy>

                </div>


                {/* Company Transcript */}
                <div className="mb-4">
                    <div className='mb-2 '>
                        <label htmlFor="transcript" className="text-sm">Call Transcript</label>
                    </div>
                    <textarea id="transcript" name="transcript" value={companyInfo.transcript} onChange={handleInputChange} placeholder="Company Transcript" className="w-[100%] px-3 py-2 min-h-[50vh] border rounded-md focus:outline-none text-sm resize-y" />
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-gray-300 rounded-md mr-2 text-sm" onClick={() => setTranscriptModel(false)}>Cancel</button>
                    <button className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default TranscriptPopup
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import config from '../../../config';

const SyncPopup = ({ setIsModalOpen, isModalOpen, setListId, listId }) => {
    const userId = localStorage.getItem("accountId")
    const companyId = localStorage.getItem("companyId")

    const closeModal = () => setIsModalOpen(false);

    const syncData = async (e) => {
        e.preventDefault()
        let loader = toast.loading("Syncing Data From HubSpot....")
        if (!listId) {
            toast.dismiss(loader)
            toast.error("Please Provide List Id")
        }
        else {
            try {
                let res = await axios.post(`${config.baseUrl}/contacts/sync`, { userId, companyId, listId })
                if (res.data) {
                    toast.dismiss(loader)
                    toast.success(res?.data?.msg)
                    setListId(null)
                    closeModal(false)
                }
            }
            catch (error) {
                toast.dismiss(loader)
                toast.error("Failed to sync data")
            }
        }
    }


    return (

        <>

            {
                isModalOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out z-50" onClick={closeModal}>
                        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md transform scale-95 opacity-0 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-lg font-medium mb-4">Enter HubSpot List ID</h2>
                            <input type="number" value={listId} onChange={(e) => setListId(e.target.value)} placeholder="List ID" className="w-full px-3 py-2 border rounded-md focus:outline-none" />
                            <div className="mt-4 flex justify-end">
                                <button className="px-4 py-2 bg-gray-300 rounded-md mr-2 text-sm" onClick={closeModal}>Cancel</button>
                                <button className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm" onClick={syncData}>Submit</button>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default SyncPopup
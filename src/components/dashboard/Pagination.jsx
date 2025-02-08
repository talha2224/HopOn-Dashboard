import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ data, itemsPerPageOptions, onDataChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    useEffect(() => {
        const offset = (currentPage - 1) * itemsPerPage;
        const paginatedData = data.slice(offset, offset + itemsPerPage);
        onDataChange(paginatedData);
    }, [currentPage, itemsPerPage, data]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) { setCurrentPage(page); }
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="flex justify-between items-center mt-4 bg-[#ececec] px-2 py-2 rounded-md shadow-2xl">
            <div className="flex items-center gap-x-2">
                <span className=' text-sm'>Show</span>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="border border-gray-300  p-1 outline-none rounded-md cursor-pointer appearance-none">
                    {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-x-2">
                <div onClick={() => currentPage !== 1 && handlePageChange(currentPage - 1)} className="p-2 cursor-pointer bg-[#eff2f7] rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={currentPage === 1}>
                    <IoIosArrowBack />
                </div>

                <div className="flex gap-x-2">
                    {totalPages <= 3 ? (
                        Array.from({ length: totalPages }, (_, i) => {
                            const pageNum = i + 1;
                            return (<button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`w-[2rem] h-[2rem] text-md rounded-md ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-white border'}`}>{pageNum}</button>);
                        })
                    ) : (
                        <>
                            <button onClick={() => handlePageChange(1)} className={`w-[2rem] h-[2rem] text-md rounded-md ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-white border'}`}>1</button>
                            {currentPage > 2 && <span>...</span>}

                            {currentPage > 1 && currentPage < totalPages - 1 && (
                                <>
                                    {currentPage > 2 && (<button onClick={() => handlePageChange(currentPage - 1)} className={`w-[2rem] h-[2rem] text-md rounded-md ${currentPage === currentPage - 1 ? 'bg-blue-500 text-white' : 'bg-white border'}`} > {currentPage - 1} </button>)}
                                    <button onClick={() => handlePageChange(currentPage)} className={`w-[2rem] h-[2rem] text-md rounded-md ${currentPage === currentPage ? 'bg-blue-500 text-white' : 'bg-white border'}`}> {currentPage}</button>
                                    {currentPage < totalPages - 2 && (<button onClick={() => handlePageChange(currentPage + 1)} className={`w-[2rem] h-[2rem] text-md rounded-md ${currentPage === currentPage + 1 ? 'bg-blue-500 text-white' : 'bg-white border'}`}>{currentPage + 1}</button>)}
                                </>
                            )}

                            {currentPage < totalPages - 1 && <span>...</span>}
                            <button onClick={() => handlePageChange(totalPages)} className={`w-[2rem] h-[2rem] text-md rounded-md ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white border'}`}>{totalPages}</button>
                        </>
                    )}
                </div>

                <div onClick={() => currentPage !== totalPages && handlePageChange(currentPage + 1)} className="p-2 cursor-pointer bg-[#eff2f7] rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={currentPage === totalPages}>
                    <IoIosArrowForward />
                </div>
            </div>



        </div>
    );
};

export default Pagination;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import config from "../../config";
import toast from "react-hot-toast";
import { formatReadableDate } from "../../helpers/function";
import Pagination from "../../components/dashboard/Pagination";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import CreateContactPopup from "../../components/dashboard/popups/CreateContactPopup";


const containerStyle = {
    width: "800px",
    height: "500px",
};

const Companies = () => {
    const [bookingData, setBookingData] = useState([]);
    const [priceData, setPriceData] = useState({});
    const [paginatedData, setPaginatedData] = useState([]);
    const [booking, setBooking] = useState(null);
    const [showBookingMap, setShowBookingMap] = useState(false);
    const [priceModel, setPriceModel] = useState(false)

    const handleDataChange = (data) => {
        setPaginatedData(data);
    };

    const fetchInitialData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/ride/all`);
            let res2 = await axios.get(`${config.baseUrl}/price/all`);
            setPriceData(res2?.data?.data[0])
            setBookingData(res.data?.data);
        } catch (error) {
            toast.error("Failed To Fetch companies");
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);
    return (

        <div>
            {/* HEADER */}
            <div className="flex justify-start md:justify-end items-center gap-x-4 flex-wrap mt-2">
                <button onClick={() => { setPriceModel(true) }} className={`text-xs text-white px-2 rounded-[0.3rem] text-nowrap h-[2rem] bg-[#4285F4]`}>Update Pricing</button>

                <div className="bg-[#fff] border rounded-md py-2 px-3 flex items-center justify-between w-fit sm:w-[16rem]">
                    <inputv type="text"
                        placeholder="Search"
                        className="w-[100%] sm:w-[12rem] rounded-md mr-3 outline-none border-none bg-transparent"
                    />
                    <CiSearch />
                </div>
            </div>

            {/* TABLE */}
            {bookingData?.length > 0 ? (
                <div className="mt-10">
                    <div className="overflow-x-auto">
                        <table className="border-collapse overflow-x-auto">
                            <thead>
                                <tr>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Booking ID</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Passenger Name</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Driver Name</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Pickup Address</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Drop-off Address</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Status</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Booking Date</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Fare Cost</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData?.map((data) => (
                                    <tr key={data._id} className="border-b hover:bg-gray-100 text-sm font-normal">
                                        <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?._id}</td>
                                        <td className="py-2 px-4 flex items-center text-sm font-normal text-nowrap">
                                            {data?.rider?.first_name + " " + data?.rider?.last_name}
                                        </td>
                                        <td className="py-2 px-4 text-sm font-normal text-nowrap">
                                            {data?.driver.first_name + " " + data?.driver?.last_name}
                                        </td>
                                        <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.pickUpAddress}</td>
                                        <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.dropoffAddress}</td>
                                        <td className="py-2 px-4 text-sm font-normal text-nowrap">
                                            <button
                                                className={`${data?.status?.toLowerCase()?.includes("completed")
                                                    ? "bg-[#4285F4]"
                                                    : data?.status?.toLowerCase()?.includes("cancelled")
                                                        ? "bg-red-500"
                                                        : "bg-green-500"
                                                    } text-xs text-white px-2 rounded-[0.3rem] text-nowrap py-1`}
                                            >
                                                {data?.status}
                                            </button>
                                        </td>
                                        <td className="py-2 px-4 text-sm font-normal text-nowrap">
                                            {formatReadableDate(data?.createdAt)}
                                        </td>
                                        <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.fare ? "$ " + data?.fare : "-"}</td>
                                        <td className="px-4">
                                            <button
                                                onClick={() => {
                                                    setShowBookingMap(true);
                                                    setBooking(data);
                                                }}
                                                className="text-xs text-white px-2 rounded-[0.3rem] text-nowrap h-[2rem] bg-[#4285F4]"
                                            >
                                                Track
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination data={bookingData} itemsPerPageOptions={[5, 10, 15, 20]} onDataChange={handleDataChange} />
                </div>
            ) : (
                <p className="text-[#000] text-sm mt-4 flex-1 text-center">Oops ! No Booking Found</p>
            )}

            {/* GOOGLE MAP POPUP */}
            {showBookingMap && booking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg relative">
                        <div className="flex justify-end items-end my-2">
                            <button className=" text-red-500" onClick={() => setShowBookingMap(false)}>Close</button>
                        </div>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{
                                lat: booking?.pickupLocation?.coordinates[1],
                                lng: booking?.pickupLocation?.coordinates[0],
                            }}
                            zoom={13}
                        >
                            <Marker position={{ lat: booking?.driver.location?.coordinates[1], lng: booking?.driver?.location?.coordinates[0] }} label="D" title="Driver Location" />
                            <Marker position={{ lat: booking?.pickupLocation?.coordinates[1], lng: booking?.pickupLocation?.coordinates[0] }} label="P" title="Pickup Location" />
                            <Marker position={{ lat: booking?.dropoffLocation?.coordinates[1], lng: booking?.dropoffLocation?.coordinates[0] }} label="O" title="Drop-off Location" />

                            <Polyline
                                path={[
                                    { lat: booking?.driver?.location?.coordinates[1], lng: booking?.driver.location?.coordinates[0] },
                                    { lat: booking?.pickupLocation?.coordinates[1], lng: booking?.pickupLocation?.coordinates[0] },
                                    { lat: booking?.dropoffLocation?.coordinates[1], lng: booking?.dropoffLocation?.coordinates[0] },
                                ]}
                                options={{ strokeColor: "#4285F4", strokeOpacity: 0.8, strokeWeight: 4 }}
                            />
                        </GoogleMap>
                    </div>
                </div>
            )}

            {
                priceModel && (<CreateContactPopup contactInfo={priceData} setPriceData={setPriceData} closeModel={setPriceModel} />)
            }
        </div>
    );
};

export default Companies;

import React, { useEffect, useMemo, useState } from 'react'
import { FaPhone } from 'react-icons/fa'
import { RiTeamFill } from "react-icons/ri";
import { SiGoogleads } from 'react-icons/si'
import { MdModeOfTravel } from "react-icons/md";
import { Doughnut, Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import AvatarIcon from '../../assets/dashboard/avatar.jpg'
import config from '../../config';
import axios from 'axios';
import { IoCarSportSharp } from 'react-icons/io5';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Home = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [timePeriod, setTimePeriod] = useState('month');

  const fetchData = async () => {
    try {
      let res = await axios.get(`${config.baseUrl}/dashboard/data`);
      setDashboardData(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const transformData = (data, period) => {
    let groupedData = {};
    data.forEach(call => {
      const date = new Date(call?.createdAt);
      if (date) {
        const month = date.getMonth();
        const year = date.getFullYear();
        const timeKey = period === 'month' ? month : year;
        if (!groupedData[timeKey]) {
          groupedData[timeKey] = 0;
        }
        groupedData[timeKey] += 1;
      }
    });

    let labels = [];
    let chartData = [];

    if (period === 'year') {
      const currentYear = new Date().getFullYear();
      const numYearsToShow = 5;
      const startYear = currentYear - (numYearsToShow - 1);
      const endYear = currentYear;
      for (let year = startYear; year <= endYear; year++) {
        labels.push(year.toString());
        chartData.push(groupedData[year] || 0);
      }
    } else {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      chartData = Array(12).fill(0).map((_, i) => groupedData[i] || 0);
    }

    return {
      labels,
      datasets: [{
        label: `Bookings (${period})`,
        data: chartData,
        borderColor: "#FF6600",
        backgroundColor: "rgba(234, 88, 12, 0.2)",
        pointBackgroundColor: "#FF6600",
        tension: 0.4,
      }],
    };
  };

  const data = transformData(dashboardData?.totalBookingsData || [], timePeriod);
  const options = { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, }, }, };
  const successRate = (dashboardData?.completedBookingsData?.length || 0) / (dashboardData?.totalBookingsData?.length || 1) * 100;


  const donutData = useMemo(() => {
    const totalCalls = Number(dashboardData?.totalBookingsData?.length) || 0;
    const successfulCalls = Number(dashboardData?.completedBookingsData?.length) || 0;
    const adjustZero = (num) => (num === 0 ? 0.000001 : num);
    return { labels: ["Total Booking", "Completed",], datasets: [{ data: [adjustZero(totalCalls), adjustZero(successfulCalls)], backgroundColor: ["#4F8EF7", "#FFD66B"], hoverBackgroundColor: ["#4F8EF7", "#FFD66B", "#FF8F6B"], borderWidth: 0, cutout: "75%", }], };
  }, [dashboardData]);

  const donutOptions = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            let label = context?.label || '-';
            if (label) {
              label += ': ';
            }
            label += context.formattedValue;
            return label;
          },
          title: (context) => {
            return context[0]?.label || "-";
          },
        },
        position: 'average',
        zIndex: 10000
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };
  return (


    <div className='flex-1 overflow-x-auto'>

      {/* CARDS  */}
      <div className='flex justify-between items-center w-[100%] overflow-x-auto gap-x-5'>

        <div className='min-w-[276px] h-[116px] bg-white rounded-md flex items-center px-5'>

          <div className='flex items-start gap-x-6'>

            <div className={`w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#5B93FF] bg-opacity-10`}>
              <RiTeamFill className='text-xl text-[#5B93FF]' />
            </div>

            <div>
              <h1 className='mb-1 text-xl'>{dashboardData?.totalRiders}</h1>
              <p className='text-[#a6b0cf] text-sm'>{"Total Riders"}</p>
            </div>
          </div>

        </div>

        <div className='min-w-[276px] h-[116px] bg-white rounded-md flex items-center px-5'>

          <div className='flex items-start gap-x-6'>

            <div className={`w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#FF8F6B] bg-opacity-10`}>
              <IoCarSportSharp className='text-xl text-[#FF8F6B]' />
            </div>

            <div>
              <h1 className='mb-1 text-xl'>{dashboardData?.totalDrivers}</h1>
              <p className='text-[#a6b0cf] text-sm'>{"Total Drivers"}</p>
            </div>
          </div>

        </div>


        <div className='min-w-[276px] h-[116px] bg-white rounded-md flex items-center px-5'>

          <div className='flex items-start gap-x-6'>

            <div className={`w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#E71D36] bg-opacity-10`}>
              <MdModeOfTravel className='text-xl text-[#E71D36]' />
            </div>

            <div>
              <h1 className='mb-1 text-xl'>{dashboardData?.totalBookings}</h1>
              <p className='text-[#a6b0cf] text-sm'>{"Total Rides"}</p>
            </div>
          </div>

        </div>


        <div className='min-w-[276px] h-[116px] bg-white rounded-md flex items-center px-5'>

          <div className='flex items-start gap-x-6'>

            <div className={`w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#605BFF] bg-opacity-10`}>
              <SiGoogleads className='text-xl text-[#605BFF]' />
            </div>

            <div>
              <h1 className='mb-1 text-xl'>{dashboardData?.completedBookings}</h1>
              <p className='text-[#a6b0cf] text-sm'>{"Completed Rides"}</p>
            </div>
          </div>

        </div>

      </div>

      {/* CHARTS  */}

      <div className='flex justify-between items-start mt-8 gap-x-6 flex-wrap'>

        {/* LINE CHART  */}
        <div className="bg-white rounded-md lg:min-w-[70%] p-5 lg:flex-none flex-1 mt-2">
          <div className='flex  justify-between items-center'>
            <p className="text-lg font-medium mb-2">Total number of bookings ({timePeriod === 'month' ? 'Monthly' : 'Yearly'})</p>
            <select value={timePeriod || ""} onChange={handleTimePeriodChange} className="bg-[#e5e7ea] p-2 rounded-md outline-none text-sm appearance-none max-w-[8rem] truncate cursor-pointer">
              <option key={"month"} value={"month"}>Monthly</option>
              <option key={"year"} value={"year"}>Yearly</option>
            </select>
          </div>
          <Line data={data} options={options} height={103} />
        </div>

        {/* PIE CHART  */}

        <div className="bg-white rounded-md p-5 h-[23rem] flex-1 mt-2">
          <p className="text-lg font-medium mb-4">Analytics</p>
          <div className="flex justify-center items-center flex-col">
            <div className="relative w-[12rem] h-[12rem]">
              <Doughnut data={donutData} options={donutOptions} />
              <div className="absolute top-[4rem] left-[3rem] flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-black">{successRate.toFixed(1)}%</p>
                <p className="text-[0.6rem] text-gray-600 ml-[-10px]">Pending bookings</p>
              </div>
            </div>
            <div className="flex justify-between w-full mt-8">

              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#4F8EF7] rounded-full mr-1"></div>
                <span className="text-xs">Total bookings</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#FFD66B] rounded-full mr-1"></div>
                <span className="text-xs">Completed</span>
              </div>
            </div>
          </div>
        </div>


      </div>


      {/* TABLES  */}

      <div className='flex justify-between items-start mt-8 gap-x-6 flex-wrap'>
        <div className='bg-white rounded-md lg:max-w-[70%] lg:min-w-[70%]  p-5 lg:flex-none min-w-[100%] flex-1 mt-2  overflow-x-auto'>
          <p className="text-lg font-medium mb-2">Booking Overview</p>
          {
            dashboardData?.totalBookingsData?.length > 0 ?
              <div className="overflow-x-auto w-full">
                <table className="min-w-[800px] border-collapse overflow-x-auto"> {/* Ensure table is wide enough */}
                  <thead>
                    <tr>
                      <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Booking ID</th>
                      <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Passenger Name</th>
                      <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Driver Name</th>
                      <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Pickup Address</th>
                      <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Dropoff Address</th>
                      <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Status</th>
                      <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Ride Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData?.totalBookingsData.map((data, i) => {
                      if (i < 4) {
                        return (
                          <tr key={data._id} className="border-b hover:bg-gray-100 text-sm font-normal">
                            <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?._id}</td>
                            <td className="py-2 px-4 flex items-center text-sm font-normal text-nowrap">{data?.rider?.first_name}</td>
                            <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.driver?.first_name}</td>
                            <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.pickUpAddress}</td>
                            <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.dropoffAddress}</td>
                            <td className="py-2 px-4 text-sm font-normal text-nowrap"><button className={`${data?.status?.toLowerCase()?.includes("completed") ? "bg-[#4285F4]" : data?.leadStatus?.toLowerCase()?.includes("lost") ? "bg-red-500" : "bg-green-500"} text-xs text-white px-2 rounded-[0.3rem] text-nowrap py-1`}>{data?.status}</button></td>
                            <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.fare ? "$ " + data?.fare : "-"}</td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </table>
              </div> :
              <p className='text-[#000] text-sm mt-4  flex-1 text-center'>Oops! No Booking Found</p>
          }
        </div>


        <div className="bg-white rounded-md p-5 flex-1 mt-2 min-w-[20rem]">
          <p className="text-lg font-medium mb-4">Driver Overview</p>
          {
            dashboardData?.totalDriversData?.length > 0 ?
              <div className="">

                {dashboardData?.totalDriversData?.map((i, ind) => {
                  if (ind < 2) {
                    return (
                      <div key={ind} className='mb-2 flex items-start gap-x-4 border-b py-2'>
                        <div className='w-[3rem] h-[3rem] rounded-md flex justify-center items-center'>
                          <img src={AvatarIcon} alt="HopOn Dashboard - Drivers" />
                        </div>
                        <div>
                          <p className='text-lg'>{i.first_name}</p>
                          <p className='text-sm mt-1'>Contact: {i?.phone_number}</p>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
              :
              <p className='text-[#000] text-sm mt-4 flex-1 text-center'>Oops! No Drivers Found</p>
          }
        </div>


      </div>

    </div>


  )
}

export default Home
import { FaAddressBook, FaBuilding, FaCalendarAlt, FaRegCalendarCheck, FaUser, FaWallet } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
import { IoIosCall, IoMdNotifications } from "react-icons/io";
import { MdModeOfTravel } from 'react-icons/md';
import { IoCarSportSharp } from 'react-icons/io5';

export const navData = [
    {
        id: 1,
        link: "home",
        name: "Dashboard",
        icon: <RxDashboard />
    },
    {
        id: 7,
        link: "users",
        name: "Users",
        icon: <FaUser />
    },
    {
        id: 4,
        link: "bookings",
        name: "Bookings",
        icon: <MdModeOfTravel />
    },
    {
        id: 3,
        link: "wallet",
        name: "Walllet History",
        icon: <FaWallet/>
    }
];

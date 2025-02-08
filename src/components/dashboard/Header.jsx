import React, { useEffect, useState } from 'react'
import AvatarIcon from '../../assets/dashboard/avatar.jpg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSidebar } from '../../context/SidebarContext';
import { RxEnterFullScreen } from "react-icons/rx";
import { Link } from 'react-router-dom';

const Header = ({ location }) => {
    const { isNavOpen, toggleNav } = useSidebar();
    const [isFullScreen, setIsFullScreen] = useState(false);


    const enterFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) { elem.requestFullscreen(); }
        else if (elem.mozRequestFullScreen) { elem.mozRequestFullScreen(); }
        else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); }
        else if (elem.msRequestFullscreen) { elem.msRequestFullscreen(); }
        setIsFullScreen(true);
    };
    const exitFullScreen = () => {
        if (document.exitFullscreen) { document.exitFullscreen(); }
        else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
        else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
        else if (document.msExitFullscreen) { document.msExitFullscreen(); }
        setIsFullScreen(false);
    };
    const toggleFullScreen = () => {
        if (isFullScreen) { exitFullScreen(); }
        else { enterFullScreen(); }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isFullScreen) { exitFullScreen(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullScreen]);



    return (

        <div className='w-[100%] flex justify-between items-center p-5 px-3 sm:p-5 border-b border-[lightgray]'>

            <div className='flex items-center gap-x-4'>
                <GiHamburgerMenu className='lg:hidden block cursor-pointer' onClick={() => toggleNav(!isNavOpen)} />
                <p className='sm:text-lg'>{location === "home" ? "Dashboard" : location.charAt(0).toUpperCase() + location.slice(1)}</p>
            </div>


            <div className='flex items-center gap-x-3 sm:gap-x-4'>

                <RxEnterFullScreen className='text-[1.3rem] cursor-pointer' onClick={toggleFullScreen} title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"} />

                <Link to={`/dashboard/profile`}>
                    <img src={AvatarIcon} alt="HopOn Dashboard- Avatar" className='max-w-8 min-w-8 cursor-pointer' />
                </Link>
            </div>

        </div>

    )
}

export default Header
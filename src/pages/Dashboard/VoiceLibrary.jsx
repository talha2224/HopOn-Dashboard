import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { voiceLibraryData } from '../../constants/voices';
import { FaPlay, FaPause } from 'react-icons/fa';
import { IoIosCheckbox } from "react-icons/io";
const PAGE_SIZE = 14; 
const VoiceLibrary = () => {
    const audioRefs = useRef({});
    const [currentAudio, setCurrentAudio] = useState(null);
    const [playingUrl, setPlayingUrl] = useState(null);
    const [progress, setProgress] = useState({});
    const [duration, setDuration] = useState({});
    const [visibleData, setVisibleData] = useState([]);
    const [page, setPage] = useState(1);
    const observer = useRef();

    const handlePlayPause = (url) => {
        if (!audioRefs.current[url]) {
            const newAudio = new Audio(url);
            newAudio.addEventListener('timeupdate', () => {
                setProgress((prev) => ({ ...prev, [url]: newAudio.currentTime }));
            });
            newAudio.addEventListener('loadedmetadata', () => {
                setDuration((prev) => ({ ...prev, [url]: newAudio.duration }));
            });
            newAudio.addEventListener('ended', () => {
                setPlayingUrl(null);
                setProgress((prev) => ({ ...prev, [url]: 0 }));
            });
            audioRefs.current[url] = newAudio;
        }

        const audio = audioRefs.current[url];

        if (playingUrl === url) {
            audio.pause();
            setPlayingUrl(null);
        } else {
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
            }
            audio.play();
            setCurrentAudio(audio);
            setPlayingUrl(url);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };



    useEffect(() => {
        setVisibleData(voiceLibraryData.slice(0, PAGE_SIZE));
    }, []);

    const loadMoreData = useCallback(() => {
        const nextPage = page + 1;
        const newItems = voiceLibraryData.slice(visibleData.length, nextPage * PAGE_SIZE);
        setVisibleData((prev) => [...prev, ...newItems]);
        setPage(nextPage);
    }, [page, visibleData]);

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadMoreData();
            }
        },
        [loadMoreData]
    );

    useEffect(() => {
        const target = document.querySelector('#load-more-trigger');
        observer.current = new IntersectionObserver(handleObserver);
        if (target) observer.current.observe(target);

        return () => observer.current && observer.current.disconnect();
    }, [handleObserver]);

    return (
        <div>
            <div className='flex justify-start md:justify-end items-center gap-x-4 flex-wrap'>
                <div className='bg-[#fff] border rounded-md py-2 px-3 flex items-center justify-between w-fit sm:w-[16rem] mt-2 '>
                    <input type="text" placeholder='Search' className='w-[100%] sm:w-[12rem] rounded-md mr-3 outline-none border-none bg-transparent' />
                    <CiSearch />
                </div>
                <div title='Upload Contact Data From Excel' className='flex justify-center items-center bg-[#eff2f7] rounded-md w-[10rem] py-2 px-3 text-sm gap-x-2 cursor-pointer mt-2'>
                    <p className='text-sm'>Create User</p>
                </div>
            </div>

            <div className='flex justify-between items-center flex-wrap mt-10 gap-x-2'>
                {visibleData?.map((i) => (
                    i?.previewUrl && (
                        <div key={i.slug} className='border w-[18.3rem] h-[10rem] mb-10 shadow-navShadow rounded-md py-3 px-3 capitalize relative'>
                            <p className='mt-1'>{i.name}</p>
                            <div className='flex items-center gap-x-1 mt-1'>
                                {i?.accent && <p className='text-sm text-gray-500'>{i?.accent}</p>}
                                {i?.accent && <div className='w-[1px] h-[1rem] bg-gray-500'></div>}
                                {i?.gender && <p className='text-sm text-gray-500'>{i?.gender}</p>}
                            </div>

                            {i?.previewUrl && (
                                <div className="flex items-center gap-x-2 absolute bottom-5 w-[91%]">
                                    <button onClick={() => handlePlayPause(i.previewUrl)} className="text-xl">
                                        {playingUrl === i.previewUrl ? <FaPause className='text-[1rem]' /> : <FaPlay className='text-[1rem]' />}
                                    </button>
                                    <div className="flex items-center gap-2 w-full">
                                        <input type="range" min="0" max={duration[i.previewUrl] || 0} value={progress[i.previewUrl] || 0} onChange={(e) => {if (audioRefs.current[i.previewUrl]) {audioRefs.current[i.previewUrl].currentTime = e.target.value;setProgress((prev) => ({ ...prev, [i.previewUrl]: e.target.value }));}}} className="w-full"/>
                                    </div>
                                    <span className="text-sm text-nowrap text-gray-500">{formatTime(progress[i.previewUrl] || 0)}</span>
                                    <IoIosCheckbox className='text-[2rem] text-blue-500 cursor-pointer'/>
                                </div>
                            )}
                        </div>
                    )
                ))}
            </div>

            <div id="load-more-trigger" style={{ height: 1 }}></div>

        </div>
    );
};

export default VoiceLibrary;

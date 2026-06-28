import React, { useMemo, useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom';
import { FaMotorcycle } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoMdTime } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import tranding1 from "../assets/tranding1.png"
import tranding2 from "../assets/tranding2.png"
import tranding3 from "../assets/tranding3.png"
import tranding4 from "../assets/tranding4.png"
import DataHalals from '../data/DataHalal';

const Halal = () => {
    const navigate = useNavigate();
    const imgSlider = useMemo(
        () => [
            tranding1,
            tranding2,
            tranding3,
            tranding4,
            tranding1,
            tranding1,
            tranding1,
            tranding1,
        ],
        []
    );

    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(4);
    const [datHalal, setDataHalal] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        setDataHalal(DataHalals);
        const handleResize = () => {
            if (window.innerWidth < 640) setVisible(1);
            else if (window.innerWidth < 1024) setVisible(2);
            else setVisible(4);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(imgSlider.length - visible, 0);

    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setIndex((i) => (i >= maxIndex ? 0 : i + 1));
        }, 4000);
    };

    useEffect(() => {
        resetInterval();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [maxIndex]);

    const prev = () => {
        setIndex((i) => Math.max(i - 1, 0));
        resetInterval();
    };

    const next = () => {
        setIndex((i) => Math.min(i + 1, maxIndex));
        resetInterval();
    };
    const goTo = (i) => {
        setIndex(i);
        resetInterval();
    };
    return (
        <div className="">
            <h1 className='font-medium text-2xl mt-4' >Tranding</h1>
            <div className="relative w-full mt-5">
                {/* slider */}
                <div className="overflow-hidden">
                    <div
                        className="flex gap-4 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${index * (100 / visible)}%)`,
                        }}
                    >
                        {imgSlider.map((img, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0"
                                style={{
                                    width: `calc(${100 / visible}% - 12px)`,
                                }}
                            >
                                <img
                                    src={img}
                                    alt={`slide-${i}`}
                                    className="w-full h-52 object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* buttons */}
                <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2  bg-gray-300 text-blue-500 p-2 rounded-full"
                >
                    ‹
                </button>

                <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 text-blue-500 text-white p-2 rounded-full"
                >
                    ›
                </button>
                <div className="flex justify-center gap-2 mt-3">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === i ? "bg-blue-500 w-6" : "bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* ------------------Explore Near You----------- */}
            <h1 className='text-xl font-medium'>All “Korean“ Store Near you</h1>
            <div className='items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-4 '>
                {
                    datHalal.map((item) => (
                        <Link to={`/product-detail/${item.id}`} key={item.id}>
                            <div className=' bg-gray-100 rounded-lg overflow-hidden gap-3 drop-shadow-[0_0_2px_rgba(0,0,0,0.2)]'>
                                <div className='imgs w-full relative'>
                                    <img className=' w-full max-h-[170px] m-auto' src={item.coverImage} alt="" />
                                    <div className="profal-vendor border-2 border-white w-[70px] h-[70px] overflow-hidden z-10 bg-red-300 rounded-full absolute items-center justify-center flex right-4.5 bottom-[-40px]">
                                        <img className="w-full h-auto" src={item.profileImage} alt="" />
                                    </div>
                                </div>
                                <div className='text-name mt-3 '>
                                    <h2 className='text-lg font-medium truncate' >{item.username}</h2>
                                    <div className='flex gap-2 mt-2 mb-3 items-start'>
                                        <div className='delivery w-full gap-1 flex'><FaMotorcycle className='text-xl' />${item.deliveryPrice}</div>
                                        <div className='delivery w-full gap-1 flex'><IoMdTime className='text-xl' />{item.estimatedTime} min</div>
                                        <div className='delivery w-full gap-1 flex'><IoLocationOutline className='text-xl' />{item.distance}km</div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    ))
                }




            </div>
        </div>
    );
}
export default Halal
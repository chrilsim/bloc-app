import React, { useMemo, useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { FaMotorcycle } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoMdTime } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import tranding1 from "../assets/tranding1.png"
import tranding2 from "../assets/tranding2.png"
import tranding3 from "../assets/tranding3.png"
import tranding4 from "../assets/tranding4.png"
import khmer from "../assets/icon/khmer.png"
import korean from "../assets/icon/korean.png"
import western from "../assets/icon/western.png"
import chinese from "../assets/icon/chinese.png"
import japanese from "../assets/icon/japanese.png"
import india from "../assets/icon/india.png"
import halal from "../assets/icon/halal.png"
import asia from "../assets/icon/asia.png"


const Food = () => {
    const navigate = useNavigate();

    return (
        <div>

            <div className="manu-scroll-bar">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2 ">

                    <div onClick={() => navigate('khmer')} className="flex flex-col py-2 items-center w-full bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md">
                        <img className="w-[80px]" src={khmer} alt="" />
                        <h2><NavLink
                            to="khmer"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-500 font-medium"
                                    : "text-gray-800"
                            }
                        >
                            Khmer
                        </NavLink></h2>
                    </div>
                    <div onClick={() => navigate('korean')} className="flex flex-col py-2 items-center w-full bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md">
                        <img className="w-[80px]" src={korean} alt="" />
                        <h2><NavLink
                            to="korean"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-500 font-medium"
                                    : "text-gray-800"
                            }
                        >
                            Korean
                        </NavLink></h2>
                    </div>
                    <div className="flex flex-col py-2 items-center w-full bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md">
                        <img className="w-[80px]" src={western} alt="" />
                        <h2>Western</h2>
                    </div>
                    <div className="flex flex-col py-2 items-center w-full bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md">
                        <img className="w-[80px]" src={chinese} alt="" />
                        <h2>Chinese</h2>
                    </div>
                    <div className="flex flex-col py-2 items-center w-full bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md">
                        <img className="w-[80px]" src={japanese} alt="" />
                        <h2>Japanese</h2>
                    </div>
                    <div className="flex flex-col py-2 items-center w-full bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md">
                        <img className="w-[80px]" src={india} alt="" />
                        <h2>India</h2>
                    </div>
                    <div className="flex flex-col py-2 items-center w-full bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md">
                        <img className="w-[80px]" src={asia} alt="" />
                        <h2>Asia</h2>
                    </div>
                    <div className="flex flex-col py-2 items-center w-full bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md">
                        <img className="w-[80px]" src={halal} alt="" />
                        <h2>Halal</h2>
                    </div>

                </div>
            </div>


            <Outlet />
        </div>
    );
}
export default Food
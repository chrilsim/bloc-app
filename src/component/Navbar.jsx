import react, { useState, useEffect } from 'react'
import logo from '../assets/logo.png';
import { useMemo } from 'react';
import { FiMenu } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import food from "../assets/icon/food.png";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { MdNavigateNext } from "react-icons/md";
import '../style/style.css';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import noitem from "../assets/noitem.png";

const Navbar = () => {

    const { cartItems, increaseQuantity, decreaseQuantity, removeItem, removeVendor, } = useContext(CartContext);

    const navigate = useNavigate();
    const [openMenu_Left, setOpenMenuLeft] = useState(false);
    const [openMenu_right, setOpenMenuRight] = useState(false);
    const [show, setShow] = useState(false);
    const [showLocationPopup, setShowLocationPopup] = useState(true);
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        const showNav = () => setShow(true);
        const hideNav = () => setShow(false);

        window.addEventListener("showMenuNav", showNav);
        window.addEventListener("hideMenuNav", hideNav);

        return () => {
            window.removeEventListener("showMenuNav", showNav);
            window.removeEventListener("hideMenuNav", hideNav);
        };
    }, []);

    const totalQuantity = cartItems.reduce(
        (total, vendor) =>
            total +
            vendor.items.reduce((sum, item) => sum + item.quantity, 0),
        0
    );
    const totalItems = cartItems.reduce(
        (total, vendor) => total + vendor.items.length,
        0
    );

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);

                setShowPopup(false);
            },
            (error) => {
                console.log(error);
            }
        );
    };
    return (
        <div className="sticky  w-full  top-0 z-50">
            {/* --------------menu left-------------- */}
            <div onClick={() => setOpenMenuLeft(false)}
                className={`fixed rlative inset-0 bg-black/40 z-50 transition-opacity duration-300 ${openMenu_Left ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div onClick={(e) => e.stopPropagation()} className={` h-full w-[320px] bg-white  transform transition-transform duration-300 ease-in-out ${openMenu_Left ? "translate-x-0" : "-translate-x-full"}`}  >
                    <button className='absolute right-2 cursor-pointer top-2' onClick={() => setOpenMenuLeft(false)}><IoMdClose className=' font-medium text-3xl' /></button>
                    <h2 className='font-medium text-lg border-b-2 border-gray-200 p-2'>Profal Manag</h2>
                    {/* ---------------profile--------------- */}
                    <div className="profile-user w-full p-2 flex gap-2 bg-gray-100">
                        <div className="profile-user-img w-[20%] ">
                            <img src="https://web.bloc.asia/_next/image?url=https%3A%2F%2Fd181tbps8cjyve.cloudfront.net%2Fdefault%2Fmember_face.png&w=1920&q=75" alt="" />
                        </div>
                        <div className="w-[80%] ">
                            <h2>User name</h2>
                            <h3>09876543</h3>
                        </div>
                    </div>

                    {/* -------------------menu---------------- */}
                    <h2 className='p-2 font-medium text-lg'>Menu</h2>
                    <div className="menu-left">
                        <ul>
                            <li> <img src={food} alt="" /> Food & Drink</li>
                            <li> <img src={food} alt="" /> Food & Drink</li>
                            <li> <img src={food} alt="" /> Food & Drink</li>
                        </ul>
                    </div>

                    {/* -------------------address order---------------- */}
                    <h2 className='p-2 font-medium text-lg'>Order & Address</h2>

                </div>
            </div>

            {/* --------------menu right cart-------------- */}
            <div onClick={() => setOpenMenuRight(false)} className={`fixed rlative items-end justify-end flex inset-0 bg-black/40 z-50 transition-opacity duration-300 ${openMenu_right ? "opacity-100 visible" : "opacity-0 invisible"}`}>

                <div onClick={(e) => e.stopPropagation()} className={` h-full w-[370px] bg-white overflow-y-auto  transform transition-transform duration-300 ease-in-out ${openMenu_right ? "translate-x-0" : "translate-x-full"}`}  >

                    <div className='sticky z-10 bg-white top-0 font-medium text-lg text-center border-b-2 border-gray-200 p-4'>
                        My Cart Summary
                        <button className='absolute left-2 cursor-pointer top-4' onClick={() => setOpenMenuRight(false)}><IoMdClose className=' font-medium text-3xl' /></button>
                    </div>
                    {
                        totalItems > 0 ? (
                            <div className="">
                                {cartItems.map((vendor) => (
                                    <div key={vendor.vendorId} className="mb-4">

                                        {/* ------------------- VENDOR ------------------- */}
                                        <div className="vendor-main px-2 py-1 bg-white flex gap-3 relative">

                                            <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-blue-200">
                                                <img src={vendor.profileImage} alt="" />
                                            </div>

                                            <div className="w-[65%]  flex items-center justify-state">
                                                <h2 className="font-medium text-lg truncate ">
                                                    {vendor.username}
                                                </h2>

                                                <MdDelete onClick={() => removeVendor(vendor.vendorId)} className="text-2xl text-red-500 cursor-pointer absolute right-2" />
                                            </div>
                                        </div>

                                        {/* ------------------- ITEMS ------------------- */}

                                        {vendor.items.map((item) => (
                                            <div key={item.id} className="items-cart flex relative hover:bg-gray-100 bg-white p-2 gap-3 border-gray-200">

                                                <div className="w-[80px] h-[80px] rounded-md overflow-hidden border border-blue-400">
                                                    <img src={item.image} alt="" />
                                                </div>

                                                <div className="flex flex-col w-[65%]  ">
                                                    <h2 className="font-medium text-lg truncate">
                                                        {item.name}
                                                    </h2>

                                                    <h2 className="font-medium text-md mt-5">
                                                        <span className="text-red-500">
                                                            ${item.price}
                                                        </span> /Unit
                                                    </h2>
                                                </div>

                                                {/* ---------------- quantity ---------------- */}
                                                <div className="increment-degriment absolute flex gap-2 right-3 bottom-3 items-center justify-center bg-white">

                                                    <div onClick={() =>
                                                        decreaseQuantity(vendor.vendorId, item.id)
                                                    } className="p-[6px] bg-blue-500 rounded-full cursor-pointer">
                                                        <FiMinus className="text-white" />
                                                    </div>

                                                    <p className="font-medium">
                                                        {item.quantity}
                                                    </p>

                                                    <div onClick={() =>
                                                        increaseQuantity(vendor.vendorId, item.id)
                                                    } className="p-[6px] bg-blue-500 rounded-full cursor-pointer">
                                                        <FaPlus className="text-white" />
                                                    </div>

                                                </div>
                                            </div>
                                        ))}

                                        {/* ------------------- CHECKOUT ------------------- */}
                                        <div className="p-4">

                                            <button className="cursor-pointer p-3 bg-blue-500 text-white flex justify-between rounded-full w-full">


                                                <div className="w-[30px] h-[30px] bg-white text-blue-500 flex items-center justify-center rounded-full">
                                                    {vendor.items.reduce((sum, i) => sum + i.quantity, 0)}
                                                </div>

                                                <span className="text-lg">
                                                    Checkout. ${vendor.items
                                                        .reduce((sum, i) => sum + i.quantity * i.price, 0)
                                                        .toFixed(2)}
                                                </span>

                                                <MdNavigateNext className="text-3xl" />

                                            </button>

                                        </div>

                                    </div>
                                ))}

                            </div>
                        ) : (
                            <img src={noitem} alt="" />
                        )
                    }

                </div>
            </div>

            {/* -------------nav bar--------------- */}
            <nav className=" border-b-1 border-gray-200 bg-white py-3 px-0 w-full stiky top-0 left-0 shadow-[0_5px_5px_-2px_rgba(209,209,209,0.5)] z-50">
                <div className=" max-w-[1500px] mx-auto flex px-3  lg:flex-row items-center justify-between gap-3">

                    {/* Logo */}
                    <div className="logo-menu flex items-center gap-4 w-full justify-start lg:w-auto justify-between lg:justify-start">
                        <FiMenu onClick={() => setOpenMenuLeft(true)} className="w-[30px] h-[30px] cursor-pointer" />
                        <img onClick={() => navigate('/')}
                            className="h-[28px] w-auto cursor-pointer"
                            src={logo}
                            alt="Logo"

                        />
                    </div>

                    {/* Search Section */}
                    <div className="search-location-cart flex items-center gap-3 w-full lg:w-auto justify-end">

                        {/* Location */}
                        <button onClick={() => setShowPopup(true)} className="bg-gray-100 cursor-pointer rounded-full p-3 flex items-center justify-center md:px-4">
                            <FaLocationDot className="w-5 h-5" />

                            <span className="hidden md:inline ml-2 max-w-[100px] lg:max-w-[200px] truncate">
                                Can not get current location
                            </span>
                        </button>

                        {/* Search */}

                        <div  onClick={()=>navigate('search')} className="flex items-center">
                            <button className="sm:hidden bg-gray-100 p-3 rounded-full">
                                <IoMdSearch className="cursor-pointer w-5 h-5" />
                            </button>
                            <div className="hidden cursor-pointer sm:block relative w-[200px] md:w-[300px] lg:w-[450px]">
                                <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

                                <input
                                    className="w-full bg-gray-100 p-3 pl-10 rounded-full outline-none"
                                    type="search"
                                    placeholder="Search"
                                />
                            </div>

                        </div>
                        {/* <div className=" z-100search-allProduct absolute top-[70px] left-0 w-screen h-[calc(100vh-70px)] bg-white">
                            <div className="diplay-allProduct p-2 m-auto max-w-[1500px] bg-red-400">
                                <div className="flex items-center">
                                    <button className="sm:hidden bg-gray-100 p-3 rounded-full">
                                        <IoMdSearch className="cursor-pointer w-5 h-5" />
                                    </button>
                                    <div className=" cursor-pointer sm:block relative w-[200px] md:w-[300px] lg:w-[450px]">
                                        <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

                                        <input
                                            className="w-full bg-gray-100 p-3 pl-10 rounded-full outline-none"
                                            type="search"
                                            placeholder="Search"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div> */}


                        {/* Cart */}
                        <button onClick={() => setOpenMenuRight(true)} className={`flex items-center gap-2 py-3 px-4 cursor-pointer hover:bg-blue-600 rounded-full whitespace-nowrap ${totalItems > 0 ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
                            <FaCartArrowDown className="w-[24px] h-[24px]" />
                            <span className="hidden sm:inline">Cart</span><p>{totalItems}</p>
                        </button>

                    </div>
                </div>
                {showPopup && (
                    <div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                        onClick={() => setShowPopup(false)}
                    >
                        <div
                            className="bg-white w-[400px] rounded-xl p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-bold mb-2">
                                Choose Location
                            </h2>

                            <p className="text-gray-500 mb-5">
                                Allow access to your current location.
                            </p>

                            <button
                                onClick={getCurrentLocation}
                                className="w-full bg-blue-500 text-white py-3 rounded-lg"
                            >
                                Use Current Location
                            </button>

                            <button
                                onClick={() => setShowPopup(false)}
                                className="w-full mt-3 border py-3 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </nav>
            {/* -------------menu left------------ */}

            <div
                className={`sticky top-0 left-0 z-40 w-full bg-white shadow-[0_5px_5px_-2px_rgba(209,209,209,0.5)] transition-all duration-300 ease-in-out transform ${show
                    ? "translate-x-0 opacity-100  h-auto "
                    : "-translate-x-full opacity-0 h-0 overflow-hidden"
                    }`}
            >
                <div className="manu-nav-diplay max-w-[1500px] m-auto">
                    <ul className='flex'>
                        <li onClick={() => navigate('/food/khmer')} className='bg-white hover:bg-gray-100 py-2 cursor-pointer rounded-sm px-4 flex items-center gap-2' > <img className='w-[30px]' src={food} alt="" /> Food</li>
                        <li className='bg-white hover:bg-gray-100 py-2 cursor-pointer rounded-sm px-4 flex items-center gap-2' > <img className='w-[30px]' src={food} alt="" /> Mart</li>
                        <li className='bg-white hover:bg-gray-100 py-2 cursor-pointer rounded-sm px-4 flex items-center gap-2' > <img className='w-[30px]' src={food} alt="" /> Mall</li>
                    </ul>
                </div>
            </div>

        </div>

    )
}

export default Navbar

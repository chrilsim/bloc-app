import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import '../style/style.css';
import { useParams } from "react-router-dom";
import data from "../data/data.js";
import { IoArrowBackOutline } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DataKhmer } from "../data/DataKhmer.js"
import { AllData } from "../data/AllData.js"

const Product_Detail = () => {

    const {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity
    } = useContext(CartContext);


    const { id } = useParams();

    const product = AllData.find(
        (item) => String(item.id) === id
    );


    const [selectedItem, setSelectedItem] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [search, setSearch] = useState("");




    const filteredItems = product.items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    if (!product) {
        return <h1>Product Not Found</h1>;
    }
    const showToast = () => {
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
        }, 1500);
    };
    return (
        <div>

            <div className="vender-img-text m-auto  gap-2 p-3 max-w-4xl grid grid-cols-1 sm:grid-cols-2">
                <div className="main-img w-[100%]  relative ">
                    <img className="rounded-xl" src={product.coverImage} alt="" />
                    <div className="profal-vendor border-2 border-white w-[80px] h-[80px] overflow-hidden z-10 bg-red-300 rounded-full absolute items-center justify-center flex right-4.5 bottom-[-40px]">
                        <img className="w-full h-auto" src={product.profileImage} alt="" />
                    </div>
                </div>
                <div className="text-name col-span-2  sm:col-span-1 items-start flex flex-col justify-center w-[100%] p-2 gap-1">
                    <h1 className=" font-medium lg:text-3xl w-full mb-3 sm:text-xl ">{product.username}</h1>
                    <div className="start flex items-center gap-2"> <FaStar className="text-lg text-blue-600" />{product.rating}</div>
                    <div className='flex gap-2 mt-2 mb-3 items-start'>
                        <div className='delivery  gap-1 flex'><FaMotorcycle className='text-xl' />${product.deliveryPrice}.0 |</div>
                        <div className='delivery  gap-1 flex'><IoMdTime className='text-xl' />{product.estimatedTime} min |</div>
                        <div className='delivery  gap-1 flex'><IoLocationOutline className='text-xl' />{product.distance}km</div>
                    </div>
                    <h2>{product.promotion}</h2>
                </div>
                <div className="search-info-favorite-vendor p-1 col-span-2 mt-8 flex gap-3">
                    <div className=" relative w-[200px] md:w-[300px] lg:w-[450px]">
                        <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            className="w-full bg-gray-100 p-3 pl-10 rounded-full outline-none"
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                        />
                    </div>
                    <button onClick={() => setShowInfo(true)} className="px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 flex items-center gap-2" ><IoIosInformationCircleOutline className="text-xl" /> <p className="hidden sm:block">shop info</p></button>
                    <button className="px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 flex items-center gap-2" ><CiShare2 className="text-xl" /> <p className="hidden sm:block" > Share</p> </button>
                    <button className="px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 flex items-center gap-2" ><MdFavoriteBorder className="text-xl" />  <p className="hidden sm:block" >Favorite</p> </button>

                </div>
            </div>

            {/* -----------items-menu-------------- */}
            <div className="nav-manu w-fuul p-2 overflow-x-auto scrollbar-none border-gray-200 border-b-2 mb-4 ">
                <ul className="flex gap-1 whitespace-nowrap">
                    <li className="font-medium px-4 py-2 m-0 cursor-pointer hover:text-blue-400 active:text-blue-500">All Product</li>
                    <li className="font-medium px-4 py-2 m-0 cursor-pointer hover:text-blue-400 active:text-blue-500">coca cola</li>
                    <li className="font-medium px-4 py-2 m-0 cursor-pointer hover:text-blue-400 active:text-blue-500">All Product</li>
                    <li className="font-medium px-4 py-2 m-0 cursor-pointer hover:text-blue-400 active:text-blue-500">All Product</li>
                    <li className="font-medium px-4 py-2 m-0 cursor-pointer hover:text-blue-400 active:text-blue-500">All Product</li>
                </ul>

            </div>

            {/* -----------items------------- */}

            <div className="itm-vender grid grid-cols-1 gap-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
                {filteredItems.length === 0 ? (
                    <p className="absolute text-center text-gray-500 m-auto text-2xl mt-5 left-[50%]">
                        No items found.
                    </p>
                ) : (
                    filteredItems.map((p) => {
                        const vendorCart = cartItems.find(
                            (v) => v.vendorId === product.id
                        );

                        const cartItem = vendorCart?.items.find(
                            (i) => i.id === p.id
                        );

                        const count = cartItem?.quantity || 0;

                        return (
                            <div
                                key={p.id}
                                onClick={() => setSelectedItem(p)}
                                className="items relative p-2 bg-gray-100 flex gap-3 cursor-pointer rounded-sm overflow-hidden hover:bg-gray-200"
                            >
                                <div className="items-img w-[100px] rounded-sm overflow-hidden">
                                    <img src={p.image} alt={p.name} />
                                </div>

                                <div className="name-items-text justify-between flex flex-col">
                                    <h2 className="font-medium">{p.name}</h2>

                                    <h3>
                                        <span className="font-medium text-red-500">
                                            ${p.price}
                                        </span>
                                        /Bowl
                                    </h3>

                                    <div className="increment-degriment absolute flex gap-2 right-3 bottom-3 items-center justify-center bg-white">
                                        {count > 0 && (
                                            <>
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        decreaseQuantity(product.id, p.id);
                                                    }}
                                                    className="p-[6px] cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-full"
                                                >
                                                    <FiMinus className="text-white text-lg" />
                                                </div>

                                                <p className="font-medium">{count}</p>
                                            </>
                                        )}

                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                if (cartItem) {
                                                    increaseQuantity(product.id, p.id);
                                                    
                                                } else {
                                                    addToCart(product, p, 1);
                                                }
                                            }}
                                            className="p-[6px]  cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-full" > <FaPlus className="text-white text-lg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    ))}

            </div>


            {/* --------popup item----------- */}
            {selectedItem && (() => {

                const vendorCart = cartItems.find(
                    (v) => v.vendorId === product.id
                );

                const cartItem = vendorCart?.items.find(
                    (i) => i.id === selectedItem.id
                );

                const count = cartItem?.quantity || 0;

                return (
                    <div
                        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-2"
                        onClick={() => setSelectedItem(null)}
                    >
                        <div
                            className="bg-white rounded-xl w-full max-w-4xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-4">
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="text-2xl bg-gray-100 p-2 rounded-full"
                                >
                                    <IoArrowBackOutline />
                                </button>

                                <button>Share</button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 px-4">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {selectedItem.name}
                                    </h2>

                                    <h3 className="text-xl font-semibold mt-2">
                                        ${selectedItem.price}
                                    </h3>

                                    <p className="mt-5 text-gray-600">
                                        {selectedItem.description}
                                    </p>
                                </div>

                                <div className="flex justify-center">
                                    <img
                                        src={selectedItem.image}
                                        className="w-full max-w-[350px]"
                                        alt=""
                                    />
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="border-t mt-4 p-4 flex items-center justify-between">

                                {/* QTY CONTROL */}
                                <div className="increment-degriment  flex gap-2 right-3 bottom-3 items-center justify-center bg-white">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(product.id, selectedItem.id)
                                        }
                                        className="p-2 bg-blue-500 rounded-full"
                                    >
                                        <FiMinus className="text-white" />
                                    </button>

                                    <span className="font-semibold text-lg">
                                        {count || 1}
                                    </span>

                                    <button
                                        onClick={() => {
                                            if (cartItem) {
                                                increaseQuantity(product.id, selectedItem.id);
                                            } else {
                                                addToCart(product, selectedItem, 1);
                                            }
                                        }}
                                        className="p-2 bg-blue-500 rounded-full"
                                    >
                                        <FaPlus className="text-white" />
                                    </button>

                                </div>

                                <button
                                    onClick={() => {
                                        if (cartItem) {
                                            increaseQuantity(product.id, selectedItem.id);
                                        } else {
                                            addToCart(product, selectedItem, 1);
                                        }

                                        showToast();
                                        setSelectedItem(null);
                                    }}
                                    className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full font-medium"
                                >
                                    Add to Cart • $
                                    {(
                                        selectedItem.price * (count || 1)
                                    ).toFixed(2)}
                                </button>

                            </div>
                        </div>
                    </div>
                );
            })()}
            {showSuccess && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                        ✅ Added to cart successfully!
                    </div>
                </div>
            )}
            {/* --------popup info----------- */}
            {showInfo && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowInfo(false)}
                >
                    <div
                        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <img
                                src={product.coverImage}
                                alt=""
                                className="w-full h-48 object-cover"
                            />

                            <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                                <img
                                    src={product.profileImage}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="pt-12 p-6">
                            <h2 className="text-2xl font-bold">
                                {product.username}
                            </h2>

                            <div className="flex items-center gap-4 mt-3 text-gray-600">
                                <span>⭐ {product.rating}</span>
                                <span>🚚 ${product.deliveryPrice}</span>
                                <span>🕒 {product.estimatedTime} min</span>
                            </div>

                            <div className="mt-5 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Distance
                                    </span>
                                    <span>{product.distance} km</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Promotion
                                    </span>
                                    <span className="text-blue-500">
                                        {product.promotion}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Opening Hours
                                    </span>
                                    <span>08:00 AM - 10:00 PM</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Contact
                                    </span>
                                    <span>+855 12 345 678</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-semibold mb-2">
                                    About Shop
                                </h3>

                                <p className="text-gray-600 text-sm leading-6">
                                    Welcome to {product.username}. We provide
                                    quality food and fast delivery service to
                                    customers. Enjoy your favorite meals with
                                    the best promotions available every day.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowInfo(false)}
                                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Product_Detail
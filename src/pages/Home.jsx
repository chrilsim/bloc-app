import React, { useMemo, useState, useEffect, useRef } from 'react'
import { FaMotorcycle } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import slider1 from "../assets/slider1.png"
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";
import datas from "../data/data.js";
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const imgSlider = useMemo(() => [slider1, slider2, slider3], [])
  const [slider, setSlider] = useState(0);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setSlider((s) => (s - 1 + imgSlider.length) % imgSlider.length)
    }
    if (e.key === 'ArrowRight') {
      setSlider((s) => (s + 1) % imgSlider.length)
    }
  }

  useEffect(() => {
    setData(datas);

    const interval = setInterval(() => {
      setSlider((s) => (s + 1) % imgSlider.length)
    }, 4000);



    const handleScroll = () => {
      if (!menuRef.current) return;

      const menuBottom =
        menuRef.current.offsetTop + menuRef.current.offsetHeight;

      if (window.scrollY > menuBottom) {
        window.dispatchEvent(new CustomEvent("showMenuNav"));
      } else {
        window.dispatchEvent(new CustomEvent("hideMenuNav"));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => clearInterval(interval);
    window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='w-full bg-white overflow-hidden ' tabIndex={0} onKeyDown={handleKeyDown}>

      <div className=' slider w-full  bg-gray-300'>
        <div className="relative  mx-auto overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${slider * 100}%)` }}>
            {imgSlider.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`slide-${index}`}
                className="w-full h-64 object-cover w-[100%] h-[100%] flex-shrink-0"
              />
            ))}
          </div>

          <button
            onClick={() =>
              setSlider((s) => (s - 1 + imgSlider.length) % imgSlider.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-full shadow">
            ❮
          </button>

          <button
            onClick={() => setSlider((s) => (s + 1) % imgSlider.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-full shadow">
            ❯
          </button>
        </div>

      </div>
      <div className='menu  grid   sm:grid-cols-2 md:grid-cols-3 gap-4 flex mt-4 py-3'>
        <div ref={menuRef} onClick={() => navigate('/food/khmer')} className=' overflow-hidden relative p-3 cursor-pointer hover:bg-gray-100 bg-white drop-shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-lg w-full h-[120px] lg:h-[170px] sm:h-[150px] '>
          <h1 className='text-md sm:text-lg font-medium'>Food & Drink</h1>
          <h2 className='text-gray-400 text-sm'>Fresh & Fast</h2>
          <button className='text-sm absolute  bottom-3 py-2 cursor-pointer hover:bg-blue-600  px-4 bg-blue-500 text-white rounded-3xl'>Order Now</button>
          <img className='w-[80px] sm:w-[100px] xl:w-[150px] md:w-[120px]  md:w-[100px] absolute right-[-5px] bottom-[-5px]' src="https://web.bloc.asia/_next/image?url=https%3A%2F%2Fd181tbps8cjyve.cloudfront.net%2Fphoto%2F202110%2F20211022_EC3A333C4AFF712950956B750F823CAB.png&w=256&q=75" alt="" />
        </div>
        <div onClick={() => navigate('/mart')} className='overflow-hidden relative p-3 cursor-pointer hover:bg-gray-100  bg-white drop-shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-lg w-full h-[120px] lg:h-[170px] sm:h-[150px]'>
          <h1 className='text-ms sm:text-lg font-medium'>Food & Drink</h1>
          <h2 className='text-gray-400 text-sm'>Fresh & Fast</h2>
          <button className='text-sm absolute  bottom-3 py-2  px-4 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-3xl'>Order Now</button>
          <img className='w-[80px] sm:w-[100px] xl:w-[150px] md:w-[120px]  md:w-[100px] absolute right-[-5px] bottom-[-5px]' src="https://web.bloc.asia/_next/image?url=https%3A%2F%2Fd181tbps8cjyve.cloudfront.net%2Fphoto%2F202110%2F20211022_2EF764BD8FB3475A29A4D4BFC2114D8E.png&w=256&q=75" alt="" />
        </div>
        <div onClick={() => navigate('/mall')} className=' overflow-hidden relative p-3  hover:bg-gray-100 cursor-pointer bg-white drop-shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-lg w-full  col-span-2 md:col-span-1 sm:col-span-2 h-[120px] lg:h-[170px] sm:h-[150px]'>
          <h1 className=' text-ms font-medium sm:text-lg'>Food & Drink</h1>
          <h2 className='text-gray-400 text-sm '>Fresh & Fast</h2>
          <button className='text-sm absolute  bottom-3 py-2  px-4 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-3xl'>Order Now</button>
          <img className='w-[80px] sm:w-[100px] xl:w-[150px] md:w-[120px]  md:w-[100px] absolute right-[-5px] bottom-[-5px]' src="https://web.bloc.asia/_next/image?url=https%3A%2F%2Fd181tbps8cjyve.cloudfront.net%2Fphoto%2F202110%2F20211022_2E2AC4D5E69A215E4C82BEDD33AB1931.png&w=256&q=75" alt="" />
        </div>
      </div>

      {/* ------------------Explore Near You----------- */}
      <h1 className='text-xl font-medium'>Explore Near You</h1>
      <div className='items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-4 '>
        {
          data.map((item) => (
            <Link to={`/product-detail/${item.id}`} key={item.id}>
              <div  className=' bg-gray-100 rounded-lg overflow-hidden gap-3 drop-shadow-[0_0_2px_rgba(0,0,0,0.2)]'>
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

  )
}

export default Home
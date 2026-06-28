import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaGithub,
} from "react-icons/fa";
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">


        <div>
          <h2 className="text-3xl font-bold text-white">
            <img className="max-w-[100px]" src={logo} alt="" />
          </h2>

          <p className="mt-4 text-sm leading-6">
            Buy and sell products easily with trusted local vendors.
            Discover fashion, electronics, food, beauty, and more.
          </p>

          <div className="flex gap-4 mt-6 text-xl">
            <a href="#" className="hover:text-orange-500">
              <FaFacebookF />
            </a>

            <a href="#" className="hover:text-orange-500">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-orange-500">
              <FaTelegramPlane />
            </a>

            <a href="#" className="hover:text-orange-500">
              <FaGithub />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Marketplace
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-orange-500">
                All Products
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-orange-500">
                Categories
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-orange-500">
                Top Vendors
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-orange-500">
                New Arrivals
              </a>
            </li>
          </ul>
        </div>


        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Support
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-orange-500">
                Help Center
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-orange-500">
                Contact Us
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-orange-500">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-orange-500">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-sm">
            <p>📍 Phnom Penh, Cambodia</p>
            <p>📧 support@blocapp.com</p>
            <p>📞 +855 12 345 678</p>

            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition">
              Become a Seller
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm">

          <p>
            © {new Date().getFullYear()} Bloc App. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-orange-500">
              Privacy
            </a>

            <a href="#" className="hover:text-orange-500">
              Terms
            </a>

            <a href="#" className="hover:text-orange-500">
              Cookies
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
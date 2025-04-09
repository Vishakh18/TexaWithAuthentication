import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContent.jsx";
import { FiSun } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
function Navbar() {
  const nevigate = useNavigate();
  const { userData, backendurl, setUserData, setIsLoggedin, theme, setTheme } =
    useContext(AppContent);
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendurl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        nevigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendurl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      nevigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex w-full justify-between items-center  px-5  absolute top-0">
      <img src={assets.logo} className="  w-32 mt-3"></img>
      {userData ? (
        <div className="flex space-x-10">
          <button
            onClick={() => {
              setTheme(!theme);
            }}
            className="cursor-pointer"
          >
            {theme ? <FaMoon /> : <FaSun className="text-white"></FaSun>}
          </button>
          <div className="w-8 h-8 flex justify-center items-center rounded-full text-white bg-gray-700 relative group  ">
            {userData.name[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 textblack  pt-10">
              <ul className="list-none m-0 p-2 bg-gray-800 text-sm rounded-md">
                {!userData.isAccountVerified && (
                  <li
                    className="py-1 px-2 hover:bg-gray-600 cursor-pointer"
                    onClick={sendVerificationOtp}
                  >
                    Verify Email
                  </li>
                )}

                <li
                  className="py-1 px-2 pr-10 hover:bg-gray-600 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-10">
          <button
            onClick={() => {
              setTheme(!theme);
            }}
            className="cursor-pointer"
          >
            {theme ? <FaMoon /> : <FaSun className="text-white"></FaSun>}
          </button>
          <button
            onClick={() => nevigate("/login")}
            className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-500 dark:hover:text-white dark:hover:bg-purple-500 flex  hover:cursor-pointer  transition-all duration-200"
          >
            Login
            <img src={assets.arrow_icon} className="text-white ml-2"></img>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;

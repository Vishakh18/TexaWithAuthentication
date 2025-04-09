import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const { userData, isLoggedin, theme } = useContext(AppContent);
  const nevigate = useNavigate();
  return (
    <div className=" flex flex-col justify-center items-center space-y-2 p-10 ">
      <img
        src={assets.header_img}
        className={`rounded-full lg:w-28 lg:h-28 w-16 h-16 ${
          theme ? "" : "bg-white"
        } `}
      ></img>
      <h1
        className={`text-2xl font-semibold font-sans ${
          theme ? "text-gray-800 flex" : "text-white"
        } `}
      >
        Hello, {userData ? userData.name : "User!"}
      </h1>
      <h2 className="font-bold text-center w-full bg-gradient-to-r text-transparent bg-clip-text from-sky-500 to-purple-500 text-2xl">
        Welcome to the Authentication portal
      </h2>
      <p
        className={`${
          theme ? "text-gray-800" : "text-white"
        } w-full text-center `}
      >
        TEXA AI Model(AI text generator), Sign Up or Login to begin your journey
        with us.
      </p>
      <button
        class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-600 to-purple-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-whitemt-3 cursor-pointer"
        onClick={() => {
          if (isLoggedin) {
            nevigate("/get-text");
          } else {
            toast.error("Please Log-in");
          }
        }}
      >
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
          Get Started
        </span>
      </button>
    </div>
  );
}

export default Header;

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContent.jsx";

import { FaMoon, FaSun } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";
import { IoLanguage, IoLanguageSharp } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
function Navbar() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const nevigate = useNavigate();

  const {
    userData,
    backendurl,
    setUserData,
    setIsLoggedin,
    theme,
    setTheme,
    setLanguage,
  } = useContext(AppContent);

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  function handleLanguageChange(e) {
    setLanguage(e);
    i18n.changeLanguage(e);
  }

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
    <div className="flex w-full justify-between items-center px-5 absolute top-0">
      <img src={assets.logo} className="w-32 mt-3" alt="logo" />

      {userData ? (
        <div className="flex space-x-10">
          <div className="relative">
            <Tooltip title="Language" placement="top-start">
              {" "}
              <IoLanguageSharp
                onClick={() => setIsLangMenuOpen((prev) => !prev)}
                className={`text-2xl mt-1.5 cursor-pointer ${
                  theme
                    ? ""
                    : "text-white hover:scale-115 transition-transform duration-100 rounded-full"
                }`}
              />
            </Tooltip>

            {isLangMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-32 text-white bg-slate-800 rounded shadow-md z-10">
                <div
                  onClick={() => {
                    handleLanguageChange("en");
                    setIsLangMenuOpen(false);
                  }}
                  className="p-2 hover:bg-slate-500 cursor-pointer"
                >
                  English
                </div>
                <div
                  onClick={() => {
                    handleLanguageChange("hi");
                    setIsLangMenuOpen(false);
                  }}
                  className="p-2 hover:bg-slate-500 cursor-pointer"
                >
                  हिंदी
                </div>
                <div
                  onClick={() => {
                    handleLanguageChange("es");
                    setIsLangMenuOpen(false);
                  }}
                  className="p-2 hover:bg-slate-500 cursor-pointer"
                >
                  Spanish
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 hover:scale-115 duration-100">
            <Tooltip title="Theme" placement="top-start">
              {" "}
              <button
                onClick={() => {
                  setTheme(!theme);
                }}
                className="cursor-pointer"
              >
                {theme ? <FaMoon /> : <FaSun className="text-white" />}
              </button>
            </Tooltip>
          </div>

          <div className="w-8 h-8 flex justify-center items-center rounded-full text-white bg-gray-700 relative group">
            {userData.name[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 textblack pt-10">
              <ul className="list-none m-0 p-2 bg-gray-800 text-sm rounded-md w-max">
                {!userData.isAccountVerified && (
                  <li
                    className="py-1 px-2 hover:bg-gray-600 cursor-pointer"
                    onClick={sendVerificationOtp}
                  >
                    {t("verify_email")}
                  </li>
                )}
                <li
                  className="py-1 px-2 pr-10 hover:bg-gray-600 cursor-pointer"
                  onClick={logout}
                >
                  {t("logout")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-10">
          <div className="relative">
            <Tooltip title="Language" placement="bottom-end">
              {" "}
              <IoLanguage
                onClick={() => setIsLangMenuOpen((prev) => !prev)}
                className={`text-2xl mt-1.5 cursor-pointer ${
                  theme
                    ? ""
                    : "text-white hover:scale-115 transition-transform duration-100 rounded-full"
                }`}
              />
            </Tooltip>
            {isLangMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-32 text-white bg-slate-800 rounded shadow-md z-10">
                <div
                  onClick={() => {
                    handleLanguageChange("en");
                    setIsLangMenuOpen(false);
                  }}
                  className="p-2 hover:bg-slate-500 cursor-pointer"
                >
                  English
                </div>
                <div
                  onClick={() => {
                    handleLanguageChange("hi");
                    setIsLangMenuOpen(false);
                  }}
                  className="p-2 hover:bg-slate-500 cursor-pointer"
                >
                  हिंदी
                </div>
                <div
                  onClick={() => {
                    handleLanguageChange("es");
                    setIsLangMenuOpen(false);
                  }}
                  className="p-2 hover:bg-slate-500 cursor-pointer"
                >
                  Spanish
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 hover:scale-115 duration-100">
            <Tooltip title="Theme" placement="bottom-end">
              {" "}
              <button
                onClick={() => {
                  setTheme(!theme);
                }}
                className="cursor-pointer"
              >
                {theme ? <FaMoon /> : <FaSun className="text-white" />}
              </button>
            </Tooltip>
          </div>

          <button
            onClick={() => nevigate("/login")}
            className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-500 dark:hover:text-white dark:hover:bg-purple-500 flex hover:cursor-pointer transition-all duration-200"
          >
            Login
            <img src={assets.arrow_icon} className="text-white ml-2" alt="→" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;

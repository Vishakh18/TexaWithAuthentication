import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import OtpInput from "react-otp-input";
import axios from "axios";
import { AppContent } from "../context/AppContent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
function EmailVerify() {
  const nevigate = useNavigate();
  const { backendurl, isLoggedin, userData, getUserData, theme, setTheme } =
    useContext(AppContent);
  axios.defaults.withCredentials = true;
  const [otp, setOtp] = useState();
  const onSubmittHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        backendurl + "/api/auth/verify-account",
        { otp }
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        nevigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && nevigate("/");
  }, [isLoggedin, userData]);
  return (
    <div
      className={`flex justify-center items-center  min-h-screen ${
        theme
          ? "bg-gradient-to-br from-blue-300 to-purple-200"
          : "bg-gradient-to-br from-slate-950 to-slate-900"
      } `}
    >
      <img
        src={assets.logo}
        className="absolute left-5  top-5 w-32 cursor-pointer"
        onClick={() => nevigate("/")}
      ></img>
      <div className="absolute top-10 right-10">
        <button
          onClick={() => {
            setTheme(!theme);
          }}
          className="cursor-pointer"
        >
          {theme ? <FaMoon /> : <FaSun className="text-white"></FaSun>}
        </button>
      </div>
      <form
        className={`${
          theme ? "bg-slate-900" : "bg-gray-300"
        } p-10 m-5 rounded-lg space-y-6 flex flex-col lg:w-fit md:w-fit w-[23rem] justify-center items-center`}
        onClick={onSubmittHandler}
      >
        <h1
          className={`${
            theme ? "text-white" : "text-black"
          } text-2xl font-semibold text-center mb-4`}
        >
          Email Verification Otp
        </h1>
        <p
          className={`text-center mb-6 ${
            theme ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          Enter 6-Digit code sent to your email id.
        </p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          otpType="number"
          shouldAutoFocus
          separator={<span style={{ width: "8px" }}></span>}
          inputStyle={{
            backgroundColor: `${theme ? "#E0E0E0" : "#0d0629"}`,
            border: `${theme ? "1px solid black" : "1px solid #0080ff"}`,
            borderRadius: "8px",
            width: "54px",
            height: "54px",
            fontSize: "20px",
            color: "#0080FF",
            fontWeight: "600",
            caretColor: "blue",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "3px",
          }}
          focusStyle={{
            border: "1px solid #CFD3DB",
          }}
          renderInput={(props) => <input {...props} />}
        />
        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white cursor-pointer">
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default EmailVerify;

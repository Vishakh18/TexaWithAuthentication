import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { AppContent } from "../context/AppContent";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";
function ResetPassword() {
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [isemail, setIsemail] = useState("");
  const [isotpsent, setIsotpsent] = useState(false);
  const nevigate = useNavigate();
  const { backendurl, theme, setTheme } = useContext(AppContent);
  const [showpassword, setShowpassword] = useState(false);
  axios.defaults.withCredentials = true;
  const onsubmitemail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendurl + "/api/auth/send-reset-otp",
        {
          email,
        }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsemail(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onsubmitotp = async (e) => {
    e.preventDefault();
    setIsotpsent(true);
  };

  const onNewpassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendurl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && nevigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div
        className={`flex justify-center items-center min-h-screen   bg-gradient-to-br ${
          theme
            ? " from-blue-300 to-purple-200"
            : " from-slate-950 to-slate-900"
        }`}
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

        {!isemail && (
          <form
            className={`${
              theme ? "bg-slate-700" : "bg-gray-300"
            } p-8 rounded-lg space-y-6 w-96 m-3`}
            onSubmit={onsubmitemail}
          >
            <h1
              className={`${
                theme ? "text-white" : "text-black"
              } text-2xl font-semibold text-center mb-4`}
            >
              Reset Password!
            </h1>
            <p
              className={`text-center mb-6 ${
                theme ? " text-indigo-300" : "text-indigo-500"
              }`}
            >
              Enter your registered Email address.
            </p>
            <div
              className={`flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full ${
                theme ? "bg-gray-500" : "bg-gray-900"
              }  text-white`}
            >
              <img src={assets.mail_icon}></img>
              <input
                type="email"
                placeholder="Email id"
                className="bg-transparent outline-none w-full decoration-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              className={`${
                theme
                  ? "text-black from-indigo-400 to-indigo-700"
                  : "text-white from-indigo-950 to-indigo-800"
              } rounded-full bg-gradient-to-r w-full  py-2.5 font-medium  cursor-pointer`}
            >
              Send Otp!
            </button>
          </form>
        )}

        {!isotpsent && isemail && (
          <form
            className={`${
              theme ? "bg-slate-700" : "bg-gray-300"
            } p-10 m-5 rounded-lg space-y-6 flex flex-col lg:w-fit md:w-fit w-[23rem] justify-center items-center`}
            onSubmit={onsubmitotp}
          >
            <h1
              className={`${
                theme ? "text-white" : "text-black"
              } text-2xl font-semibold text-center mb-4`}
            >
              Reset Password Otp
            </h1>
            <p
              className={`text-center mb-6 ${
                theme ? " text-indigo-300" : "text-indigo-500"
              }`}
            >
              Enter 6-Digit code sent to your email id.
            </p>
            <OtpInput
              value={otp}
              numInputs={6}
              onChange={setOtp}
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
            <button
              className={`${
                theme
                  ? "text-black from-indigo-400 to-indigo-700"
                  : "text-white from-indigo-950 to-indigo-800"
              } rounded-full bg-gradient-to-r w-full  py-2.5 font-medium  cursor-pointer`}
            >
              Submit
            </button>
          </form>
        )}

        {isotpsent && isemail && (
          <form
            className={`${
              theme ? "bg-slate-700" : "bg-gray-300"
            } p-10 m-5 rounded-lg space-y-6 flex flex-col lg:w-fit md:w-fit w-[23rem] justify-center items-center`}
            onSubmit={onNewpassword}
          >
            <h1
              className={`${
                theme ? "text-white" : "text-black"
              } text-2xl font-semibold text-center mb-4`}
            >
              Reset Password!
            </h1>
            <p
              className={`text-center mb-6 ${
                theme ? " text-indigo-300" : "text-indigo-500"
              }`}
            >
              Enter New Password!
            </p>
            <div
              className={`flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full ${
                theme ? "bg-gray-500" : "bg-gray-900"
              }  text-white`}
            >
              <img src={assets.lock_icon}></img>
              <input
                type={showpassword ? "text" : "password"}
                placeholder="Password"
                className="bg-transparent outline-none w-full decoration-0"
                value={newPassword}
                onChange={(e) => setNewpassword(e.target.value)}
                required
              />
              {showpassword ? (
                <div
                  onClick={() => setShowpassword(!showpassword)}
                  className="cursor-pointer"
                >
                  <FaEye />
                </div>
              ) : (
                <div
                  onClick={() => setShowpassword(!showpassword)}
                  className="cursor-pointer"
                >
                  <FaEyeSlash />
                </div>
              )}
            </div>
            <button
              className={`${
                theme
                  ? "text-black from-indigo-400 to-indigo-700"
                  : "text-white from-indigo-950 to-indigo-800"
              } rounded-full bg-gradient-to-r w-full  py-2.5 font-medium  cursor-pointer`}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContent";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";
function Login() {
  const { backendurl, setIsLoggedin, getUserData, theme, setTheme } =
    useContext(AppContent);
  const [state, setState] = useState("Sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nevigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false);

  const onSubmittHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign up") {
        const { data } = await axios.post(backendurl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          nevigate("/");
          toast.success("Registed Successfuly!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          nevigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className={`flex justify-center items-center min-h-screen  px-0 lg:px-6 bg-gradient-to-br ${
        theme ? "from-blue-300 to-purple-200" : " from-slate-950 to-slate-900"
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
      <div
        className={`${
          theme ? "bg-slate-700 text-indigo-300" : "bg-gray-300 text-indigo-500"
        } p-7 m-5 rounded-lg w-[22rem] lg:w-96 md:w-96 sm:w-96  text-sm  `}
      >
        <h2
          className={`text-3xl font-semibold ${
            theme ? "text-white" : "text-black"
          } text-center mb-3`}
        >
          {state === "Sign up" ? "Create Account" : "Login Account"}
        </h2>
        <p className="text-center mb-6 text-sm font-">
          {state === "Sign up"
            ? "Create your Account"
            : "Login to Your Account"}
        </p>

        <form onSubmit={onSubmittHandler}>
          {state === "Sign up" && (
            <div
              className={`mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full ${
                theme ? "bg-gray-500" : "bg-gray-900"
              } `}
            >
              <img src={assets.person_icon}></img>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                className="bg-transparent outline-none text-white"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
          )}

          <div
            className={`mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full ${
              theme ? "bg-gray-500" : "bg-gray-900"
            } `}
          >
            <img src={assets.mail_icon}></img>
            <input
              type="email"
              placeholder="Email id"
              required
              value={email}
              className="bg-transparent outline-none text-white w-96"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div
            className={`mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full ${
              theme ? "bg-gray-500" : "bg-gray-900"
            } `}
          >
            <img src={assets.lock_icon}></img>
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              className="bg-transparent outline-none text-white w-full"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
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
          {state === "Login" && (
            <p
              className={`mb-4 ${
                theme ? "text-indigo-300" : "text-indigo-500"
              }  font-medium hover:underline cursor-pointer`}
              onClick={() => nevigate("/reset-password")}
            >
              Forgot Password!
            </p>
          )}

          <button
            className={`${
              theme
                ? "text-black from-indigo-400 to-indigo-700"
                : "text-white from-indigo-950 to-indigo-800"
            } rounded-full bg-gradient-to-r w-full  py-2.5 font-medium  cursor-pointer`}
          >
            {state}
          </button>
        </form>
        {state === "Sign up" ? (
          <p
            className={`text-center text-xs font-medium mt-4 ${
              theme ? "text-white" : "text-black"
            } `}
          >
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className={`${
                theme ? "text-indigo-300" : "text-indigo-500"
              } cursor-pointer underline `}
            >
              Login
            </span>
          </p>
        ) : (
          <p
            className={`text-center text-xs font-medium mt-4 ${
              theme ? "text-white" : "text-black"
            } `}
          >
            Dont't have an Account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className={`${
                theme ? "text-indigo-300" : "text-indigo-500"
              } cursor-pointer underline `}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;

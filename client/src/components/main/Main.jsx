import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import run from "../../config/Gemini";

import { AppContent } from "../../context/AppContent";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";
import GeminiChatDisplay from "./Code";
function Main() {
  const [text, settext] = useState("");
  const [displayicon, setdisplayicon] = useState(false);
  const [result, setresult] = useState();
  const [prompt, setprompt] = useState(false);
  const [wait, setwait] = useState(false);
  const [list, setlist] = useState([]);
  const nevigate = useNavigate();
  const {
    userData,
    backendurl,
    setUserData,
    setIsLoggedin,
    theme,
    setTheme,
    display,
    new_prompt,
    display_recents,
    setrecents,
  } = useContext(AppContent);
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
  const handlelisten = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      settext(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in speech recognition:", event.error);
    };
    recognition.start();
    setdisplayicon(true);

    if (text) {
      recognition.stop();
      sendprompt();
      setrecents(false);
    }
  };

  useEffect(() => {
    settext("");
    setresult("");
    setdisplayicon(!displayicon);
    setwait(false);
  }, [new_prompt, prompt]);

  const handlechange = (e) => {
    settext(e.target.value);
    if (e.target.value) {
      setdisplayicon(true);
    } else {
      setdisplayicon(false);
    }
  };

  const sendprompt = (txt) => {
    setlist([...list, txt]);
    setwait(true);
    setdisplayicon;

    {
      const result = run(txt);
      result
        .then((data) => {
          setresult(data.replace(/\*\*/g, "<br>").replace(/\*/g, "<hr><samp>"));
        })
        .catch(Error);
    }
    if (result) {
      setwait(false);
    }
  };

  return (
    <div
      className={`flex flex-col space-y-4 min-h-screen overflow-auto overflow-y-hidden   md:pl-20 pl-2  ${
        display ? "md:ml-24" : ""
      } ${
        theme ? "bg-white" : "bg-gradient-to-br  from-slate-950 to-slate-900"
      } `}
    >
      <div
        className={`flex ${
          theme ? "bg-white" : "bg-gradient-to-r  from-slate-950 to-slate-900"
        } h-auto p-2 w-full fixed top-0 z-50`}
      >
        <p className=" flex font-semibold lg:text-2xl md:text-xl text-lg top-2 font-card bg-gradient-to-r from-pink-400 via-sky-800 to-blue-700 text-transparent bg-clip-text">
          <div className={`${theme ? "bg-black" : ""} h-12 rounded-md`}>
            <img className={`h-16 w-16 -mt-2`} src={assets.logo}></img>
          </div>
          {""}- AI Text Generator{" "}
        </p>
        <div className="fixed  top-4 lg:right-32 md:right-32 right-20">
          <button
            onClick={() => {
              setTheme(!theme);
            }}
            className="cursor-pointer"
          >
            {theme ? <FaMoon /> : <FaSun className="text-white"></FaSun>}
          </button>
        </div>
        <div className="w-8 h-8 top-2 right-8 text-white fixed group ">
          <img
            src={assets.user_icon}
            className="rounded-full w-24  top-2 right-4"
          ></img>
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

      <div className="main flex flex-col h-fit w-fit mr-2  ">
        {!result && !display_recents && (
          <div className="lg:absolute  top-9 lg:top-20 md:top-20 ">
            <h1 className="text-4xl bg-gradient-to-tl from-pink-700 via-pink-400 to-blue-600  text-transparent bg-clip-text">
              Hello,{userData.name ? userData.name : " User!"}
            </h1>
            <h1
              className={`md:text-6xl text-3xl ${
                theme ? "text-gray-800" : "text-white"
              }   bg-clip-text`}
            >
              How can I help you?
            </h1>
          </div>
        )}

        {result && !display_recents ? (
          <div
            className={`mt-20  pr-5 flex justify-items-center h-auto font-medium font-primary ${
              theme ? "text-black" : "text-slate-100"
            }`}
          >
            <GeminiChatDisplay response={result}></GeminiChatDisplay>
          </div>
        ) : (
          <>
            {wait && !display_recents ? (
              <div className="lg:mt-40 mt-12 w-96">
                <div className="loading-bar flex h-32 gap-1 p-2 fade-in-25 md:gap-6 mt-10 "></div>
                <div className="loading-bar w-5/6 flex h-32 gap-1 p-2 fade-in-25 md:gap-6 mt-2"></div>
                <div className="loading-bar flex h-32  gap-1 p-2 fade-in-25 md:gap-6 mt-2"></div>
                <div className="loading-bar w-5/6 flex h-32 gap-1 p-2 fade-in-25 md:gap-6 mt-2"></div>
                <div className="loading-bar flex h-32  gap-1 p-2 fade-in-25 md:gap-6 mt-2"></div>
              </div>
            ) : (
              <>
                {display_recents ? (
                  <div className="mt-10  ">
                    <div
                      className={`bg-gradient-to-r ${
                        theme
                          ? "from-gray-800 to-gray-400"
                          : "from-gray-300 to-white"
                      }  font-medium text-transparent bg-clip-text text-4xl`}
                    >
                      Your Recents...
                    </div>
                    <div className={`${theme ? "text-black" : "text-white"} `}>
                      {list.length != 0 ? (
                        <ul className="list-disc space-y-4  font-light font-card">
                          {list.map((item, key) => {
                            return (
                              <li
                                key={key}
                                className="hover:underline hover:cursor-pointer"
                                onClick={() => {
                                  settext(item);
                                  sendprompt(item);
                                  setresult("");
                                  setwait(true);
                                }}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div className="bg-gradient-to-tl from-pink-700 via-pink-400 to-blue-600  text-transparent bg-clip-text mt-10 text-2xl">
                          No Recents
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3  grid-cols-1   mt-10 lg:mt-52 md:mt-20  gap-4  pr-5 md:place-content-start place-content-center font-medium">
                    <div
                      className={`card1 ${
                        theme ? "bg-slate-100" : "bg-gray-200"
                      }  rounded-lg p-4 space-y-5`}
                    >
                      <div
                        onClick={(e) => {
                          settext();
                          settext(e.target.innerHTML);
                          setdisplayicon(!display);

                          sendprompt(e.target.innerHTML);
                        }}
                        className={`hover:cursor-pointer ${
                          theme ? "text-black" : "text-slate-800"
                        } `}
                      >
                        What is Generative AI? and how it works in backend to
                        provide us the related solutions for the provided
                        prompt?
                      </div>
                      <div className="flex items-baseline">
                        <img
                          src={assets.compass_icon}
                          className="h-8 w-8 ml-auto mt-5 "
                        ></img>
                      </div>
                    </div>
                    <div
                      className={`card1 ${
                        theme ? "bg-slate-100" : "bg-gray-200"
                      }  rounded-lg p-4 space-y-5`}
                    >
                      {" "}
                      <div
                        onClick={(e) => {
                          settext();
                          settext(e.target.innerHTML);
                          setdisplayicon(!display);

                          sendprompt(e.target.innerHTML);
                        }}
                        className={`hover:cursor-pointer ${
                          theme ? "text-black" : "text-slate-800"
                        } `}
                      >
                        What are the other generative AI tools that i can use
                        other than Gemini? How is Gemini better than those
                        tools.
                      </div>
                      <div className="flex items-baseline">
                        <img
                          src={assets.bulb_icon}
                          className="h-8 w-8 ml-auto "
                        ></img>
                      </div>
                    </div>
                    <div
                      className={`card1 ${
                        theme ? "bg-slate-100" : "bg-gray-200"
                      }  rounded-lg p-4 space-y-5`}
                    >
                      {" "}
                      <div
                        onClick={(e) => {
                          settext();
                          settext(e.target.innerHTML);
                          setdisplayicon(!display);
                          setlist([...list, e.target.innerHTML]);
                          sendprompt(e.target.innerHTML);
                        }}
                        className={`hover:cursor-pointer ${
                          theme ? "text-black" : "text-slate-800"
                        } `}
                      >
                        Suggest different places to travel around the world! ,
                        along with public reviews for the particular destination
                        location.
                      </div>
                      <div className="flex items-baseline">
                        <img
                          src={assets.message_icon}
                          className="h-8 w-8 ml-auto "
                        ></img>
                      </div>
                    </div>
                    <div
                      className={`card1 ${
                        theme ? "bg-slate-100" : "bg-gray-200"
                      }  rounded-lg p-4 space-y-5`}
                    >
                      {" "}
                      <div
                        onClick={(e) => {
                          settext();
                          settext(e.target.innerHTML);
                          setdisplayicon(!display);
                          setlist([...list, e.target.innerHTML]);
                          sendprompt(e.target.innerHTML);
                        }}
                        className={`hover:cursor-pointer ${
                          theme ? "text-black" : "text-slate-800"
                        } `}
                      >
                        Explain the concept of Stack and Queue with their Time
                        Complexity of these Data Structure.
                      </div>
                      <div className="flex items-baseline">
                        <img
                          src={assets.code_icon}
                          className="h-8 w-8 ml-auto "
                        ></img>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      <div
        className={` ${
          theme ? "bg-white" : "bg-slate-900 border-slate-950 border-2"
        }  fixed bottom-0  lg:mt-32 md:mt-28  grid grid-cols-1 mr-3`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setlist([...list, text]);
            sendprompt(text);
          }
        }}
      >
        <div
          className={` ${theme ? "bg-slate-200" : "bg-gray-300"}
           
         rounded-full p-3 flex w-full   `}
        >
          <div className="w-screen">
            <input
              type="text"
              enterKeyHint="search"
              placeholder="Ask Something!"
              value={text}
              className={`bg-transparent text-black outline-none lg:w-[94%] w-[85%] `}
              onChange={handlechange}
            ></input>
          </div>
          <div>
            {""}
            <div className=" flex space-x-3">
              <button onClick={() => setprompt(!prompt)}>
                <img
                  src={assets.plus_icon}
                  className="h-5 w-4 hover:cursor-pointer md:hidden absolute right-28 bottom-[30px]"
                ></img>
              </button>

              <button onClick={handlelisten}>
                <img
                  src={assets.mic_icon}
                  className="h-5 w-5 hover: cursor-pointer absolute right-16 bottom-[30px]"
                ></img>
              </button>

              <div>
                {displayicon ? (
                  <button
                    onClick={() => {
                      setlist([...list, text]);
                      sendprompt(text);
                    }}
                  >
                    <img
                      src={assets.send_icon}
                      className="h-5 w-5 hover: cursor-pointer absolute right-6 bottom-8"
                    ></img>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`text-[12px] flex justify-center items-center underline ${
            theme ? "text-black" : "text-white"
          }`}
        >
          GetText may generate inaccurate text. Please Double check.
        </div>
      </div>
    </div>
  );
}
export default Main;

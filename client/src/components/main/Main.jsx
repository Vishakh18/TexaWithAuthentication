import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../../assets/assets";
import run from "../../config/Gemini";
import { MdLanguage } from "react-icons/md";
import { AppContent } from "../../context/AppContent";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";
import GeminiChatDisplay from "./Code";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Tooltip from "@mui/material/Tooltip";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoLanguage } from "react-icons/io5";
function Main() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [text, settext] = useState("");
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [displayicon, setdisplayicon] = useState(false);
  const [prompt, setprompt] = useState(false);
  const [wait, setwait] = useState(false);
  const [list, setlist] = useState([]);
  const nevigate = useNavigate();

  const {
    userData,
    result,
    setresult,
    backendurl,
    setUserData,
    setIsLoggedin,
    theme,
    setTheme,
    display,
    new_prompt,
    display_recents,
    setrecents,
    speakText,
  } = useContext(AppContent);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLanguageChange(e) {
    i18n.changeLanguage(e);

    if (e === "hi" && text) {
      setwait(!wait);
    } else if (e === "es" && text) {
      setwait(!wait);
    } else if (e === "en" && text) {
      setwait(!wait);
      sendprompt(text);
    }

    setresult();
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
  const handlelisten = () => {
    speechSynthesis.cancel();
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
          setresult(data);
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
      }  `}
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
        <div className="fixed  top-4 lg:right-28 md:right-28 right-20 space-x-5">
          <div className="relative inline-block " ref={dropdownRef}>
            <Tooltip title="Language" placement="bottom">
              <IoLanguage
                className={`text-2xl top-1 relative cursor-pointer hover:scale-110 duration-100 ${
                  theme ? "" : "text-white"
                }`}
                onClick={() => setShowDropdown(!showDropdown)}
              />
            </Tooltip>
            {showDropdown && (
              <ul className="absolute top-full left-0 mt-2 w-28 text-white bg-gray-800 shadow-md z-10 rounded-lg transition-all duration-300">
                <li
                  onClick={() => handleLanguageChange("en")}
                  className="py-2 px-2 hover:bg-gray-600 rounded-lg cursor-pointer"
                >
                  English
                </li>
                <li
                  onClick={() => handleLanguageChange("hi")}
                  className="px-2 py-2 hover:bg-gray-600 rounded-lg cursor-pointer"
                >
                  हिंदी
                </li>
                <li
                  onClick={() => handleLanguageChange("es")}
                  className="px-2 py-2 hover:bg-gray-600 rounded-lg cursor-pointer"
                >
                  Spanish
                </li>
              </ul>
            )}
          </div>

          <Tooltip title="Theme" placement="bottom">
            <button
              onClick={() => {
                setTheme(!theme);
              }}
              className="cursor-pointer"
            >
              {theme ? <FaMoon /> : <FaSun className="text-white"></FaSun>}
            </button>
          </Tooltip>
        </div>
        <div className="w-8 h-8 top-5 right-8 text-white fixed group ">
          <img
            src={assets.user_icon}
            className="rounded-full w-24  top-2 right-4"
          ></img>
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 textblack  pt-10 cursor-pointer">
            <ul className="list-none m-0 p-2 bg-gray-800 text-sm rounded-md">
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

      <div className="main flex flex-col h-fit w-fit mr-2  " data-aos="fade-up">
        {!result && !display_recents && (
          <div className="lg:absolute  top-9 lg:top-22 md:top-28 mt-20 lg:mt-0 ">
            <h1 className="text-4xl bg-gradient-to-tl from-pink-700 via-pink-400 to-blue-600  text-transparent bg-clip-text">
              <span>{t("Hello")}</span>
              <span>,</span>
              {userData.name ? userData.name : " User!"}
            </h1>
            <h1
              className={`md:text-6xl text-3xl mt-3 ${
                theme ? "text-gray-800" : "text-white"
              }   bg-clip-text`}
            >
              {t("ask")}
            </h1>
          </div>
        )}

        {result && !display_recents ? (
          <>
            {" "}
            <div className="text-black">{list}</div>
            <div
              className={`mt-10 mb-8  pr-5 flex justify-items-center h-auto font-medium font-primary ${
                theme ? "text-black" : "text-slate-100"
              }`}
            >
              <GeminiChatDisplay response={result}></GeminiChatDisplay>
            </div>
          </>
        ) : (
          <>
            {wait && !display_recents ? (
              <div className="lg:mt-48 mt-12 w-96">
                <div className="loading-bar flex h-32 gap-1 p-2 fade-in-25 md:gap-6 mt-10 "></div>
                <div className="loading-bar w-5/6 flex h-32 gap-1 p-2 fade-in-25 md:gap-6 mt-2"></div>
                <div className="loading-bar flex h-32  gap-1 p-2 fade-in-25 md:gap-6 mt-2"></div>
                <div className="loading-bar w-5/6 flex h-32 gap-1 p-2 fade-in-25 md:gap-6 mt-2"></div>
                <div className="loading-bar flex h-32  gap-1 p-2 fade-in-25 md:gap-6 mt-2"></div>
              </div>
            ) : (
              <>
                {display_recents ? (
                  <div className="mt-24 ml-5 ">
                    <div
                      className={`bg-gradient-to-r mt-2 ${
                        theme
                          ? "from-gray-800 to-gray-400"
                          : "from-gray-300 to-white"
                      }  font-medium text-transparent bg-clip-text text-4xl`}
                    >
                      {t("yourrecents")}
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
                          {t("norecents")}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3  grid-cols-1 mt-14 lg:mt-56 md:mt-20  gap-4  pr-5 md:place-content-start place-content-center font-medium">
                    <div
                      className={`card1 ${
                        theme ? "bg-slate-100" : "bg-gray-200"
                      }  rounded-lg p-4 space-y-5 cursor-pointer hover:scale-102 transition-transform ease-in-out  duration-150 hover:cursor-pointer ${
                        theme ? "text-black" : "text-slate-800"
                      }`}
                      onClick={(e) => {
                        settext();
                        settext(t("prompt1"));
                        setdisplayicon(!display);

                        sendprompt(t("prompt1"));
                      }}
                    >
                      {t("prompt1")}
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
                      }  rounded-lg p-4 space-y-5 cursor-pointer hover:scale-102 ransition-transform ease-in-out  duration-150 hover:cursor-pointer ${
                        theme ? "text-black" : "text-slate-800"
                      }`}
                      onClick={(e) => {
                        settext();
                        settext(t("prompt2"));
                        setdisplayicon(!display);

                        sendprompt(t("prompt2"));
                      }}
                    >
                      {t("prompt2")}
                      <div className="flex items-baseline">
                        <img
                          src={assets.bulb_icon}
                          className="h-8 w-8 ml-auto mt-5 "
                        ></img>
                      </div>
                    </div>
                    <div
                      className={`card1 ${
                        theme ? "bg-slate-100" : "bg-gray-200"
                      }  rounded-lg p-4 space-y-5 cursor-pointer hover:scale-102 transform-content  duration-150 hover:cursor-pointer ${
                        theme ? "text-black" : "text-slate-800"
                      }`}
                      onClick={(e) => {
                        settext();
                        settext(t("prompt3"));
                        setdisplayicon(!display);

                        sendprompt(t("prompt3"));
                      }}
                    >
                      {t("prompt3")}
                      <div className="flex items-baseline">
                        <img
                          src={assets.question_icon}
                          className="h-8 w-8 ml-auto mt-5 "
                        ></img>
                      </div>
                    </div>
                    <div
                      className={`card1 ${
                        theme ? "bg-slate-100" : "bg-gray-200"
                      }  rounded-lg p-4 space-y-5 cursor-pointer hover:scale-102 ransition-transform ease-in-out  duration-150 hover:cursor-pointer ${
                        theme ? "text-black" : "text-slate-800"
                      }`}
                      onClick={(e) => {
                        settext();
                        settext(t("prompt4"));
                        setdisplayicon(!display);

                        sendprompt(t("prompt4"));
                      }}
                    >
                      {t("prompt4")}
                      <div className="flex items-baseline">
                        <img
                          src={assets.code_icon}
                          className="h-8 w-8 ml-auto mt-5 "
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
            sendprompt(
              i18next.language === "hi"
                ? text.concat(" respond in hindi")
                : i18next.language === "es"
                ? text.concat("response in spanish")
                : text
            );
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
              placeholder={t("placeholdertxt")}
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
          {t("disclaimer")}
        </div>
      </div>
    </div>
  );
}
export default Main;

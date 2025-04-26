import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContent } from "../../context/AppContent";
import { IoMdMenu } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";

function Sidebar() {
  const {
    result,
    setSpeak,
    spk,
    theme,
    setdisplay,
    setrecents,
    display,
    new_prompt,
    display_recents,
    setprompt,
  } = useContext(AppContent);

  // const speakText = (text) => {
  //   if ("speechSynthesis" in window) {
  //     window.speechSynthesis.cancel(); // Stop previous
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     utterance.rate = 1; // Adjust speed
  //     utterance.pitch = 1; // Adjust tone
  //     utterance.lang = "en-US"; // Language
  //     window.speechSynthesis.speak(utterance);
  //   } else {
  //     console.warn("Text-to-Speech not supported in this browser.");
  //   }
  // };
  // function stop() {
  //   speechSynthesis.cancel();
  // }
  // if (spk === true) {
  //   speakText(result);
  // } else {
  //   stop();
  // }

  return (
    <div
      className={`sidebar ${"hidden md:inline-flex flex-col  h-screen ml-0 fixed top-0 justify-items-center  p-3 "} ${
        theme ? "bg-slate-100" : "bg-slate-800"
      }`}
    >
      <div className="top flex-col  space-y-6">
        <button
          onClick={() => {
            setdisplay(!display);
          }}
        >
          <div className={` ml-1 ${theme ? "text-black" : "text-white"}`}>
            <IoMdMenu className="h-6 w-8" />
          </div>
        </button>

        <div
          className={`${
            display
              ? "bg-gradient-to-r from-pink-300 to-blue-400 bg-transparent h-10 w-fit flex rounded-full  space-x-3 px-1"
              : "bg-gray-200 rounded-full h-10 w-10 flex "
          }`}
        >
          {" "}
          <img
            src={assets.plus_icon}
            className="h-8 ml-[8px] font-thin text-sm mt-1 hover:cursor-pointer "
            onClick={() => setprompt(!new_prompt)}
          ></img>
          <p className={`${display ? "mt-2 " : "hidden"}`}>New Search</p>
        </div>

        <div
          className={`${
            theme ? "text-black" : "text-white"
          } text-4xl fixed flex flex-col space-x-1.5 ml-1 cursor-pointer`}
          onClick={() => setSpeak(!spk)}
        >
          <GiSoundWaves />
          <p className={`${display ? "mt-2 " : "hidden"} text-sm`}>
            Voice Output
          </p>
          {/* <button
            className=" bg-slate-500 rounded-md text-[20px] p-1"
            onClick={() => stop()}
          >
            stop
          </button> */}
        </div>
      </div>
      <div
        className={`${
          display
            ? "flex-col ml-2 mt-20 before:translate-x-0 after:translate-x-10"
            : "hidden"
        }`}
      ></div>
      <div className="bottom left-4 bottom-0 absolute  space-y-4  mb-2">
        <div
          className={`h-8 w-fit ${
            theme ? "hover:bg-slate-400" : "hover:bg-slate-700"
          }  cursor-pointer p-1.5 rounded-full flex space-x-2`}
        >
          <div
            onClick={() => {
              setrecents(!display_recents);
            }}
          >
            <FaHistory
              className={`${
                theme ? "text-black" : "text-white"
              } h-5 w-5 mt-0.5`}
            />
          </div>
          <p
            className={`${display ? " text-sm" : "hidden"} ${
              theme ? "text-black" : "text-white"
            }`}
          >
            Recents
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

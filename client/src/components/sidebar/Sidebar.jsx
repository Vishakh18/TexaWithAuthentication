import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContent } from "../../context/AppContent";
import { IoMdMenu } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
function Sidebar() {
  const { i18n } = useTranslation();

  const {
    result,
    theme,
    setdisplay,
    setrecents,
    display,
    new_prompt,
    display_recents,
    setprompt,
    language,
  } = useContext(AppContent);

  const API_KEY = import.meta.env.ELEVENLABS_API_KEY;
  const VOICE_IDS = {
    hi: "DQuoFsZ3oda1diTerwpq",
    en: "ecp3DWciuUyW7BYM7II1",
  };

  async function speakWithElevenLabs(text, apiKey, voiceId) {
    if (!text || text.trim() === "") {
      toast.warn("No text provided for speech synthesis.");
      return;
    }

    if (!apiKey || !voiceId) {
      toast.error("ElevenLabs API key or Voice ID is missing.");
      return;
    }
    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${
      i18n.language === "hi" ? voiceId.hi : voiceId.en
    }`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `ElevenLabs API error: ${response.status} - ${response.statusText}`,
          errorBody
        );

        alert(
          `Error synthesizing speech: ${response.status} - ${response.statusText}`
        );
        return;
      }

      const audioBlob = await response.blob();

      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        URL.revokeObjectURL(audioUrl); // Clean up URL even on playback error
      };

      console.log("Playing synthesized audio...");
      audio.play();
    } catch (error) {
      console.error("An error occurred during ElevenLabs TTS:", error);
      alert(`An unexpected error occurred: ${error.message}`); // Use a message box
    }
  }
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
          <div
            className={`  p-1 rounded-lg ${
              theme
                ? "text-black hover:bg-gray-400 "
                : "text-white hover:bg-gray-900"
            }`}
          >
            <IoMdMenu className="h-7 w-8" />
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
        <Tooltip placement="right" title="Voice Output">
          <div
            className={`${
              theme
                ? "text-black hover:bg-gray-400 "
                : "text-white hover:bg-gray-900"
            } text-4xl fixed flex flex-col p-0.5 cursor-pointer rounded-lg `}
            onClick={() => speakWithElevenLabs(result, API_KEY, VOICE_IDS)}
          >
            <GiSoundWaves className="p-1" />

            {/* <button
            className=" bg-slate-500 rounded-md text-[20px] p-1"
            onClick={() => stop()}
          >
            stop
          </button> */}
          </div>
        </Tooltip>
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

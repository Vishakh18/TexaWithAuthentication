import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
export const AppContent = createContext();
import axios from "axios";
export const AppContextProvider = (props) => {
  const [language, setLanguage] = useState("en");
  const [display, setdisplay] = useState(false);
  const [new_prompt, setprompt] = useState("");
  const [display_recents, setrecents] = useState(false);
  const [result, setresult] = useState();
  const [spk, setSpeak] = useState(false);
  axios.defaults.withCredentials = true;
  const [theme, setTheme] = useState(false);
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [speakTxt, setSpeaktext] = useState();
  // const speakText = (text, lang = "en-US") => {
  //   const synth = window.speechSynthesis;

  //   const speak = () => {
  //     const voices = synth.getVoices();

  //     // Try to find a matching voice for the language
  //     const matchedVoice = voices.find((voice) => voice.lang.startsWith(lang));

  //     const utterance = new SpeechSynthesisUtterance(text);
  //     utterance.lang = lang;
  //     utterance.rate = 1.1;
  //     utterance.pitch = 1;

  //     if (matchedVoice) {
  //       utterance.voice = matchedVoice;
  //       console.log(
  //         "Using voice:",
  //         matchedVoice.name,
  //         "| LocalService:",
  //         matchedVoice.localService
  //       );
  //     } else {
  //       console.warn("No matching voice found for", lang);
  //     }

  //     synth.cancel(); // cancel any ongoing speech
  //     synth.speak(utterance);
  //   };

  //   // Make sure voices are loaded
  //   if (synth.getVoices().length === 0) {
  //     synth.onvoiceschanged = () => speak();
  //   } else {
  //     speak();
  //   }
  // };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendurl,
    spk,
    setSpeak,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    theme,
    setTheme,
    display,
    display_recents,
    new_prompt,
    setdisplay,
    setprompt,
    setrecents,
    result,
    setresult,
    language,
    setLanguage,
    speakTxt,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

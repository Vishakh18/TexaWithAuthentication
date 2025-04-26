import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
export const AppContent = createContext();
import axios from "axios";
export const AppContextProvider = (props) => {
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
  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Speed of speech
    utterance.pitch = 1; // Pitch
    synth.cancel(); // Stop any ongoing speech
    synth.speak(utterance);
  };

  // Strip Markdown symbols for TTS
  const stripMarkdown = (text) => {
    return text
      .replace(/```[\w-]*\n[\s\S]*?\n```/g, "") // remove code blocks
      .replace(/[*_~`>#-]/g, "") // remove markdown symbols
      .replace(/\n{2,}/g, ". ") // treat double newlines as sentence end
      .replace(/\n/g, " ") // single newline to space
      .replace(/\s+/g, " ") // remove extra spaces
      .trim();
  };
  if (spk) {
    const plainText = stripMarkdown(result);
    speakText(plainText);
  } else if (spk === false) {
    speechSynthesis.cancel();
  }
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
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

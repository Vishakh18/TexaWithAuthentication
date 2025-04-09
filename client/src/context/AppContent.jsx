import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
export const AppContent = createContext();
import axios from "axios";
export const AppContextProvider = (props) => {
  const [display, setdisplay] = useState(false);
  const [new_prompt, setprompt] = useState("");
  const [display_recents, setrecents] = useState(false);

  axios.defaults.withCredentials = true;
  const [theme, setTheme] = useState(false);
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
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
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

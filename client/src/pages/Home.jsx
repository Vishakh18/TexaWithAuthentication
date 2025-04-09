import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { AppContent } from "../context/AppContent";

const Home = () => {
  const { theme } = useContext(AppContent);
  return (
    <div
      className={`flex flex-col min-h-screen items-center justify-center ${
        theme
          ? "bg-gradient-to-br from-blue-300 to-purple-200"
          : "bg-gradient-to-br from-slate-950 to-slate-900"
      } bg-center bg-cover`}
    >
      <Navbar></Navbar>
      <Header></Header>
    </div>
  );
};

export default Home;

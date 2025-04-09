import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer, toast } from "react-toastify";
import Combo from "./components/Combine/Combo";
import { useContext } from "react";
import { AppContent } from "./context/AppContent";
function App() {
  const { theme } = useContext(AppContent);
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route
          path="/reset-password"
          element={<ResetPassword></ResetPassword>}
        />
        <Route path="/get-text" element={<Combo></Combo>} />
      </Routes>
    </div>
  );
}

export default App;

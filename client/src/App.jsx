import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { useTranslation } from "react-i18next";
import "./i18n";
import { ToastContainer, toast } from "react-toastify";
import Combo from "./components/Combine/Combo";
import { useContext } from "react";
import { AppContent } from "./context/AppContent";
function App() {
  const { theme } = useContext(AppContent);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <ToastContainer />
      <div className="p-4 ml-24 bg-red-400 mt-56">
        <div className="mb-4">
          <select onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en" className="bg-green-400">
              English
            </option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <h1 className="text-3xl font-bold">{t("welcome")}</h1>
        <p className="mt-2 text-lg">{t("description")}</p>
      </div>
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

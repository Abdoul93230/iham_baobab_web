import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";

const ResetPassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const BackendUrl = process.env.REACT_APP_Backend_Url;

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const EyeIcon = ({ show }) => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {show ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      )}
      {show && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      )}
    </svg>
  );

  // Création correcte des refs
  const otpRef1 = useRef(null);
  const otpRef2 = useRef(null);
  const otpRef3 = useRef(null);
  const otpRef4 = useRef(null);
  const otpRef5 = useRef(null);
  const otpRef6 = useRef(null);

  const otpRefs = [otpRef1, otpRef2, otpRef3, otpRef4, otpRef5, otpRef6];

  const montrerAlerte = (message, type = "info") => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 4000);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value !== "" && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (index > 0 && otpValues[index] === "") {
        otpRefs[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtpValues = [...otpValues];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtpValues[index] = char;
      }
    });
    setOtpValues(newOtpValues);

    // Focus sur le dernier champ rempli ou le premier champ vide
    const lastIndex = Math.min(pastedData.length, 5);
    otpRefs[lastIndex].current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otp = otpValues.join("");
    if (otp.length !== 6) {
      montrerAlerte("Veuillez entrer un code OTP valide à 6 chiffres", "error");
      setLoading(false);
      return;
    }

    if (newPassword === "" || newPassword.length < 6) {
      montrerAlerte(
        "Votre mot de passe doit contenir au moins 6 caractères.",
        "error"
      );
      setLoading(false);
      return;
    }

    if (newPassword.trim() !== newPassword2.trim()) {
      montrerAlerte("Les mots de passe ne correspondent pas.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BackendUrl}/reset_password`, {
        email,
        otp,
        newPassword,
      });
      montrerAlerte(response.data.message, "success");
      setLoading(false);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 404) {
        montrerAlerte(error.response.data.message, "error");
      } else if (error.response?.status === 401) {
        montrerAlerte(error.response.data.message, "error");
      } else {
        montrerAlerte(
          "Erreur lors de la réinitialisation du mot de passe",
          "error"
        );
      }
    }
  };

  return (
    <LoadingIndicator>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* Icône de cadenas */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* En-tête */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">
              Réinitialisation du mot de passe
            </h2>
            <p className="text-gray-600">
              Un code de vérification à 6 chiffres a été envoyé à{" "}
              <span className="font-medium">{email}</span>
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champs OTP */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Code de vérification
              </label>
              <div className="flex justify-between gap-2" onPaste={handlePaste}>
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-11 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center mt-2">
                Vous pouvez coller le code directement
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword1 ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors pr-10"
                  placeholder="Minimum 6 caractères"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 focus:outline-none"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  <EyeIcon show={showPassword1} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirmez le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword2 ? "text" : "password"}
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors pr-10"
                  placeholder="Retapez votre mot de passe"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 focus:outline-none"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  <EyeIcon show={showPassword2} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Réinitialiser le mot de passe
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>

        {/* Alertes */}
        <div className="fixed bottom-4 right-4 space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg shadow-lg transition-all duration-300 ${
                alert.type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {alert.message}
            </div>
          ))}
        </div>
      </div>
    </LoadingIndicator>
  );
};

export default ResetPassword;

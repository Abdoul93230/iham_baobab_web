import React, { useState } from "react";
import { Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logo.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import LoadingIndicator from "../../pages/LoadingIndicator";
import Alert from "../../pages/Alert";

import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

const Connexion = ({ chg }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [alert, setAlert] = useState({
    visible: false,
    type: "",
    message: "ds",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isloading, setIsloading] = useState(false);
  const location = useLocation();
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;
  const navigation = useNavigate();

  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => {
      setAlert({ visible: false, type: "", message: "" });
    }, 5000); // 3 secondes
  };

  const handleSuccess = (message) => {
    showAlert("success", message);
  };

  const handleWarning = (message) => {
    showAlert("warn", message);
  };

  const navigateBasedOnLocation = () => {
    const location = new URLSearchParams(window.location.search);
    const destinations = {
      fromCart: "/NotificationHeader",
      fromProfile: "/Profile",
      fromMore: "/More",
      fromMessages: "/Messages",
    };

    for (const [key, path] of Object.entries(destinations)) {
      if (location.get(key)) {
        navigation(`${path}?${key}=true`);
        return;
      }
    }
    navigation("/Home");
  };

  const login = async (e) => {
    e.preventDefault();
    setIsloading(true);

    // Fonction pour gérer les erreurs
    const handleError = (message) => {
      setIsloading(false);
      handleWarning(message);
    };

    if (loginMethod === "email") {
      // Validation de l'email

      if (email.length !== 0 && !regexMail.test(email)) {
        handleError("Veuillez entrer une adresse e-mail valide.");
        return;
      }
    } else if (loginMethod === "phone") {
      // Validation du numéro de téléphone
      if (
        phoneNumber.length > 0 &&
        (!regexPhone.test(phoneNumber) || phoneNumber.length > 11)
      ) {
        handleError("Veuillez entrer un numéro de téléphone valide.");
        return;
      }
    }

    // Validation du mot de passe
    if (password === "" || password.length < 6) {
      handleError("Votre mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // Préparation des données de connexion
    const loginData = {
      email: email.length > 0 ? email : null,
      phoneNumber: phoneNumber.length > 0 ? phoneNumber : null,
      password: password,
    };

    // console.log(loginData);

    try {
      const response = await axios.post(`${BackendUrl}/login`, loginData, {
        withCredentials: true,
        credentials: "include",
      });

      if (response.status === 200) {
        handleSuccess(response.data.message);
        setIsloading(false);
        chg("oui");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        navigateBasedOnLocation();
        localStorage.setItem(`userEcomme`, JSON.stringify(response.data));
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      handleError(
        error.response && error.response.status === 400
          ? error.response.data.message
          : "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      );
      // console.log(error);
    }
  };

  if (isloading) {
    return (
      <div
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Connection en cours Veuillez Patientez....
          <LoadingIndicator loading={isloading} />
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto w-24 h-24" />
          <h2
            className="mt-6 text-3xl font-bold text-[#B2905F]"
            style={{ textTransform: "uppercase" }}
          >
            Connexion
          </h2>
        </div>

        <form onSubmit={login} className="space-y-6">
          <div>
            <div className="flex justify-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("email");
                  setPhoneNumber("");
                }}
                className={`px-4 py-2 rounded-full ${
                  loginMethod === "email"
                    ? "bg-[#30A08B] text-white"
                    : "bg-gray-200"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("phone");
                  setEmail("");
                }}
                className={`px-4 py-2 rounded-full ${
                  loginMethod === "phone"
                    ? "bg-[#30A08B] text-white"
                    : "bg-gray-200"
                }`}
              >
                Téléphone
              </button>
            </div>
            <label
              htmlFor={loginMethod}
              className="block text-sm font-medium text-gray-700"
            >
              {loginMethod === "email"
                ? "Adresse email"
                : "Numéro de téléphone"}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {loginMethod === "email" ? (
                  <Mail className="h-5 w-5 text-gray-400" />
                ) : (
                  <Phone className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <input
                id={loginMethod}
                name={loginMethod}
                type={loginMethod === "email" ? "email" : "tel"}
                required
                value={loginMethod === "email" ? email : phoneNumber}
                onChange={(e) => {
                  loginMethod === "email"
                    ? setEmail(e.target.value)
                    : setPhoneNumber(e.target.value);
                }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#30A08B] focus:border-[#30A08B] sm:text-sm"
                placeholder={
                  loginMethod === "email"
                    ? "vous@exemple.com"
                    : "+33 6 12 34 56 78"
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#30A08B] focus:border-[#30A08B] sm:text-sm"
                placeholder="Votre mot de passe"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#30A08B] focus:ring-[#30A08B] border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Se souvenir de moi
              </label>
            </div>
            <div className="text-sm">
              <span
                onClick={() => navigation("/Forget Password")}
                className="font-medium text-[#30A08B] hover:text-[#B2905F] cursor-pointer"
              >
                Mot de passe oublié ?
              </span>
            </div>
          </div>

          <div>
            <button
              // onClick={login}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#30A08B] hover:bg-[#B2905F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#30A08B]"
            >
              Se connecter
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Ou continuez avec
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <span
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Facebook</span>
                {/* SVG icon here */}
                <span className="sr-only">Se connecter avec Facebook</span>
                <FacebookIcon />
              </span>
            </div>
            <div>
              <span
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Se connecter avec Twitter</span>
                <XIcon />
              </span>
            </div>
            <div>
              <span
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Se connecter avec Google</span>
                <GoogleIcon />
              </span>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Pas encore membre ?{" "}
          <span
            onClick={() => navigation("/Inscription")}
            className="font-medium text-[#30A08B] hover:text-[#B2905F] cursor-pointer"
          >
            Inscrivez-vous maintenant
          </span>
        </p>
      </div>
      {alert.visible && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ visible: false })}
        />
      )}
    </div>
  );
};

export default Connexion;

// #30A08B
// #B2905F
// #B17236

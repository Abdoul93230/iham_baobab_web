import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaTwitter,
  FaUserPlus,
  FaTimes,
  FaEdit,
  FaPaperPlane,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const MAX_EMAIL_FIELDS = 5;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const SITE_URL =
  process.env.REACT_APP_SITE_URL || "https://ihambaobab.onrender.com/"; // À configurer avec votre URL

export default function InviteFriendsPage() {
  const BackendUrl = process.env.REACT_APP_Backend_Url;
  const [emails, setEmails] = useState([{ address: "", isValid: false }]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isEditingMessage, setIsEditingMessage] = useState(false);

  const getDefaultMessage = (name) => `Salut !

Je viens de découvrir une super plateforme et je pense que ça pourrait t'intéresser. J'aimerais beaucoup avoir ton avis !

Tu peux la découvrir ici : ${SITE_URL}

À très vite !
${name}`;

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (userName) {
      setMessage(getDefaultMessage(userName));
    }
  }, [userName]);

  const loadUserData = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userEcomme"));
      if (userInfo) {
        setUserName(userInfo.name);
        const response = await axios.get(`${BackendUrl}/user`, {
          params: { id: userInfo.id },
        });
        setSenderEmail(response.data.user.email);
      }
    } catch (error) {
      showNotification(
        "Erreur lors du chargement des données utilisateur",
        "error"
      );
    }
  };

  const showNotification = (message, type = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = {
      address: value,
      isValid: EMAIL_REGEX.test(value),
    };
    setEmails(newEmails);
  };

  const addEmailField = () => {
    if (emails.length < MAX_EMAIL_FIELDS) {
      setEmails([...emails, { address: "", isValid: false }]);
    }
  };

  const removeEmailField = (index) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const getPersonalizedMessage = (recipientEmail = "") => {
    let personalizedMessage = message;
    if (recipientEmail) {
      const recipientName = recipientEmail.split("@")[0];
      // Remplace le "Salut !" par "Salut [prénom] !" si un email est fourni
      personalizedMessage = message.replace(
        "Salut !",
        `Salut ${recipientName} !`
      );
    }
    return personalizedMessage;
  };

  const handleShare = async (platform) => {
    setIsLoading(true);
    try {
      const validEmails = emails.filter((e) => e.isValid).map((e) => e.address);

      switch (platform) {
        case "email":
          if (validEmails.length === 0) {
            throw new Error(
              "Veuillez ajouter au moins une adresse email valide"
            );
          }

          for (const friendEmail of validEmails) {
            const emailData = {
              senderEmail,
              subject: `${userName} souhaite partager quelque chose avec vous !`,
              message: getPersonalizedMessage(friendEmail),
              friendEmail,
              clientName: userName,
            };
            await axios.post(`${BackendUrl}/Send_email_freind`, emailData);
          }
          showNotification(
            `Invitation${validEmails.length > 1 ? "s" : ""} envoyée${
              validEmails.length > 1 ? "s" : ""
            } avec succès !`
          );
          break;

        case "whatsapp":
          const whatsappMessage = `${getPersonalizedMessage()}\n\nDécouvrez la plateforme ici : ${SITE_URL}`;
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(
              whatsappMessage
            )}`,
            "_blank"
          );
          showNotification("Partage WhatsApp ouvert !");
          break;

        case "twitter":
          const twitterMessage = `Je viens de découvrir cette super plateforme ! Rejoignez-moi sur ${SITE_URL}`;
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            twitterMessage
          )}`;
          window.open(twitterUrl, "_blank");
          showNotification("Partage Twitter ouvert !");
          break;

        default:
          throw new Error("Mode de partage non supporté");
      }
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Le reste du JSX reste identique à la version précédente
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-4 sm:p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#30A08B] to-[#B2905F] p-8 text-white text-center">
            <h1 className="text-4xl font-bold mb-3">Invitez vos amis</h1>
            <p className="text-lg opacity-90">
              Partagez l'expérience avec vos proches
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Message Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#30A08B]">
                  Votre message
                </h2>
                <button
                  onClick={() => setIsEditingMessage(!isEditingMessage)}
                  className="p-2 hover:bg-teal-50 rounded-full transition-colors duration-200"
                >
                  <FaEdit className="w-5 h-5 text-[#30A08B]" />
                </button>
              </div>

              {isEditingMessage ? (
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-40 p-4 rounded-2xl border-2 border-[#30A08B]/20 focus:border-[#30A08B] focus:ring-2 focus:ring-[#30A08B]/20 outline-none transition-all duration-200 text-gray-700"
                  placeholder="Écrivez votre message personnalisé..."
                />
              ) : (
                <div className="bg-gradient-to-br from-teal-50 to-brown-50 p-6 rounded-2xl border border-[#30A08B]/10">
                  <p className="whitespace-pre-wrap text-gray-700">{message}</p>
                </div>
              )}
            </div>

            {/* Email Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#30A08B]">
                Inviter par email
              </h2>
              <div className="space-y-3">
                {emails.map((email, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Email de votre ami(e)"
                      value={email.address}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none ${
                        email.address
                          ? email.isValid
                            ? "border-[#30A08B]/30 focus:border-[#30A08B]"
                            : "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-[#30A08B]"
                      }`}
                    />
                    {index > 0 && (
                      <button
                        onClick={() => removeEmailField(index)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}

                {emails.length < MAX_EMAIL_FIELDS && (
                  <button
                    onClick={addEmailField}
                    className="flex items-center gap-2 text-[#B2905F] hover:text-[#B17236] transition-colors duration-200"
                  >
                    <FaUserPlus className="w-4 h-4" />
                    <span>Ajouter un email</span>
                  </button>
                )}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleShare("email")}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#30A08B] text-white rounded-xl hover:bg-[#30A08B]/90 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#30A08B]/20"
              >
                <FaPaperPlane className="w-5 h-5" />
                <span className="font-medium">Envoyer par email</span>
              </button>

              <button
                onClick={() => handleShare("whatsapp")}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#B2905F] text-white rounded-xl hover:bg-[#B2905F]/90 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#B2905F]/20"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="font-medium">WhatsApp</span>
              </button>

              <button
                onClick={() => handleShare("twitter")}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#B17236] text-white rounded-xl hover:bg-[#B17236]/90 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#B17236]/20"
              >
                <FaTwitter className="w-5 h-5" />
                <span className="font-medium">Twitter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

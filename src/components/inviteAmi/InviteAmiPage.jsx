import React, { useState } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaCopy,
  FaUserPlus,
  FaHistory,
  FaTimes,
} from "react-icons/fa";

const MAX_EMAIL_FIELDS = 10;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function InviteAmiPageCombined() {
  const [emails, setEmails] = useState([{ address: "", isValid: false }]);
  const [showHistory, setShowHistory] = useState(false);
  const [inviteHistory, setInviteHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageTemplate, setMessageTemplate] = useState({
    text: "Salut {{Nom}}, Je viens de découvrir un super site avec des produits de haute qualité. Tu peux avoir {{Reduction}} F CFA de réduction avec mon code : {{Code}}. À bientôt, {{Expediteur}}",
    variables: {
      Nom: "",
      Reduction: "10",
      Code: "AMI2024",
      Expediteur: "",
    },
  });

  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = {
      address: value,
      isValid: validateEmail(value),
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

  const getPersonalizedMessage = () => {
    let message = messageTemplate.text;
    Object.entries(messageTemplate.variables).forEach(([key]) => {
      const value = messageTemplate.variables[key];

      const regex = new RegExp(`{{${key}}}`, "g");
      console.log(regex);
      message = message.replace(regex, value || `[${key}]`);
    });
    return message;
  };

  const handleShare = async (platform) => {
    setIsLoading(true);
    try {
      const validEmails = emails.filter((e) => e.isValid).map((e) => e.address);
      const message = getPersonalizedMessage();

      if (validEmails.length === 0) {
        throw new Error("Veuillez ajouter au moins une adresse email valide");
      }

      const newInvite = {
        date: new Date().toLocaleString(),
        platform,
        recipients: validEmails,
      };
      setInviteHistory((prev) => [newInvite, ...prev]);

      switch (platform) {
        case "whatsapp":
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
            "_blank"
          );
          break;
        case "email":
          window.open(
            `mailto:${validEmails.join(
              ","
            )}?subject=Invitation spéciale&body=${encodeURIComponent(message)}`
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}&quote=${encodeURIComponent(message)}`
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              message
            )}`
          );
          break;
        default:
          throw new Error("Plateforme non supportée");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-row items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#30A08B]">
            Inviter vos amis
          </h1>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-2 bg-[#B2905F] text-white rounded-lg hover:bg-[#B17236] transition-colors duration-200"
          >
            <FaHistory className="w-4 h-4" />
            Historique
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-64">
                <img
                  src="https://i.etsystatic.com/13557012/r/il/3aa240/3732506014/il_570xN.3732506014_4uyc.jpg"
                  alt="Produit"
                  className="w-full h-full object-cover transition-transform transform hover:scale-110"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-4 text-[#30A08B]">
                  Variables disponibles:
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(messageTemplate.variables).map(
                    ([key, value]) => (
                      <input
                        key={key}
                        type="text"
                        placeholder={key}
                        value={value}
                        onChange={(e) =>
                          setMessageTemplate((prev) => ({
                            ...prev,
                            variables: {
                              ...prev.variables,
                              [key]: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#30A08B] focus:ring-2 focus:ring-[#30A08B] focus:ring-opacity-20 outline-none transition-colors duration-200"
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <textarea
                value={messageTemplate.text}
                onChange={(e) =>
                  setMessageTemplate((prev) => ({
                    ...prev,
                    text: e.target.value,
                  }))
                }
                className="w-full h-40 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#30A08B] focus:ring-2 focus:ring-[#30A08B] focus:ring-opacity-20 outline-none transition-colors duration-200"
                placeholder="Personnalisez votre message..."
              />
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-[#30A08B]">
                  Aperçu du message:
                </h3>
                <p className="whitespace-pre-wrap text-gray-600">
                  {getPersonalizedMessage()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email de votre ami"
                  value={email.address}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors duration-200 outline-none ${
                    email.address
                      ? email.isValid
                        ? "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20"
                        : "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20"
                      : "border-gray-200 focus:border-[#30A08B] focus:ring-2 focus:ring-[#30A08B] focus:ring-opacity-20"
                  }`}
                />
                {index > 0 && (
                  <button
                    onClick={() => removeEmailField(index)}
                    className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}

            {emails.length < MAX_EMAIL_FIELDS && (
              <button
                onClick={addEmailField}
                className="flex items-center gap-2 text-[#30A08B] hover:text-[#B2905F] transition-colors duration-200"
              >
                <FaUserPlus className="h-4 w-4" />
                Ajouter un ami
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => handleShare("whatsapp")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp
            </button>
            <button
              onClick={() => handleShare("email")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#B2905F] text-white rounded-lg hover:bg-[#B17236] transition-colors duration-200 disabled:opacity-50"
            >
              <FaEnvelope className="h-5 w-5" />
              Email
            </button>
            <button
              onClick={() => handleShare("facebook")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#30A08B] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50"
            >
              <FaFacebook className="h-5 w-5" />
              Facebook
            </button>
            <button
              onClick={() => handleShare("twitter")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#B17236] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50"
            >
              <FaTwitter className="h-5 w-5" />
              Twitter
            </button>
          </div>
        </div>

        {showHistory && (
          <div className="mb-6 p-4 mt-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-[#30A08B] mb-4">
              Historique des invitations
            </h2>
            <div className="space-y-3">
              {inviteHistory.map((invite, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium capitalize text-[#B17236]">
                        {invite.platform}
                      </p>
                      <p className="text-sm text-gray-600">
                        {invite.recipients.join(", ")}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{invite.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setInviteHistory([])}
              className="mt-4 bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
            >
              Supprimer l'historique
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

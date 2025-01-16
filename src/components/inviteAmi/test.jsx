import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaWhatsapp,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaUserPlus,
  FaHistory,
  FaTimes,
  FaCopy,
  FaLink,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_EMAIL_FIELDS = 10;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Templates de messages prédéfinis
const MESSAGE_TEMPLATES = {
  standard: {
    title: "Message Standard",
    text: "Salut {{Nom}}, Je viens de découvrir un super site avec des produits de haute qualité. Tu peux avoir {{Reduction}} F CFA de réduction avec mon code : {{Code}}. À bientôt, {{Expediteur}}",
  },
  professionnel: {
    title: "Message Professionnel",
    text: "Bonjour {{Nom}}, Je souhaite vous faire découvrir une excellente plateforme e-commerce. En utilisant mon code parrain {{Code}}, vous bénéficierez d'une remise exceptionnelle de {{Reduction}} F CFA sur votre première commande. Cordialement, {{Expediteur}}",
  },
  amical: {
    title: "Message Amical",
    text: "Hey {{Nom}} ! 🎉 Il faut absolument que je te parle de ce site génial que j'ai trouvé ! Utilise mon code {{Code}} et tu auras {{Reduction}} F CFA de réduction ! C'est pas cool ça ? 😊 A très vite ! {{Expediteur}}",
  },
};

export default function InviteAmiPageCombined() {
  const BackendUrl = process.env.REACT_APP_Backend_Url;
  const [emails, setEmails] = useState([{ address: "", isValid: false }]);
  const [showHistory, setShowHistory] = useState(false);
  const [inviteHistory, setInviteHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [showPreview, setShowPreview] = useState(true);
  const [referralCode, setReferralCode] = useState("");
  const [stats, setStats] = useState({
    totalInvites: 0,
    successfulInvites: 0,
    pendingInvites: 0,
  });

  const [messageTemplate, setMessageTemplate] = useState({
    text: MESSAGE_TEMPLATES.standard.text,
    variables: {
      Nom: "",
      Reduction: "10",
      Code: "AMI2024",
      Expediteur: "",
    },
  });

  useEffect(() => {
    loadUserData();
    loadInviteHistory();
    generateReferralCode();
  }, []);

  const generateReferralCode = () => {
    const userName = JSON.parse(localStorage.getItem("userEcomme"))?.name || "";
    const timestamp = Date.now().toString().slice(-4);
    const code = `${userName.slice(0, 4).toUpperCase()}${timestamp}`;
    setReferralCode(code);
    setMessageTemplate((prev) => ({
      ...prev,
      variables: {
        ...prev.variables,
        Code: code,
      },
    }));
  };

  const loadUserData = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userEcomme"));
      if (userInfo) {
        setMessageTemplate((prev) => ({
          ...prev,
          variables: {
            ...prev.variables,
            Expediteur: userInfo.name,
          },
        }));
        setUserName(userInfo.name);

        const response = await axios.get(`${BackendUrl}/user`, {
          params: { id: userInfo.id },
        });
        setSenderEmail(response.data.user.email);
      }
    } catch (error) {
      handleAlert("Erreur lors du chargement des données utilisateur", "error");
    }
  };

  const loadInviteHistory = () => {
    const savedHistory = localStorage.getItem("inviteHistory");
    if (savedHistory) {
      setInviteHistory(JSON.parse(savedHistory));
      updateStats(JSON.parse(savedHistory));
    }
  };

  const updateStats = (history) => {
    const stats = history.reduce(
      (acc, invite) => ({
        totalInvites: acc.totalInvites + invite.recipients.length,
        successfulInvites:
          acc.successfulInvites +
          (invite.status === "success" ? invite.recipients.length : 0),
        pendingInvites:
          acc.pendingInvites +
          (invite.status === "pending" ? invite.recipients.length : 0),
      }),
      {
        totalInvites: 0,
        successfulInvites: 0,
        pendingInvites: 0,
      }
    );
    setStats(stats);
  };

  const handleAlert = (message, type = "success") => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    setMessageTemplate((prev) => ({
      ...prev,
      text: MESSAGE_TEMPLATES[template].text,
    }));
  };

  const getPersonalizedMessage = (recipientName = "") => {
    let message = messageTemplate.text;
    const variables = {
      ...messageTemplate.variables,
      Nom: recipientName || messageTemplate.variables.Nom,
    };

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      message = message.replace(regex, value || `[${key}]`);
    });
    return message;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      handleAlert("Copié dans le presse-papier !");
    } catch (err) {
      handleAlert("Erreur lors de la copie", "error");
    }
  };

  const handleShare = async (platform) => {
    setIsLoading(true);
    try {
      const validEmails = emails.filter((e) => e.isValid).map((e) => e.address);

      if (platform === "email" && validEmails.length === 0) {
        throw new Error("Veuillez ajouter au moins une adresse email valide");
      }

      const newInvite = {
        date: new Date().toLocaleString(),
        platform,
        recipients: validEmails,
        status: "pending",
      };

      switch (platform) {
        case "email":
          for (const friendEmail of validEmails) {
            const emailData = {
              senderEmail,
              subject: "Invitation spéciale - Offre de parrainage",
              message: getPersonalizedMessage(friendEmail.split("@")[0]),
              friendEmail,
              clientName: userName,
            };

            await axios.post(`${BackendUrl}/Send_email_freind`, emailData);
          }
          newInvite.status = "success";
          handleAlert(`${validEmails.length} email(s) envoyé(s) avec succès !`);
          break;

        case "whatsapp":
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(
              getPersonalizedMessage()
            )}`,
            "_blank"
          );
          handleAlert("Message WhatsApp prêt à être envoyé !");
          break;

        case "facebook":
          const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}&quote=${encodeURIComponent(getPersonalizedMessage())}`;
          window.open(fbUrl, "_blank");
          handleAlert("Partage Facebook ouvert !");
          break;

        case "twitter":
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            getPersonalizedMessage()
          )}`;
          window.open(twitterUrl, "_blank");
          handleAlert("Partage Twitter ouvert !");
          break;

        default:
          throw new Error("Plateforme non supportée");
      }

      const updatedHistory = [newInvite, ...inviteHistory];
      setInviteHistory(updatedHistory);
      localStorage.setItem("inviteHistory", JSON.stringify(updatedHistory));
      updateStats(updatedHistory);
    } catch (error) {
      handleAlert(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setInviteHistory([]);
    localStorage.removeItem("inviteHistory");
    setStats({
      totalInvites: 0,
      successfulInvites: 0,
      pendingInvites: 0,
    });
    handleAlert("Historique effacé avec succès");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-2 sm:p-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-3 sm:p-6">
        {/* En-tête avec statistiques */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#30A08B]">
              Programme de Parrainage
            </h1>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#B2905F] text-white rounded-lg hover:bg-[#B17236] transition-colors duration-200"
            >
              <FaHistory className="w-4 h-4" />
              Historique
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-4">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Invitations</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-800">
                {stats.totalInvites}
              </p>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm text-green-600">Invitations Réussies</p>
              <p className="text-xl sm:text-2xl font-bold text-green-800">
                {stats.successfulInvites}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm text-yellow-600">En Attente</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-800">
                {stats.pendingInvites}
              </p>
            </div>
          </div>
        </div>

        {/* Sélection du template */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg font-semibold text-[#30A08B] mb-2">
            Choisissez votre style de message
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            {Object.entries(MESSAGE_TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                onClick={() => handleTemplateChange(key)}
                className={`p-3 rounded-lg border transition-colors duration-200 ${
                  selectedTemplate === key
                    ? "border-[#30A08B] bg-[#30A08B] text-white"
                    : "border-gray-200 hover:border-[#30A08B]"
                }`}
              >
                {template.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Colonne de gauche */}
          <div className="space-y-4">
            <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <img
                src="/api/placeholder/400/300"
                alt="Illustration parrainage"
                className="w-full h-48 sm:h-full object-cover"
              />
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold mb-3 sm:mb-4 text-[#30A08B]">
                Personnalisez votre message
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {Object.entries(messageTemplate.variables).map(
                  ([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="text-sm text-gray-600">{key}</label>
                      <input
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
                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-200 focus:border-[#30A08B] focus:ring-2 focus:ring-[#30A08B] focus:ring-opacity-20 outline-none transition-colors duration-200"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Colonne de droite */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[#30A08B]">Message</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-gray-500 hover:text-[#30A08B]"
                >
                  {showPreview ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(getPersonalizedMessage())}
                  className="text-gray-500 hover:text-[#30A08B]"
                >
                  <FaCopy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <textarea
              value={messageTemplate.text}
              onChange={(e) =>
                setMessageTemplate((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
              className="w-full h-32 sm:h-40 px-3 sm:px-4 py-2 rounded-lg border border-gray-200 focus:border-[#30A08B] focus:ring-2 focus:ring-[#30A08B] focus:ring-opacity-20 outline-none transition-colors duration-200"
              placeholder="Personnalisez votre message..."
            />

            {showPreview && (
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <h3 className="font-semibold text-[#30A08B]">Aperçu</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Code de parrainage:
                    </span>
                    <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">
                      {referralCode}
                    </span>
                    <button
                      onClick={() => copyToClipboard(referralCode)}
                      className="text-gray-500 hover:text-[#30A08B]"
                    >
                      <FaCopy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-gray-600 text-sm sm:text-base">
                  {getPersonalizedMessage()}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {/* Email fields section */}
              {emails.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email de votre ami"
                    value={email.address}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className={`flex-1 px-3 sm:px-4 py-2 rounded-lg border transition-colors duration-200 outline-none ${
                      email.address
                        ? email.isValid
                          ? "border-green-500 focus:border-green-500"
                          : "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-[#30A08B]"
                    }`}
                  />
                  {index > 0 && (
                    <button
                      onClick={() => removeEmailField(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTimes className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}

              {emails.length < MAX_EMAIL_FIELDS && (
                <button
                  onClick={addEmailField}
                  className="flex items-center gap-2 text-[#30A08B] hover:text-[#B2905F]"
                >
                  <FaUserPlus className="h-4 w-4" />
                  Ajouter un ami
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
              <button
                onClick={() => handleShare("whatsapp")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
              >
                <FaWhatsapp className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare("email")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#B2905F] text-white rounded-lg hover:bg-[#B17236] transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
              >
                <FaEnvelope className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="hidden sm:inline">Email</span>
              </button>
              <button
                onClick={() => handleShare("facebook")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#30A08B] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
              >
                <FaFacebook className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="hidden sm:inline">Facebook</span>
              </button>
              <button
                onClick={() => handleShare("twitter")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#B17236] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
              >
                <FaTwitter className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="hidden sm:inline">Twitter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Historique des invitations */}
        {showHistory && (
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#30A08B]">
                Historique des invitations
              </h2>
              <button
                onClick={clearHistory}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Effacer l'historique
              </button>
            </div>

            <div className="space-y-3">
              {inviteHistory.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  Aucun historique d'invitation
                </p>
              ) : (
                inviteHistory.map((invite, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              invite.status === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {invite.status === "success"
                              ? "Envoyé"
                              : "En attente"}
                          </span>
                          <p className="font-medium capitalize text-[#B17236]">
                            {invite.platform}
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 break-all">
                          {invite.recipients.join(", ")}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {invite.date}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
      />
    </div>
  );
}

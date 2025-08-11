import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Camera,
  Lock,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import LoadingIndicator from "../../pages/LoadingIndicator";
import AvatarEditor from "react-avatar-editor";
import defaultUserIcon from "../../Images/icon_user.png";
import Alert from "../Alert/Alert";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

// Configuration des pays supportés
const countryCodes = [
  { code: '+227', name: 'Niger', flag: '🇳🇪', defaultSelected: true },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+1', name: 'États-Unis', flag: '🇺🇸' },
  { code: '+44', name: 'Royaume-Uni', flag: '🇬🇧' },
  { code: '+49', name: 'Allemagne', flag: '🇩🇪' },
  { code: '+86', name: 'Chine', flag: '🇨🇳' },
  { code: '+91', name: 'Inde', flag: '🇮🇳' },
  { code: '+81', name: 'Japon', flag: '🇯🇵' },
  { code: '+55', name: 'Brésil', flag: '🇧🇷' },
  { code: '+61', name: 'Australie', flag: '🇦🇺' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+212', name: 'Maroc', flag: '🇲🇦' }
];

const ComptePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nom: "",
    email: "",
    telephone: "",
    photo: defaultUserIcon,
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState('+227');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phoneWithoutCode, setPhoneWithoutCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1.2);
  const [rotate, setRotate] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;

  const showAlert = useCallback((message, type = "info") => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setAlerts((prev) => prev.filter((alert) => alert.id !== id)),
      3000
    );
  }, []);

  const handleCountrySelect = (countryCode) => {
    setSelectedCountryCode(countryCode);
    setShowCountryDropdown(false);
  };

  const getSelectedCountry = () => {
    return countryCodes.find(country => country.code === selectedCountryCode) || countryCodes[0];
  };

  // Fonction pour extraire le code pays et le numéro d'un numéro complet
  const parsePhoneNumber = (fullNumber) => {
    if (!fullNumber) return { countryCode: '+227', phoneNumber: '' };
    
    // Chercher quel code pays correspond
    for (const country of countryCodes) {
      if (fullNumber.startsWith(country.code)) {
        return {
          countryCode: country.code,
          phoneNumber: fullNumber.substring(country.code.length)
        };
      }
    }
    
    // Si aucun code trouvé, considérer que c'est un numéro local Niger
    return { countryCode: '+227', phoneNumber: fullNumber };
  };

  const fetchUserData = useCallback(
    async (userId) => {
      try {
        const [userResponse, profileResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_Backend_Url}/user`, {
            params: { id: userId },
            timeout: 10000,
          }),
          axios.get(`${process.env.REACT_APP_Backend_Url}/getUserProfile`, {
            params: { id: userId },
            timeout: 10000,
          }),
        ]);

        if (!userResponse.data.user) {
          throw new Error("Données utilisateur non trouvées");
        }

        const phoneNumber = profileResponse.data.data?.numero || "";
        const { countryCode, phoneNumber: cleanPhone } = parsePhoneNumber(phoneNumber);
        
        setUserData({
          nom: userResponse.data.user.name || "",
          email: userResponse.data.user.email || "",
          telephone: phoneNumber, // Conserver le numéro complet pour la compatibilité
          photo:
            profileResponse.data.data?.image !==
            "https://chagona.onrender.com/images/image-1688253105925-0.jpeg"
              ? profileResponse.data.data.image
              : defaultUserIcon,
        });

        // Mettre à jour les états séparés pour le sélecteur
        setSelectedCountryCode(countryCode);
        setPhoneWithoutCode(cleanPhone);

        showAlert("Profil chargé avec succès", "success");
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [showAlert]
  );

  useEffect(() => {
    const userE = JSON.parse(localStorage.getItem("userEcomme"));
    if (!userE) {
      showAlert("Veuillez vous connecter", "error");
      setLoading(false);
      return;
    }
    fetchUserData(userE.id);
  }, [fetchUserData, showAlert]);

  const handleError = (error) => {
    // let message = "Une erreur est survenue";
    // if (error.code === "ECONNABORTED") message = "Délai d'attente dépassé";
    // else if (error.response?.status === 404) message = "Profil non trouvé";
    // else if (error.response?.status === 401) message = "Session expirée";
    let errorMessage = "Erreur lors du chargement des données";
    if (error.code === "ECONNABORTED") {
      errorMessage = "Le serveur met trop de temps à répondre";
    } else if (error.response) {
      switch (error.response.status) {
        case 404:
          errorMessage = "Profil utilisateur non trouvé";
          break;
        case 401:
          errorMessage = "Session expirée, veuillez vous reconnecter";
          break;
        case 403:
          errorMessage = "Accès non autorisé";
          break;
        case 500:
          errorMessage = "Erreur serveur, veuillez réessayer plus tard";
          break;
        default:
          errorMessage = error.response.data?.message || errorMessage;
      }
    } else if (error.request) {
      errorMessage = "Impossible de contacter le serveur";
    }

    showAlert(errorMessage, "error");
    console.error(error);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handlePhotoSelect(file);
  };

  const handlePhotoSelect = (file) => {
    const maxSize = 4 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      showAlert(
        "Format non supporté (JPEG, PNG, GIF, WebP uniquement)",
        "warning"
      );
      return;
    }

    if (file.size > maxSize) {
      showAlert("Image trop volumineuse (max 4MB)", "warning");
      return;
    }

    setImage(file);
    setEditingPhoto(true);
    setScale(1.2);
    setRotate(0);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files?.[0]) handlePhotoSelect(e.target.files[0]);
  };

  const handleSavePhoto = async () => {
    if (!editor) {
      showAlert("Erreur d'édition", "error");
      return;
    }

    const userE = JSON.parse(localStorage.getItem("userEcomme"));
    if (!userE) {
      showAlert("Session expirée", "error");
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const canvas = editor.getImageScaledToCanvas();
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      const formData = new FormData();
      formData.append("image", blob);
      formData.append("name", userData.nom);
      formData.append("email", userData.email);
      formData.append("phone", `${selectedCountryCode}${phoneWithoutCode}`); // Utiliser le numéro complet
      formData.append("id", userE.id);

      await axios.post(
        `${process.env.REACT_APP_Backend_Url}/createProfile`,
        formData,
        {
          timeout: 15000,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      showAlert("Photo mise à jour", "success");
      setEditingPhoto(false);
      await fetchUserData(userE.id);
    } catch (error) {
      handleError(error);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userE = JSON.parse(localStorage.getItem("userEcomme"));
    if (!userE) {
      showAlert("Session expirée", "error");
      return;
    }
    console.log(userE.id);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", userData.nom);
      formData.append("email", userData.email);
      formData.append("phone", `${selectedCountryCode}${phoneWithoutCode}`); // Utiliser le numéro complet
      formData.append("id", userE.id);

      await axios.post(
        `${process.env.REACT_APP_Backend_Url}/createProfile`,
        formData,
        {
          timeout: 10000,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      showAlert("Profil mis à jour", "success");
      await fetchUserData(userE.id);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const errors = [];
    if (userData.nom.trim().length < 3)
      errors.push("Nom trop court (min 3 caractères)");
    if (!regexMail.test(userData.email)) errors.push("Email invalide");
    if (!regexPhone.test(phoneWithoutCode))
      errors.push("Numéro invalide (min 8 chiffres)");

    if (errors.length) {
      errors.forEach((error) => showAlert(error, "warning"));
      return false;
    }
    return true;
  };

  return (
    <LoadingIndicator loading={loading}>
      <div className="max-w-2xl mx-auto p-6">
        {/* Alerts */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              message={alert.message}
              type={alert.type}
              onClose={() =>
                setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
              }
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center text-emerald-600">
          Mon Profil
        </h1>

        {/* Photo Section */}
        <div className="mb-8 text-center">
          <div className="relative inline-block group">
            <div
              className={`w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-500 transition-transform duration-300 group-hover:scale-105 ${
                isDragging ? "border-emerald-400 scale-105" : ""
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <img
                src={userData.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              onChange={handlePhotoChange}
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-emerald-500 text-white p-3 rounded-full cursor-pointer hover:bg-emerald-600 transform transition-transform duration-300 hover:scale-110 shadow-lg"
            >
              <Camera size={24} />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Glissez une image ou cliquez pour modifier (MAX 4MB)
          </p>
        </div>

        {/* Photo Editor Modal */}
        {editingPhoto && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Éditer la photo
                </h3>
                <button
                  onClick={() => setEditingPhoto(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <AvatarEditor
                  ref={setEditor}
                  image={image}
                  width={280}
                  height={280}
                  border={50}
                  borderRadius={140}
                  color={[0, 0, 0, 0.6]}
                  scale={scale}
                  rotate={rotate}
                  className="border rounded-lg shadow-inner"
                />
              </div>

              <div className="space-y-4">
                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setScale((s) => Math.max(1, s - 0.1))}
                      className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      <ZoomOut size={20} />
                    </button>
                    <input
                      type="range"
                      min="1"
                      max="2"
                      step="0.01"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-24 accent-emerald-500"
                    />
                    <button
                      onClick={() => setScale((s) => Math.min(2, s + 0.1))}
                      className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      <ZoomIn size={20} />
                    </button>
                  </div>

                  <button
                    onClick={() => setRotate((r) => r + 90)}
                    className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setEditingPhoto(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={isUploadingPhoto}
                  >
                    Annuler
                  </button>
                  <ButtonLoader
                    onClick={handleSavePhoto}
                    isLoading={isUploadingPhoto}
                    className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-md disabled:opacity-50"
                  >
                    Sauvegarder
                  </ButtonLoader>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <User
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              name="nom"
              value={userData.nom}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, nom: e.target.value }))
              }
              placeholder="Nom complet"
              className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
              size={20}
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de téléphone
            </label>
            {/* Champ téléphone avec sélecteur de pays */}
            <div className="flex rounded-xl border-2 border-gray-300 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all duration-200">
              {/* Sélecteur de pays */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="relative inline-flex items-center px-3 py-3 rounded-l-xl bg-gray-50 text-gray-500 text-sm hover:bg-gray-100 focus:z-10 focus:outline-none border-r border-gray-300"
                >
                  <span className="mr-2">{getSelectedCountry().flag}</span>
                  <span className="mr-1">{selectedCountryCode}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Dropdown des pays */}
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {countryCodes.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleCountrySelect(country.code)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span className="font-medium">{country.code}</span>
                        <span className="text-gray-600">{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Champ de saisie du numéro */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="telephone"
                  value={phoneWithoutCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Permettre seulement les chiffres
                    setPhoneWithoutCode(value);
                    // Mettre à jour aussi userData.telephone pour la compatibilité
                    setUserData((prev) => ({ 
                      ...prev, 
                      telephone: `${selectedCountryCode}${value}` 
                    }));
                  }}
                  placeholder="87727501"
                  className="w-full pl-10 pr-4 py-3 border-0 rounded-r-xl focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => navigate("/Forget Password")}
              className="inline-flex items-center text-sm text-[#30A08B] hover:text-[#2a8f7c]"
            >
              <Lock className="h-4 w-4 mr-1" />
              Changer le mot de passe ?
            </button>
          </div>

          <ButtonLoader
            type="submit"
            isLoading={isSubmitting}
            className="w-full bg-[#30A08B] text-white py-2 px-4 rounded-lg hover:bg-[#2a8f7c] transition duration-200"
          >
            Mettre à jour le profil
          </ButtonLoader>
        </form>
      </div>
    </LoadingIndicator>
  );
};

export default ComptePage;

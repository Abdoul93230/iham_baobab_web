import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Phone, Camera, Lock } from "lucide-react";
import LoadingIndicator from "../../pages/LoadingIndicator";
import AvatarEditor from "react-avatar-editor";
import defaultUserIcon from "../../Images/icon_user.png";
import Alert from "../Alert/Alert";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const ComptePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nom: "",
    email: "",
    telephone: "",
    photo: defaultUserIcon,
  });
  const [loading, setLoading] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;

  const showAlert = (message, type = "info") => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
    
    // Supprimer l'alerte après 5 secondes
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 5000);
  };

  useEffect(() => {
    const userE = JSON.parse(localStorage.getItem("userEcomme"));
    if (!userE) {
      showAlert("Veuillez vous connecter pour accéder à votre profil", "error");
      setLoading(false);
      return;
    }
    fetchUserData(userE.id);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const [userResponse, profileResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_Backend_Url}/user`, { 
          params: { id: userId },
          timeout: 10000
        }),
        axios.get(`${process.env.REACT_APP_Backend_Url}/getUserProfile`, { 
          params: { id: userId },
          timeout: 10000
        })
      ]);

      if (!userResponse.data.user) {
        throw new Error("Données utilisateur non trouvées");
      }

      const userData = userResponse.data.user;
      const profileData = profileResponse.data.data;

      setUserData({
        nom: userData.name || "",
        email: userData.email || "",
        telephone: profileData?.numero || "",
        photo: profileData?.image !== "https://chagona.onrender.com/images/image-1688253105925-0.jpeg" 
          ? profileData.image 
          : defaultUserIcon
      });
      
      showAlert("Données du profil chargées avec succès", "success");
    } catch (error) {
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
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (userData.nom.trim().length < 3) {
      errors.push("Le nom doit contenir au moins 3 caractères");
    }
    if (!regexMail.test(userData.email)) {
      errors.push("Format d'email invalide");
    }
    if (!regexPhone.test(userData.telephone)) {
      errors.push("Le numéro de téléphone doit contenir au moins 8 chiffres");
    }

    if (errors.length > 0) {
      errors.forEach(error => showAlert(error, "warning"));
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAlerts([]); // Réinitialiser les erreurs lors de la modification
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 4 * 1024 * 1024; // 4MB
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      
      if (!allowedTypes.includes(file.type)) {
        showAlert("Format d'image non supporté (JPEG, PNG, GIF, WebP uniquement)", "warning");
        return;
      }
      
      if (file.size > maxSize) {
        showAlert("L'image ne doit pas dépasser 4MB", "warning");
        return;
      }
      
      setImage(file);
      setEditingPhoto(true);
      showAlert("Image sélectionnée. Cliquez sur Sauvegarder pour confirmer.", "info");
    }
  };

  const handleSavePhoto = async () => {
    if (!editor) {
      showAlert("Erreur lors de l'édition de l'image", "error");
      return;
    }

    const userE = JSON.parse(localStorage.getItem("userEcomme"));
    if (!userE) {
      showAlert("Session expirée, veuillez vous reconnecter", "error");
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const canvas = editor.getImageScaledToCanvas();
      const blob = await new Promise(resolve => canvas.toBlob(resolve));
      
      const formData = new FormData();
      formData.append("image", blob);
      formData.append("id", userE.id);

      const response = await axios.post(
        `${process.env.REACT_APP_Backend_Url}/createProfile`,
        formData,
        {
          timeout: 15000,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status === 200) {
        showAlert("Photo mise à jour avec succès", "success");
        setEditingPhoto(false);
        await fetchUserData(userE.id);
      }
    } catch (error) {
      let errorMessage = "Erreur lors de la mise à jour de la photo";
      
      if (error.code === "ECONNABORTED") {
        errorMessage = "Le téléchargement de l'image a pris trop de temps";
      } else if (error.response?.status === 413) {
        errorMessage = "Image trop volumineuse";
      }

      showAlert(errorMessage, "error");
      console.error("Error updating photo:", error);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userE = JSON.parse(localStorage.getItem("userEcomme"));
    if (!userE) {
      showAlert("Session expirée, veuillez vous reconnecter", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      showAlert("Mise à jour du profil en cours...", "info");
      
      const formData = new FormData();
      formData.append("name", userData.nom);
      formData.append("email", userData.email);
      formData.append("phone", userData.telephone);
      formData.append("id", userE.id);

      const response = await axios.post(
        `${process.env.REACT_APP_Backend_Url}/createProfile`,
        formData,
        {
          timeout: 10000,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status === 200) {
        showAlert("Profil mis à jour avec succès", "success");
        await fetchUserData(userE.id);
      }
    } catch (error) {
      let errorMessage = "Erreur lors de la mise à jour du profil";
      
      if (error.response) {
        switch (error.response.status) {
          case 409:
            errorMessage = "Cette adresse email est déjà utilisée";
            break;
          case 400:
            errorMessage = "Données invalides, veuillez vérifier vos informations";
            break;
          case 401:
            errorMessage = "Session expirée, veuillez vous reconnecter";
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Le serveur met trop de temps à répondre";
      }

      showAlert(errorMessage, "error");
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (alerts.length > 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            onClose={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
        />
      ))}

      <h1 className="text-2xl font-bold mb-6 text-center text-[#30A08B]">Mon Profil</h1>

      <div className="mb-6 text-center">
        <div className="relative inline-block">
          <img
            src={userData.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#30A08B]"
          />
          <input
            type="file"
            onChange={handlePhotoChange}
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 right-0 bg-[#30A08B] text-white p-2 rounded-full cursor-pointer hover:bg-[#2a8f7c]"
          >
            <Camera size={20} />
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-2">Cliquez pour modifier (MAX 4MB)</p>
      </div>

      {editingPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-4 rounded-lg">
            <AvatarEditor
              ref={(ref) => setEditor(ref)}
              image={image}
              width={250}
              height={250}
              border={50}
              borderRadius={125}
              color={[255, 255, 255, 0.6]}
              scale={1.2}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingPhoto(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                disabled={isUploadingPhoto}
              >
                Annuler
              </button>
              <ButtonLoader
                onClick={handleSavePhoto}
                isLoading={isUploadingPhoto}
                className="px-4 py-2 bg-[#30A08B] text-white rounded hover:bg-[#2a8f7c]"
              >
                Sauvegarder
              </ButtonLoader>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            name="nom"
            value={userData.nom}
            onChange={handleInputChange}
            placeholder="Nom complet"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#30A08B] focus:border-[#30A08B]"
          />
        </div>

        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#30A08B] focus:border-[#30A08B]"
          />
        </div>

        <div className="relative">
          <Phone
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="tel"
            name="telephone"
            value={userData.telephone}
            onChange={handleInputChange}
            placeholder="Téléphone"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#30A08B] focus:border-[#30A08B]"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={() => navigate("/change-password")}
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
  );
};

export default ComptePage;

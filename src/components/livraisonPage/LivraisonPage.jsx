import React, { useState, useEffect } from "react";
import axios from "axios";

const LivraisonPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [addressData, setAddressData] = useState({
    name: "",
    email: "",
    numero: "",
    region: "",
    quartier: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setError(null);
      try {
        const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;
        if (!userId) {
          throw new Error("ID utilisateur non trouvé. Veuillez vous reconnecter.");
        }

        // Récupérer les informations de l'utilisateur
        const userResponse = await axios.get(
          `http://localhost:8080/user?id=${userId}`
        );
        const user = userResponse.data.user;
        if (!user) {
          throw new Error("Impossible de récupérer les informations utilisateur.");
        }
        setUserData({
          name: user.name || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
        });

        // Récupérer l'adresse de livraison
        const addressResponse = await axios.get(
          `http://localhost:8080/getAddressByUserKey/${userId}`
        );
        const address = addressResponse.data.address;
        if (address) {
          setAddressData({
            name: address.name || "",
            email: address.email || "",
            numero: address.numero || "",
            region: address.region || "",
            quartier: address.quartier || "",
            description: address.description || "",
          });
        }
        setLoading(false);
      } catch (err) {
        let errorMessage = "Une erreur est survenue lors du chargement des données.";
        if (err.response) {
          // Erreur de réponse du serveur
          switch (err.response.status) {
            case 404:
              errorMessage = "Utilisateur ou adresse non trouvé.";
              break;
            case 401:
              errorMessage = "Session expirée. Veuillez vous reconnecter.";
              break;
            case 500:
              errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
              break;
            default:
              errorMessage = err.response.data?.message || errorMessage;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validateAddressData = () => {
    const errors = [];
    
    if (!addressData.name || addressData.name.length < 2) {
      errors.push("Le nom doit contenir au moins 2 caractères");
    }
    
    if (addressData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addressData.email)) {
      errors.push("L'adresse email n'est pas valide");
    }
    
    if (!addressData.numero || addressData.numero.length < 8) {
      errors.push("Le numéro de téléphone doit contenir au moins 8 chiffres");
    }
    
    if (!addressData.region || addressData.region.length < 3) {
      errors.push("La région doit contenir au moins 3 caractères");
    }
    
    if (!addressData.quartier || addressData.quartier.length < 2) {
      errors.push("Le quartier doit contenir au moins 2 caractères");
    }

    return errors;
  };

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.id]: e.target.value });
    // Réinitialiser les messages d'état lors de la modification
    setSubmitStatus({
      loading: false,
      error: null,
      success: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null, success: false });

    // Valider les données avant l'envoi
    const validationErrors = validateAddressData();
    if (validationErrors.length > 0) {
      setSubmitStatus({
        loading: false,
        error: validationErrors,
        success: false,
      });
      return;
    }

    try {
      const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;
      if (!userId) {
        throw new Error("ID utilisateur non trouvé. Veuillez vous reconnecter.");
      }

      const response = await axios.post(
        "http://localhost:8080/createOrUpdateAddress",
        {
          ...addressData,
          clefUser: userId,
        }
      );

      setSubmitStatus({
        loading: false,
        error: null,
        success: true,
      });

      // Réinitialiser le message de succès après 3 secondes
      setTimeout(() => {
        setSubmitStatus(prev => ({ ...prev, success: false }));
      }, 3000);

    } catch (error) {
      let errorMessage = "Erreur lors de la mise à jour de l'adresse.";
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            // Erreurs de validation du backend
            const backendErrors = error.response.data?.err;
            if (Array.isArray(backendErrors)) {
              errorMessage = backendErrors;
            } else {
              errorMessage = error.response.data?.message || "Données invalides";
            }
            break;
          case 401:
            errorMessage = "Session expirée. Veuillez vous reconnecter.";
            break;
          case 500:
            errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSubmitStatus({
        loading: false,
        error: Array.isArray(errorMessage) ? errorMessage : [errorMessage],
        success: false,
      });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B17236] mx-auto mb-4"></div>
        <p className="text-[#B17236]">Chargement...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-red-500 p-4 max-w-md mx-auto">
        <div className="bg-red-100 border border-red-400 rounded-lg p-4">
          <p className="text-lg font-semibold mb-2">Erreur</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        {/* En-tête avec animation */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#B17236] mb-2 sm:mb-3">
            Adresse de Livraison
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#B2905F] animate-pulse">
            Gérez vos informations de livraison
          </p>
        </div>

        {/* Formulaire principal */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-300"
        >
          {/* Section Informations Utilisateur (non modifiable) */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
              Informations Utilisateur
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="transform transition-all duration-300">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                >
                  Nom Complet
                </label>
                <input
                  type="text"
                  value={userData.name}
                  disabled
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border bg-gray-100"
                />
              </div>

              <div className="transform transition-all duration-300">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border bg-gray-100"
                />
              </div>

              <div className="transform transition-all duration-300">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={userData.phoneNumber}
                  disabled
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Section Adresse de Livraison (modifiable) */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
              Adresse de Livraison
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                  htmlFor="name"
                >
                  Nom sur la livraison *
                </label>
                <input
                  type="text"
                  id="name"
                  value={addressData.name}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                  htmlFor="email"
                >
                  Email de livraison *
                </label>
                <input
                  type="email"
                  id="email"
                  value={addressData.email}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                  htmlFor="numero"
                >
                  Téléphone de livraison *
                </label>
                <input
                  type="tel"
                  id="numero"
                  value={addressData.numero}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                  htmlFor="region"
                >
                  Région *
                </label>
                <input
                  type="text"
                  id="region"
                  value={addressData.region}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                  htmlFor="quartier"
                >
                  Quartier *
                </label>
                <input
                  type="text"
                  id="quartier"
                  value={addressData.quartier}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="col-span-2 transform transition-all duration-300 hover:-translate-y-1">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                  htmlFor="description"
                >
                  Instructions de livraison
                </label>
                <textarea
                  id="description"
                  value={addressData.description}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  rows="3"
                  onChange={handleAddressChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Messages d'état */}
          {(submitStatus.error || submitStatus.success) && (
            <div className={`mb-6 p-4 rounded-lg ${
              submitStatus.success ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'
            }`}>
              {submitStatus.success && (
                <p className="text-green-700 text-center">
                  ✓ Adresse mise à jour avec succès
                </p>
              )}
              {submitStatus.error && (
                <div className="text-red-700">
                  <p className="font-semibold mb-2">Erreurs :</p>
                  <ul className="list-disc list-inside">
                    {submitStatus.error.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
            <button
              type="button"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[#B2905F] hover:bg-[#B17236] text-white rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={() => window.history.back()}
            >
              Retour
            </button>

            <button
              type="submit"
              disabled={submitStatus.loading}
              className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ${
                submitStatus.loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#30A08B] hover:bg-[#2a8f7c]'
              } text-white rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center`}
            >
              {submitStatus.loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Mise à jour...
                </>
              ) : (
                "Mettre à jour l'adresse"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LivraisonPage;

// OrderConfirmation.js
import React, { useState } from "react";
import { AlertCircle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MasterCard from "../paementPage/paiementPhoto/masterCard.jpeg";
import VisaCard from "../paementPage/paiementPhoto/VisaCard.png";
import DomicileCard from "../paementPage/paiementPhoto/domicile.jpeg";
import MobileMoney from "../paementPage/paiementPhoto/MobileMoney.png";

const OrderConfirmation = ({ onClose }) => {
  const navigation = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("masterCard");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [mobileDetails, setMobileDetails] = useState({
    number: "",
    country: "",
    operator: "",
  });
  const [paiementProduit, setPaiementProduit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    phone: "",
    region: "",
    quartier: "",
    rue: "",
    batiment: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handlePress = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const africanCountries = [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cameroon",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "Democratic Republic of the Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Ivory Coast",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Swaziland",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
  ];

  const renderSelectedPaymentPage = () => {
    switch (selectedPayment) {
      case "masterCard":
      case "visa":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 border-t pt-4"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
              Détails de la carte{" "}
              {selectedPayment === "masterCard" ? "MasterCard" : "Visa"}
            </h2>
            <input
              type="text"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
              placeholder="Numéro de carte"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {formErrors.cardNumber && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" /> {formErrors.cardNumber}
              </p>
            )}
            <div className="flex space-x-2 mt-2">
              <div className="w-1/2">
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  placeholder="MM/AA"
                  className="p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                {formErrors.cardExpiry && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />{" "}
                    {formErrors.cardExpiry}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  value={cardDetails.cvc}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvc: e.target.value })
                  }
                  placeholder="CVC"
                  className="p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                {formErrors.cardCVC && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />{" "}
                    {formErrors.cardCVC}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      case "mobileMoney":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 border-t pt-4"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
              Mobile Money
            </h2>
            <div>
              <input
                type="tel"
                value={mobileDetails.number}
                onChange={(e) =>
                  setMobileDetails({ ...mobileDetails, number: e.target.value })
                }
                placeholder="Numéro de téléphone"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {formErrors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4" />{" "}
                  {formErrors.mobileNumber}
                </p>
              )}
            </div>
            <div>
              <select
                value={mobileDetails.country}
                onChange={(e) =>
                  setMobileDetails({
                    ...mobileDetails,
                    country: e.target.value,
                  })
                }
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Sélectionnez un pays</option>
                {africanCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {formErrors.mobileCountry && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4" />{" "}
                  {formErrors.mobileCountry}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                value={mobileDetails.operator}
                onChange={(e) =>
                  setMobileDetails({
                    ...mobileDetails,
                    operator: e.target.value,
                  })
                }
                placeholder="Opérateur (ex: Orange, MTN, Airtel)"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {formErrors.mobileOperator && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4" />{" "}
                  {formErrors.mobileOperator}
                </p>
              )}
            </div>
          </motion.div>
        );
      case "domicile":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 border-t pt-4"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
              Paiement à domicile
            </h2>
            <p className="text-gray-600 pt-3">
              Un agent vous contactera pour organiser le paiement à votre
              domicile.
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  // Expressions régulières détaillées
  const validationRegex = {
    // Nom complet : Lettres, espaces, traits d'union, accents
    nom: /^[A-Za-zÀ-ÿ\- ]{2,50}$/,

    // Email : Standard avec support des domaines internationaux
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    // Téléphone : Commence par + ou 0, suivi de 9-15 chiffres
    phone: /^(\+|0)[1-9][0-9]{8,14}$/,

    // Quartier : Lettres, chiffres, espaces, traits d'union, accents
    quartier: /^[A-Za-zÀ-ÿ0-9\- ]{2,50}$/,

    // Rue : Lettres, chiffres, espaces, traits d'union, accents
    rue: /^[A-Za-zÀ-ÿ0-9\- ]{2,100}$/,

    // Bâtiment : Lettres, chiffres, espaces, traits d'union
    batiment: /^[A-Za-zÀ-ÿ0-9\- ]{1,50}$/,

    // Carte de crédit : 16 chiffres exactement
    cardNumber: /^[0-9]{16}$/,

    // Date d'expiration : Format MM/AA
    cardExpiry: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,

    // CVC : 3 ou 4 chiffres
    cardCVC: /^[0-9]{3,4}$/,

    // Numéro mobile : Commence par + ou 0, 9-15 chiffres
    mobileNumber: /^(\+|0)[1-9][0-9]{8,14}$/,

    // Opérateur mobile : Lettres, espaces
    mobileOperator: /^[A-Za-zÀ-ÿ ]{2,30}$/,
  };

  const validateForm = () => {
    const errors = {};

    // Validation du nom
    if (!formData.nom.trim()) {
      errors.nom = "Nom complet est requis";
    } else if (!validationRegex.nom.test(formData.nom)) {
      errors.nom =
        "Nom invalide (2-50 caractères, lettres et espaces uniquement)";
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      errors.email = "Email est requis";
    } else if (!validationRegex.email.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }

    // Validation du téléphone
    if (!formData.phone.trim()) {
      errors.phone = "Numéro de téléphone est requis";
    } else if (!validationRegex.phone.test(formData.phone)) {
      errors.phone = "Numéro de téléphone invalide (9-15 chiffres)";
    }

    // Validation de la région
    if (!formData.region.trim()) {
      errors.region = "Région est requise";
    }

    // Validation du quartier
    if (!formData.quartier.trim()) {
      errors.quartier = "Quartier est requis";
    } else if (!validationRegex.quartier.test(formData.quartier)) {
      errors.quartier = "Quartier invalide";
    }

    // Validation de la rue (optionnel mais avec validation si rempli)
    if (formData.rue.trim() && !validationRegex.rue.test(formData.rue)) {
      errors.rue = "Rue invalide";
    }

    // Validation du bâtiment (optionnel mais avec validation si rempli)
    if (
      formData.batiment.trim() &&
      !validationRegex.batiment.test(formData.batiment)
    ) {
      errors.batiment = "Bâtiment invalide";
    }

    // Validation du mode de paiement
    if (!selectedPayment) {
      errors.payment = "Veuillez sélectionner un mode de paiement";
    }

    // Validation spécifique au mode de paiement
    switch (selectedPayment) {
      case "masterCard":
      case "visa":
        // Validation du numéro de carte
        if (!cardDetails.number.trim()) {
          errors.cardNumber = "Numéro de carte requis";
        } else if (!validationRegex.cardNumber.test(cardDetails.number)) {
          errors.cardNumber = "Numéro de carte invalide (16 chiffres)";
        }

        // Validation de l'expiration
        if (!cardDetails.expiry.trim()) {
          errors.cardExpiry = "Date d'expiration requise";
        } else if (!validationRegex.cardExpiry.test(cardDetails.expiry)) {
          errors.cardExpiry = "Format de date invalide (MM/AA)";
        }

        // Validation du CVC
        if (!cardDetails.cvc.trim()) {
          errors.cardCVC = "CVC requis";
        } else if (!validationRegex.cardCVC.test(cardDetails.cvc)) {
          errors.cardCVC = "CVC invalide (3-4 chiffres)";
        }
        break;

      case "mobileMoney":
        // Validation du numéro mobile
        if (!mobileDetails.number.trim()) {
          errors.mobileNumber = "Numéro mobile requis";
        } else if (!validationRegex.mobileNumber.test(mobileDetails.number)) {
          errors.mobileNumber = "Numéro mobile invalide";
        }

        // Validation du pays
        if (!mobileDetails.country) {
          errors.mobileCountry = "Pays requis";
        }

        // Validation de l'opérateur
        if (!mobileDetails.operator.trim()) {
          errors.mobileOperator = "Opérateur requis";
        } else if (
          !validationRegex.mobileOperator.test(mobileDetails.operator)
        ) {
          errors.mobileOperator = "Nom d'opérateur invalide";
        }
        break;

      default:
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentClick = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log("Données du formulaire:", formData);
      setPaiementProduit(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container rounded-lg p-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-auto">
          {/* Première carte */}
          <form
            // onSubmit={handlePaymentClick}
            className="w-full p-4 sm:p-6 md:p-8 transition-all duration-300"
          >
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
                Informations Personnelles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <label
                    className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                    htmlFor="nom"
                  >
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    required
                    className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg
                     border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent 
                     transition-all duration-300
                     ${formErrors.nom ? "border-red-500" : "border-gray-300"}
                     `}
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                  />
                  {formErrors.nom && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4" /> {formErrors.nom}
                    </p>
                  )}
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <label
                    className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                    htmlFor="email"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4" />{" "}
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <label
                    className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                    htmlFor="phone"
                  >
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4" />{" "}
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
                Adresse de Livraison
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <label
                    className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                    htmlFor="region"
                  >
                    Région *
                  </label>
                  <select
                    id="region"
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, region: e.target.value })
                    }
                  >
                    <option value="">Sélectionnez une région</option>
                    <option value="Niamey">Niamey</option>
                    <option value="Maradi">Maradi</option>
                    <option value="Dosso">Dosso</option>
                    <option value="Zinder">Zinder</option>
                    <option value="Agadez">Agadez</option>
                    <option value="Diffa">Diffa</option>
                    <option value="Tillaberi">Tillaberi</option>
                    <option value="Tahoua">Tahoua</option>
                  </select>
                  {formErrors.region && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4" />{" "}
                      {formErrors.region}
                    </p>
                  )}
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
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, quartier: e.target.value })
                    }
                  />
                  {formErrors.quartier && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4" />{" "}
                      {formErrors.quartier}
                    </p>
                  )}
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <label
                    className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                    htmlFor="rue"
                  >
                    Rue
                  </label>
                  <input
                    type="text"
                    id="rue"
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, rue: e.target.value })
                    }
                  />
                  {formErrors.rue && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4" /> {formErrors.rue}
                    </p>
                  )}
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <label
                    className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                    htmlFor="batiment"
                  >
                    Bâtiment/Immeuble
                  </label>
                  <input
                    type="text"
                    id="batiment"
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, batiment: e.target.value })
                    }
                  />
                  {formErrors.batiment && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4" />{" "}
                      {formErrors.batiment}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
                Instructions Supplémentaires
              </h2>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label
                  className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2"
                  htmlFor="instructions"
                >
                  Instructions pour le livreur
                </label>
                <textarea
                  id="instructions"
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Points de repère, instructions spéciales..."
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </form>

          {/* Deuxième carte */}
          <div>
            <div className="flex justify-center items-center"></div>
            <div className="p-6 w-full transition-all duration-300">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
                Mode de paiement
              </h1>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  {
                    id: "masterCard",
                    logo: MasterCard,
                    label: "MasterCard",
                    color: "#30A08B",
                  },
                  {
                    id: "visa",
                    logo: VisaCard,
                    label: "Visa",
                    color: "#B2905F",
                  },
                  {
                    id: "mobileMoney",
                    logo: MobileMoney,
                    label: "Mobile Money",
                    color: "#B17236",
                  },
                  {
                    id: "domicile",
                    logo: DomicileCard,
                    label: "Domicile",
                    color: "#30A08B",
                  },
                ].map(({ id, logo, label, color }) => (
                  <motion.label
                    key={id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center justify-center ${
                      selectedPayment === id
                        ? "bg-opacity-100 "
                        : "bg-opacity-50"
                    } text-white p-4 rounded-lg transition-all duration-300 cursor-pointer`}
                    style={{ backgroundColor: color }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedPayment === id}
                      onChange={() => handlePress(id)}
                      className="sr-only" // Hide the default checkbox
                    />

                    <div className="flex items-center justify-center mb-2">
                      <div
                        className={`w-5 h-5 border-2 rounded-full mr-2 flex items-center justify-center ${
                          selectedPayment === id ? "bg-white" : "bg-transparent"
                        }`}
                      >
                        {selectedPayment === id && (
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                        )}
                      </div>
                      <img src={logo} alt={label} className="h-8" />
                    </div>
                    <span className="text-sm">{label}</span>
                  </motion.label>
                ))}
              </div>
              {renderSelectedPaymentPage()}
            </div>
          </div>
        </div>
        <motion.button
          onClick={handlePaymentClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-[#30A08B] text-white p-3 rounded-lg w-full shadow-md hover:bg-opacity-90 transition-all duration-300"
        >
          <span>Confirmer le paiement</span>
        </motion.button>
        {paiementProduit && (
          <div className="min-h-screen flex justify-center items-center bg-black bg-opacity-10 fixed inset-0 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center">
              <div className="flex justify-center mb-4">
                <Check className="h-12 w-12 text-green-600 animate-bounce" />
              </div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                Commande confirmée !
              </h2>
              <p className="text-gray-700 mb-4">
                Merci pour votre achat. Vous recevrez bientôt un e-mail de
                confirmation.
              </p>
              <button
                onClick={() => navigation("/Commande")}
                className="w-full bg-[#30A08B] text-white py-2 rounded-lg font-semibold hover:bg-[#30A08B]/90 transition duration-200"
              >
                Mes commandes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;

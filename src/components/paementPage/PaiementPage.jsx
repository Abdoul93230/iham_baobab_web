import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MasterCard from "./paiementPhoto/masterCard.jpeg";
import VisaCard from "./paiementPhoto/VisaCard.png";
import DomicileCard from "./paiementPhoto/domicile.jpeg";
import MobileMoney from "./paiementPhoto/MobileMoney.png";
import axios from "axios";

import Airtel from "./paiementPhoto/Aiertel.jpg";
import Moov from "./paiementPhoto/Moov.png";
import Zamani from "./paiementPhoto/Zamani.jpeg";
import Mtn from "./paiementPhoto/MTN.png";

const PaiementPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
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
  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #FFF",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const [onSubmit, setOnSubmit] = useState(false);

  const handlePress = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };
  const BackendUrl = process.env.REACT_APP_Backend_Url;

  const renderSelectedPaymentPage = () => {
    switch (selectedPayment) {
      case "master Card":
      case "Visa":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 border-t pt-4"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
              Détails de la carte{" "}
              {selectedPayment === "master Card" ? "MasterCard" : "Visa"}
            </h2>
            <div className="top">
              <label htmlFor="number">Card Number</label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                placeholder="Valid Card Number"
                id="number"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div className="bottom">
              <div className="left e">
                <label htmlFor="date">Expiration Date</label>
                <input
                  id="date"
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  type="date"
                  className="p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="right e">
                <label htmlFor="password">CV CODE</label>
                <input
                  id="password"
                  value={cardDetails.cvc}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvc: e.target.value })
                  }
                  type="password"
                  placeholder="CVC"
                  className="p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
            </div>
          </motion.div>
        );
      case "Mobile Money":
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
            <div className="MC">
              <div className="img flex justify-center gap-4 my-4">
                <img src={Airtel} alt="Airtel" className="h-8" />
                <img src={Moov} alt="Moov" className="h-8" />
                <img src={Zamani} alt="Zamani" className="h-8" />
                <img src={Mtn} alt="MTN" className="h-8" />
              </div>
            </div>
            <form onSubmit={handlePaymentSubmit}>
              <div className="num flex gap-2">
                <select
                  value={mobileDetails.operateur}
                  onChange={(e) =>
                    setMobileDetails({
                      ...mobileDetails,
                      operateur: e.target.value,
                    })
                  }
                  className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  <option value="227">227</option>
                  <option value="229">229</option>
                </select>
                <input
                  type="text"
                  value={
                    mobileDetails.number.length > 8 &&
                    (mobileDetails.number.substring(0, 3) === "227" ||
                      mobileDetails.number.substring(0, 3) === "229")
                      ? mobileDetails.number.substring(3)
                      : mobileDetails.number
                  }
                  onChange={(e) =>
                    setMobileDetails({
                      ...mobileDetails,
                      number: e.target.value,
                    })
                  }
                  placeholder="Numéro de téléphone"
                  className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
            </form>
          </motion.div>
        );
      case "Payment a domicile":
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;
        if (!userId) {
          setSubmitStatus({
            loading: false,
            error: "ID utilisateur non trouvé. Veuillez vous reconnecter.",
            success: false,
          });
          return;
        }

        // Récupérer la méthode de paiement
        const paymentResponse = await axios.get(
          `${BackendUrl}/getMoyentPaymentByClefUser/${userId}`
        );
        if (paymentResponse.data.paymentMethod) {
          const payment = paymentResponse.data.paymentMethod;
          if (payment.type) {
            setSelectedPayment(payment.type);
            if (payment.type === "Mobile Money") {
              setMobileDetails({
                number: payment.phone || "",
                operateur: payment.operateur || "227",
              });
            } else if (
              payment.type === "Visa" ||
              payment.type === "master Card"
            ) {
              setCardDetails({
                number: payment.numeroCard || "",
                expiry: payment.expire || "",
                cvc: payment.cvc || "",
              });
            }
          }
        }
      } catch (error) {
        setSubmitStatus({
          loading: false,
          error: "Erreur lors du chargement des données",
          success: false,
        });
      }
    };

    fetchData();
  }, []);

  const validatePaymentInfo = () => {
    const errors = [];

    if (!selectedPayment) {
      errors.push("Veuillez choisir un moyen de paiement");
      return errors;
    }

    if (selectedPayment === "Visa") {
      if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardDetails.number)) {
        errors.push("Le numéro de la carte Visa n'est pas valide");
      }
      if (!/^[0-9]{3}$/.test(cardDetails.cvc)) {
        errors.push("Le code CVC n'est pas valide");
      }
      if (!cardDetails.expiry) {
        errors.push("Veuillez sélectionner la date d'expiration");
      }
    } else if (selectedPayment === "master Card") {
      if (!/^(?:5[1-5][0-9]{14})$/.test(cardDetails.number)) {
        errors.push("Le numéro de la carte MasterCard n'est pas valide");
      }
      if (!/^[0-9]{3}$/.test(cardDetails.cvc)) {
        errors.push("Le code CVC n'est pas valide");
      }
      if (!cardDetails.expiry) {
        errors.push("Veuillez sélectionner la date d'expiration");
      }
    } else if (selectedPayment === "Mobile Money") {
      if (!/^[0-9]{8,}$/.test(mobileDetails.number)) {
        errors.push("Le format du numéro n'est pas valide");
      }
    }

    return errors;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null, success: false });
    setOnSubmit(true);

    try {
      const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;
      if (!userId) {
        throw new Error(
          "ID utilisateur non trouvé. Veuillez vous reconnecter."
        );
      }

      // Valider les informations

      const paymentErrors = validatePaymentInfo();
      if (paymentErrors.length > 0) {
        setSubmitStatus({
          loading: false,
          error: [...paymentErrors].join(", "),
          success: false,
        });
        setOnSubmit(false);
        return;
      }

      // Sauvegarder le mode de paiement
      const paymentData = { clefUser: userId };
      if (selectedPayment === "Visa" || selectedPayment === "master Card") {
        paymentData.option = selectedPayment;
        paymentData.numeroCard = cardDetails.number;
        paymentData.cvc = cardDetails.cvc;
        paymentData.expire = cardDetails.expiry;
      } else if (selectedPayment === "Mobile Money") {
        paymentData.option = "Mobile Money";
        paymentData.numero =
          mobileDetails.number.length === 8
            ? mobileDetails.operateur + mobileDetails.number
            : mobileDetails.number;
        paymentData.operateur = mobileDetails.operateur;
      } else {
        paymentData.option = "Payment a domicile";
      }
      await axios.post(`${BackendUrl}/createMoyentPayment`, paymentData);

      setOnSubmit(false);
    } catch (error) {
      console.error("Erreur:", error);
      setSubmitStatus({
        loading: false,
        error: error.message || "Une erreur est survenue",
        success: false,
      });
      setOnSubmit(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Mode de paiement
        </h1>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {[
            {
              id: "master Card",
              logo: MasterCard,
              label: "MasterCard",
              color: "#30A08B",
            },
            {
              id: "Visa",
              logo: VisaCard,
              label: "Visa",
              color: "#B2905F",
            },
            {
              id: "Mobile Money",
              logo: MobileMoney,
              label: "Mobile Money",
              color: "#B17236",
            },
            {
              id: "Payment a domicile",
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
                selectedPayment === id ? "bg-opacity-100" : "bg-opacity-50"
              } text-white p-4 rounded-lg transition-all duration-300 cursor-pointer`}
              style={{ backgroundColor: color }}
            >
              <input
                type="checkbox"
                checked={selectedPayment === id}
                onChange={() => handlePress(id)}
                className="sr-only"
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

        {onSubmit ? (
          <div style={spinnerStyle}></div>
        ) : (
          <motion.button
            onClick={handlePaymentSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-[#30A08B] text-white p-3 rounded-lg w-full shadow-md hover:bg-opacity-90 transition-all duration-300"
          >
            Confirmer le paiement
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default PaiementPage;

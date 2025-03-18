import React, { useState } from "react";
import { motion } from "framer-motion";
import MasterCard from "../paementPage/paiementPhoto/masterCard.jpeg";
import VisaCard from "../paementPage/paiementPhoto/VisaCard.png";
import DomicileCard from "../paementPage/paiementPhoto/domicile.jpeg";
import MobileMoney from "../paementPage/paiementPhoto/MobileMoney.png";
import Airtel from "../paementPage/paiementPhoto/Aiertel.jpg";
import Moov from "../paementPage/paiementPhoto/Moov.png";
import Zamani from "../paementPage/paiementPhoto/Zamani.jpeg";
import Mtn from "../paementPage/paiementPhoto/MTN.png";
import zeyna from "../../Images/zeyna.jpg";
import amana from "../../Images/amana.jpg";
import nita from "../../Images/nita.jpg";
import { AlertCircle, Check, Info, CreditCard } from "lucide-react";

const PaiementPage = ({
  selectedPayment,
  setSelectedPayment,
  cardDetails,
  setCardDetails,
  mobileDetails,
  setMobileDetails,
  submitStatus,
  setSubmitStatus,
  onSubmit,
  setOnSubmit,
  validatePaymentInfo,
  handlePress,
  handlePaymentSubmit,
  getPaymentDescription,
  formatCardNumber,
}) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const renderSelectedPaymentPage = () => {
    switch (selectedPayment) {
      case "master Card":
      case "Visa":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-semibold text-[#B17236]">
                Carte{" "}
                {selectedPayment === "master Card" ? "MasterCard" : "Visa"}
              </h2>
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50 text-sm text-blue-800 flex items-start gap-2 shadow-sm transition-all duration-300 ease-in-out">
                <Info className="h-4 w-4 mt-1 text-blue-600" />
                <p className="leading-snug">{getPaymentDescription()}</p>
              </div>
            </div>

            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="relative mb-3">
                <div className="absolute top-3 left-3">
                  <CreditCard className="text-gray-400 h-5 w-5" />
                </div>
                <input
                  type="text"
                  inputMode="numeric" // ⬅ Permet d'afficher le clavier numérique sur mobile
                  pattern="[0-9]*" // ⬅ Empêche la saisie de lettres sur certains navigateurs
                  value={formatCardNumber(cardDetails.number || "")}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/[^\d]/g, ""); // Supprime tout ce qui n’est pas chiffre
                    setCardDetails({ ...cardDetails, number: onlyDigits });
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="pl-10 p-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM/AA"
                  maxLength={5}
                  value={cardDetails.expiry || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d]/g, "");
                    let expiry = "";
                    if (val.length > 2) {
                      expiry = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                    } else {
                      expiry = val;
                    }
                    setCardDetails({ ...cardDetails, expiry });
                  }}
                  className="p-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                />
                <input
                  type="password"
                  placeholder="CVC"
                  maxLength={3}
                  value={cardDetails.cvc || ""}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cvc: e.target.value.replace(/[^\d]/g, ""),
                    })
                  }
                  className="p-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                />
              </div>
            </div>
          </motion.div>
        );
      case "Mobile Money":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-semibold text-[#B17236]">
                Mobile Money
              </h2>
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50 text-xs text-blue-800 flex items-start sm:items-center gap-2 shadow-sm transition-all duration-300 ease-in-out">
                <Info className="h-3 w-3 mt-0.5 text-blue-600" />
                <p className="leading-snug">{getPaymentDescription()}</p>
              </div>
            </div>

            <div className="flex justify-center gap-3 my-2">
              <img src={Airtel} alt="Airtel" className="h-6" />
              <img src={Moov} alt="Moov" className="h-6" />
              <img src={Zamani} alt="Zamani" className="h-6" />
              <img src={Mtn} alt="MTN" className="h-6" />
            </div>

            <div className="flex gap-2 mt-2">
              <select
                value={mobileDetails.operateur}
                onChange={(e) =>
                  setMobileDetails({
                    ...mobileDetails,
                    operateur: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all w-24"
              >
                <option value="227">+227</option>
                <option value="229">+229</option>
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
                    number: e.target.value.replace(/[^\d]/g, ""),
                  })
                }
                placeholder="90123456"
                className="p-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </motion.div>
        );
      case "nita":
      case "amana":
      case "zeyna":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-semibold text-[#B17236]">
                {selectedPayment === "nita"
                  ? "MyNita"
                  : selectedPayment === "zeyna"
                  ? "Zeyna"
                  : "Amana"}
              </h2>
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50 text-xs text-blue-800 flex items-start sm:items-center gap-2 shadow-sm transition-all duration-300 ease-in-out">
                <Info className="h-3 w-3 mt-0.5 text-blue-600" />
                <p className="leading-snug">{getPaymentDescription()}</p>
              </div>
            </div>

            <div className="flex justify-center my-2">
              <img
                src={
                  selectedPayment === "nita"
                    ? nita
                    : selectedPayment === "zeyna"
                    ? zeyna
                    : amana
                }
                alt={selectedPayment}
                className="h-8"
              />
            </div>

            <div className="flex gap-2 mt-2">
              <select
                value={mobileDetails.operateur}
                onChange={(e) =>
                  setMobileDetails({
                    ...mobileDetails,
                    operateur: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all w-24"
              >
                <option value="227">+227</option>
                <option value="229">+229</option>
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
                    number: e.target.value.replace(/[^\d]/g, ""),
                  })
                }
                placeholder="90123456"
                className="p-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </motion.div>
        );
      case "Payment a domicile":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-semibold text-[#B17236]">
                Paiement à domicile
              </h2>
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50 text-xs text-blue-800 flex items-start sm:items-center gap-2 shadow-sm transition-all duration-300 ease-in-out">
                <Info className="h-3 w-3 mt-0.5 text-blue-600" />
                <p className="leading-snug">{getPaymentDescription()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#30A08B] text-white flex items-center justify-center mr-2">
                  1
                </div>
                <span>Confirmation par téléphone</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#30A08B] text-white flex items-center justify-center mr-2">
                  2
                </div>
                <span>Livraison par un agent</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#30A08B] text-white flex items-center justify-center mr-2">
                  3
                </div>
                <span>Paiement espèces/carte</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#30A08B] text-white flex items-center justify-center mr-2">
                  4
                </div>
                <span>Remise d'un reçu</span>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="text-center text-gray-600 py-3 text-sm">
            <p>Veuillez sélectionner un mode de paiement pour continuer.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100 p-2">
      <div className="p-4 w-full max-w-lg bg-white rounded-lg shadow-lg">
        {submitStatus?.error && (
          <div className="mb-3 p-2 rounded bg-red-100 text-red-700 text-sm">
            <p className="flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              {submitStatus?.error}
            </p>
          </div>
        )}
        {submitStatus?.success && (
          <div className="mb-3 p-2 rounded bg-green-100 text-green-700 text-sm">
            <p className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Commande enregistrée avec succès
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold">Mode de paiement</h1>
          <p className="text-gray-500 text-sm">Choisissez votre méthode</p>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
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
            <motion.div
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex flex-col items-center justify-center ${
                selectedPayment === id ? "ring-2 ring-offset-1" : ""
              } text-white p-2 rounded-lg transition-all duration-200 cursor-pointer`}
              style={{ backgroundColor: color }}
              onClick={() => handlePress(id)}
            >
              <div className="flex items-center justify-center mb-1">
                <img src={logo} alt={label} className="h-6" />
              </div>
              <span className="text-xs">{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            {
              id: "nita",
              logo: nita,
              label: "MyNita",
              color: "#30A08B",
            },
            {
              id: "zeyna",
              logo: zeyna,
              label: "Zeyna",
              color: "#B2905F",
            },
            {
              id: "amana",
              logo: amana,
              label: "Amana",
              color: "#B17236",
            },
          ].map(({ id, logo, label, color }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex flex-col items-center justify-center ${
                selectedPayment === id ? "ring-2 ring-offset-1" : ""
              } text-white p-2 rounded-lg transition-all duration-200 cursor-pointer`}
              style={{ backgroundColor: color }}
              onClick={() => handlePress(id)}
            >
              <div className="flex items-center justify-center mb-1">
                <img src={logo} alt={label} className="h-6" />
              </div>
              <span className="text-xs">{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mb-4 min-h-24">{renderSelectedPaymentPage()}</div>

        {selectedPayment && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* <button
              onClick={handlePaymentSubmit}
              className="w-full bg-[#30A08B] hover:bg-[#278878] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              disabled={submitStatus?.loading}
            >
              {submitStatus?.loading ? (
                <div
                  style={{
                    border: "3px solid rgba(255, 255, 255, 0.3)",
                    borderTop: "3px solid #FFF",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
              ) : (
                "Valider le paiement"
              )}
            </button> */}
            <p className="text-xs text-center mt-1 text-gray-500">
              En validant, vous acceptez nos conditions générales de vente
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaiementPage;

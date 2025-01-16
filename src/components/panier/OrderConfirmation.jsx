// OrderConfirmation.js
import React, { useState, useEffect } from "react";
import { AlertCircle, Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import MasterCard from "../paementPage/paiementPhoto/masterCard.jpeg";
import VisaCard from "../paementPage/paiementPhoto/VisaCard.png";
import DomicileCard from "../paementPage/paiementPhoto/domicile.jpeg";
import MobileMoney from "../paementPage/paiementPhoto/MobileMoney.png";
import Airtel from "../paementPage/paiementPhoto/Aiertel.jpg";
import Moov from "../paementPage/paiementPhoto/Moov.png";
import Zamani from "../paementPage/paiementPhoto/Zamani.jpeg";
import Mtn from "../paementPage/paiementPhoto/MTN.png";

const BackendUrl = process.env.REACT_APP_Backend_Url;

const OrderConfirmation = ({ onClose }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [orderTotal, setOrderTotal] = useState(() => {
    const savedTotal = localStorage.getItem("orderTotal");
    return savedTotal ? parseFloat(savedTotal) : 0;
  });
  const [orderCodeP, setOrderCodeP] = useState(() => {
    const savedCodeP = localStorage.getItem("orderCodeP");
    return savedCodeP ? JSON.parse(savedCodeP) : null;
  });
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [mobileDetails, setMobileDetails] = useState({
    number: "",
    operateur: "227",
  });
  const [onSubmit, setOnSubmit] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    email: "",
    numero: "",
    region: "",
    quartier: "",
    description: "",
  });
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const [paiementProduit, setPaiementProduit] = useState(false);

  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #FFF",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  function generateUniqueID() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Ajoute un zéro au début si le mois est < 10
    const day = String(now.getDate()).padStart(2, "0"); // Ajoute un zéro au début si le jour est < 10
    const hours = String(now.getHours()).padStart(2, "0"); // Ajoute un zéro au début si l'heure est < 10
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Ajoute un zéro au début si la minute est < 10
    const seconds = String(now.getSeconds()).padStart(2, "0"); // Ajoute un zéro au début si la seconde est < 10

    // Concatène les différentes parties pour former l'identifiant unique
    const uniqueID = `${year}${month}${day}${hours}${minutes}${seconds}`;

    return uniqueID;
  }

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

        // Récupérer l'adresse de livraison
        const addressResponse = await axios.get(
          `${BackendUrl}/getAddressByUserKey/${userId}`
        );

        if (addressResponse.data.address) {
          const address = addressResponse.data.address;
          setDeliveryInfo({
            name: address.name || "",
            email: address.email || "",
            numero: address.numero || "",
            region: address.region || "",
            quartier: address.quartier || "",
            description: address.description || "",
          });
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

  useEffect(() => {
    const loadIPayScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://i-pay.money/checkout.js";
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadIPayScript().catch(console.error);

    return () => {
      const script = document.querySelector(
        'script[src="https://i-pay.money/checkout.js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const validateDeliveryInfo = () => {
    const errors = [];

    if (!deliveryInfo.name || deliveryInfo.name.length < 2) {
      errors.push("Le nom doit contenir au moins 2 caractères");
    }

    if (
      deliveryInfo.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryInfo.email)
    ) {
      errors.push("L'adresse email n'est pas valide");
    }

    if (!deliveryInfo.numero || deliveryInfo.numero.length < 8) {
      errors.push("Le numéro de téléphone doit contenir au moins 8 chiffres");
    }

    if (!deliveryInfo.region || deliveryInfo.region.length < 3) {
      errors.push("La région doit contenir au moins 3 caractères");
    }

    if (!deliveryInfo.quartier || deliveryInfo.quartier.length < 2) {
      errors.push("Le quartier doit contenir au moins 2 caractères");
    }

    return errors;
  };

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

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitStatus({
      loading: false,
      error: null,
      success: false,
    });
  };

  const handlePress = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
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
      const deliveryErrors = validateDeliveryInfo();
      const paymentErrors = validatePaymentInfo();
      if (deliveryErrors.length > 0 || paymentErrors.length > 0) {
        setSubmitStatus({
          loading: false,
          error: [...deliveryErrors, ...paymentErrors].join(", "),
          success: false,
        });
        setOnSubmit(false);
        return;
      }

      // Sauvegarder l'adresse
      await axios.post(`${BackendUrl}/createOrUpdateAddress`, {
        ...deliveryInfo,
        email: deliveryInfo.email !== "" ? deliveryInfo.email : null,
        clefUser: userId,
      });

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

      // Préparer les données de la commande
      const panier = JSON.parse(localStorage.getItem("panier"));
      if (!panier || panier.length === 0) {
        throw new Error("Aucun produit n'est sélectionné.");
      }

      const produits = panier.map((item) => ({
        produit: item._id,
        quantite: item.quantity,
        tailles: item.sizes,
        couleurs: item.colors,
      }));

      if (["Visa", "master Card", "Mobile Money"].includes(selectedPayment)) {
        try {
          // Vérifier si une commande en attente existe déjà
          const existingOrder = localStorage.getItem("pendingOrder");
          let commandeId;

          if (existingOrder) {
            // Utiliser la commande existante mais générer un nouveau transactionId
            const orderData = JSON.parse(existingOrder);
            commandeId = orderData.commandeId;

            // Obtenir la référence actuelle
            const currentReference = orderData.transactionId;

            // Générer un nouveau transactionId
            const newTransactionReference = generateUniqueID();

            // Mettre à jour la commande avec le nouveau transactionId
            await axios.put(
              `${process.env.REACT_APP_Backend_Url}/updateCommande`,
              {
                clefUser: userId,
                nbrProduits: produits,
                prix: orderTotal,
                oldReference: currentReference,
                newReference: newTransactionReference,
                livraisonDetails: {
                  customerName: deliveryInfo.name,
                  email: deliveryInfo.email,
                  region: deliveryInfo.region,
                  quartier: deliveryInfo.quartier,
                  numero: deliveryInfo.numero,
                  description: deliveryInfo.description,
                },
                prod: panier,
                ...(orderCodeP?.isValide && {
                  codePro: true,
                  idCodePro: orderCodeP._id,
                }),
              }
            );

            // Sauvegarder les informations de la commande avec le nouveau transactionId
            localStorage.setItem(
              "pendingOrder",
              JSON.stringify({
                commandeId,
                transactionId: newTransactionReference,
                timestamp: new Date().getTime(),
              })
            );
          } else {
            // Créer une nouvelle commande avec le transactionId
            const transactionId = generateUniqueID();
            const commandeData = {
              clefUser: userId,
              nbrProduits: produits,
              prix: orderTotal,
              statusPayment: "en attente",
              livraisonDetails: {
                customerName: deliveryInfo.name,
                email: deliveryInfo.email,
                region: deliveryInfo.region,
                quartier: deliveryInfo.quartier,
                numero: deliveryInfo.numero,
                description: deliveryInfo.description,
              },
              prod: panier,
              reference: transactionId,
              ...(orderCodeP?.isValide && {
                codePro: true,
                idCodePro: orderCodeP._id,
              }),
            };

            const response = await axios.post(
              `${BackendUrl}/createCommande`,
              commandeData
            );
            commandeId = response.data._id;

            // Sauvegarder les informations de la commande
            localStorage.setItem(
              "pendingOrder",
              JSON.stringify({
                commandeId,
                transactionId,
                timestamp: new Date().getTime(),
              })
            );
          }

          // Stocker les informations de paiement
          localStorage.setItem(
            "paymentInfo",
            JSON.stringify({
              amount: orderTotal,
              transactionId: JSON.parse(localStorage.getItem("pendingOrder"))
                .transactionId,
            })
          );

          // Rediriger vers la page de paiement
          window.location.href = "/payment.html";
        } catch (error) {
          console.error("Erreur:", error);
          alert("Une erreur est survenue lors de la création de la commande");
        }
      } else {
        // Paiement à la livraison
        const transactionId = generateUniqueID();
        const commandeData = {
          clefUser: userId,
          nbrProduits: produits,
          prix: orderTotal,
          statusPayment: "payé à la livraison",
          livraisonDetails: {
            customerName: deliveryInfo.name,
            email: deliveryInfo.email,
            region: deliveryInfo.region,
            quartier: deliveryInfo.quartier,
            numero: deliveryInfo.numero,
            description: deliveryInfo.description,
          },
          reference: transactionId,
          prod: panier,
          ...(orderCodeP?.isValide && {
            codePro: true,
            idCodePro: orderCodeP._id,
          }),
        };

        const response = await axios.post(
          `${BackendUrl}/createCommande`,
          commandeData
        );

        if (response.status === 200) {
          localStorage.removeItem("panier");
          localStorage.removeItem("orderTotal");

          if (orderCodeP?.isValide) {
            await axios.put(`${BackendUrl}/updateCodePromo`, {
              codePromoId: orderCodeP._id,
              isValide: false,
            });
            localStorage.removeItem("orderCodeP");
          }

          setSubmitStatus({
            loading: false,
            error: null,
            success: true,
          });
          setPaiementProduit(true);
        }
      }

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
              <div className="btn mt-4">
                {onSubmit ? (
                  <div style={spinnerStyle}></div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-[#30A08B] text-white py-2 rounded-lg font-semibold hover:bg-[#30A08B]/90 transition duration-200"
                  >
                    Confirmer
                  </button>
                )}
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

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container rounded-lg p-6 overflow-hidden">
        {submitStatus.error && (
          <div className={`mb-4 p-4 rounded bg-red-100 text-red-700`}>
            <p className="flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              {submitStatus.error}
            </p>
          </div>
        )}
        {submitStatus.success && (
          <div className={`mb-4 p-4 rounded bg-green-100 text-green-700`}>
            <p className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Commande enregistrée avec succès
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-auto">
          {/* Première carte - Informations de livraison */}
          <div className="w-full p-4 sm:p-6 md:p-8 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2 mb-4">
              Informations de livraison
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={deliveryInfo.name}
                  onChange={handleDeliveryChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                  placeholder="Votre nom complet"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={deliveryInfo.email}
                  onChange={handleDeliveryChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                  placeholder="Votre email"
                />
              </div>
              <div>
                <label
                  htmlFor="numero"
                  className="block text-sm font-medium text-gray-700"
                >
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="numero"
                  name="numero"
                  value={deliveryInfo.numero}
                  onChange={handleDeliveryChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                  placeholder="Votre numéro de téléphone"
                />
              </div>
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  Région
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={deliveryInfo.region}
                  onChange={handleDeliveryChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                  placeholder="Votre région"
                />
              </div>
              <div>
                <label
                  htmlFor="quartier"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quartier
                </label>
                <input
                  type="text"
                  id="quartier"
                  name="quartier"
                  value={deliveryInfo.quartier}
                  onChange={handleDeliveryChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                  placeholder="Votre quartier"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instructions de livraison
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={deliveryInfo.description}
                  onChange={handleDeliveryChange}
                  rows="3"
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                  placeholder="Instructions supplémentaires pour la livraison"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Deuxième carte - Méthode de paiement */}
          <div>
            <div className="p-6 w-full transition-all duration-300">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
                Mode de paiement
              </h1>
              <div className="mt-5 grid grid-cols-2 gap-4">
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
                      selectedPayment === id
                        ? "bg-opacity-100"
                        : "bg-opacity-50"
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
            </div>
          </div>
        </div>

        <motion.button
          onClick={handlePaymentSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-[#30A08B] text-white p-3 rounded-lg w-full shadow-md hover:bg-opacity-90 transition-all duration-300"
        >
          {submitStatus.loading ? (
            <div style={spinnerStyle} className="animate-spin"></div>
          ) : (
            <span>Confirmer la commande {orderTotal} fcfa</span>
          )}
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
                Merci pour votre commande. Vous recevrez bientôt un e-mail de
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

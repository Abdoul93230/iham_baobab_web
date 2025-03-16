// OrderConfirmation.js
import React, { useState, useEffect } from "react";
import { AlertCircle, Check, CreditCard, Info } from "lucide-react";
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
import zeyna from "../../Images/zeyna.jpg";
import amana from "../../Images/amana.jpg";
import nita from "../../Images/nita.jpg";
import LoadingIndicator from "@/pages/LoadingIndicator";
import PaiementPage from "./PaiementPage";
import { use } from "react";

const BackendUrl = process.env.REACT_APP_Backend_Url;

const OrderConfirmation = ({ onClose }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [message, setMessage] = useState("");
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

  const user = JSON.parse(localStorage.getItem("userEcomme"));

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
      const rawNum = String(cardDetails.number || "").replace(/\s|-/g, ""); // Numéro sans espaces ni tirets

      if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(rawNum)) {
        errors.push("Le numéro de la carte Visa n'est pas valide");
        console.log(rawNum);
      }
      if (!/^[0-9]{3}$/.test(cardDetails.cvc)) {
        errors.push("Le code CVC n'est pas valide");
      }
      if (!cardDetails.expiry) {
        errors.push("Veuillez sélectionner la date d'expiration");
      }
    } else if (selectedPayment === "master Card") {
      const rawNum = String(cardDetails.number || "").replace(/\s|-/g, ""); // Numéro sans espaces ni tirets

      if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(rawNum)) {
        errors.push("Le numéro de la carte Visa n'est pas valide");
        console.log(rawNum);
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
    } else if (
      selectedPayment === "zeyna" ||
      selectedPayment === "nita" ||
      selectedPayment === "amana"
    ) {
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
    // console.log("+" + mobileDetails.operateur + mobileDetails.number);
    setSelectedPayment(paymentMethod);
    // console.log(paymentMethod);
  };

  // const paymentCallback = async (paymentDetails) => {
  //   try {
  //     const response = await axios.post(
  //       `${BackendUrl}/payment_callback`,
  //       paymentDetails
  //     );

  //     if (response.status === 200) {
  //       console.log("Réponse du serveur:", response.data);
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors du callback de paiement:", error);
  //     return false;
  //   }
  //   return true;
  // };

  // const handlePaymentSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmitStatus({ loading: true, error: null, success: false });
  //   setOnSubmit(true);

  //   try {
  //     const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;
  //     if (!userId) {
  //       throw new Error(
  //         "ID utilisateur non trouvé. Veuillez vous reconnecter."
  //       );
  //     }

  //     // Valider les informations
  //     const deliveryErrors = validateDeliveryInfo();
  //     const paymentErrors = validatePaymentInfo();
  //     if (deliveryErrors.length > 0 || paymentErrors.length > 0) {
  //       setSubmitStatus({
  //         loading: false,
  //         error: [...deliveryErrors, ...paymentErrors].join(", "),
  //         success: false,
  //       });
  //       setOnSubmit(false);
  //       return;
  //     }

  //     // Sauvegarder l'adresse
  //     await axios.post(`${BackendUrl}/createOrUpdateAddress`, {
  //       ...deliveryInfo,
  //       email: deliveryInfo.email !== "" ? deliveryInfo.email : null,
  //       clefUser: userId,
  //     });

  //     // Sauvegarder le mode de paiement
  //     const paymentData = { clefUser: userId };
  //     if (selectedPayment === "Visa" || selectedPayment === "master Card") {
  //       paymentData.option = selectedPayment;
  //       paymentData.numeroCard = cardDetails.number;
  //       paymentData.cvc = cardDetails.cvc;
  //       paymentData.expire = cardDetails.expiry;
  //     } else if (
  //       selectedPayment === "zeyna" ||
  //       selectedPayment === "nita" ||
  //       selectedPayment === "amana"
  //     ) {
  //       paymentData.option = selectedPayment;
  //     } else if (selectedPayment === "Mobile Money") {
  //       paymentData.option = "Mobile Money";
  //       paymentData.numero =
  //         mobileDetails.number.length === 8
  //           ? mobileDetails.operateur + mobileDetails.number
  //           : mobileDetails.number;
  //       paymentData.operateur = mobileDetails.operateur;
  //     } else {
  //       paymentData.option = "Payment a domicile";
  //     }
  //     // await axios.post(`${BackendUrl}/createMoyentPayment`, paymentData);

  //     // Préparer les données de la commande
  //     const panier = JSON.parse(localStorage.getItem("panier"));
  //     if (!panier || panier.length === 0) {
  //       throw new Error("Aucun produit n'est sélectionné.");
  //     }

  //     const produits = panier.map((item) => ({
  //       produit: item._id,
  //       quantite: item.quantity,
  //       tailles: item.sizes,
  //       couleurs: item.colors,
  //     }));

  //     if (
  //       [
  //         "Visa",
  //         "master Card",
  //         "Mobile Money",
  //         "nita",
  //         "zeyna",
  //         "amana",
  //       ].includes(selectedPayment)
  //     ) {
  //       try {
  //         // Vérifier si une commande en attente existe déjà
  //         const existingOrder = localStorage.getItem("pendingOrder");
  //         let commandeId;

  //         if (existingOrder) {
  //           // Utiliser la commande existante mais générer un nouveau transactionId
  //           const orderData = JSON.parse(existingOrder);
  //           commandeId = orderData.commandeId;

  //           // Obtenir la référence actuelle
  //           const currentReference = orderData.transactionId;

  //           // Générer un nouveau transactionId
  //           const newTransactionReference = generateUniqueID();

  //           // Mettre à jour la commande avec le nouveau transactionId
  //           await axios.put(
  //             `${process.env.REACT_APP_Backend_Url}/updateCommande`,
  //             {
  //               clefUser: userId,
  //               nbrProduits: produits,
  //               prix: orderTotal,
  //               oldReference: currentReference,
  //               newReference: newTransactionReference,
  //               livraisonDetails: {
  //                 customerName: deliveryInfo.name,
  //                 email: deliveryInfo.email,
  //                 region: deliveryInfo.region,
  //                 quartier: deliveryInfo.quartier,
  //                 numero: deliveryInfo.numero,
  //                 description: deliveryInfo.description,
  //               },
  //               prod: panier,
  //               ...(orderCodeP?.isValide && {
  //                 codePro: true,
  //                 idCodePro: orderCodeP._id,
  //               }),
  //             }
  //           );

  //           // Sauvegarder les informations de la commande avec le nouveau transactionId
  //           localStorage.setItem(
  //             "pendingOrder",
  //             JSON.stringify({
  //               commandeId,
  //               transactionId: newTransactionReference,
  //               timestamp: new Date().getTime(),
  //             })
  //           );
  //         } else {
  //           // Créer une nouvelle commande avec le transactionId
  //           const transactionId = generateUniqueID();
  //           const commandeData = {
  //             clefUser: userId,
  //             nbrProduits: produits,
  //             prix: orderTotal,
  //             statusPayment: "en attente",
  //             livraisonDetails: {
  //               customerName: deliveryInfo.name,
  //               email: deliveryInfo.email,
  //               region: deliveryInfo.region,
  //               quartier: deliveryInfo.quartier,
  //               numero: deliveryInfo.numero,
  //               description: deliveryInfo.description,
  //             },
  //             prod: panier,
  //             reference: transactionId,
  //             ...(orderCodeP?.isValide && {
  //               codePro: true,
  //               idCodePro: orderCodeP._id,
  //             }),
  //           };

  //           const response = await axios.post(
  //             `${BackendUrl}/createCommande`,
  //             commandeData
  //           );
  //           commandeId = response.data._id;

  //           // Sauvegarder les informations de la commande
  //           localStorage.setItem(
  //             "pendingOrder",
  //             JSON.stringify({
  //               commandeId,
  //               transactionId,
  //               timestamp: new Date().getTime(),
  //             })
  //           );
  //         }

  //         ////////////////////////////////////getion du payment de la commande by ckomipay //////////////////////////////////

  //         if (selectedPayment === "Visa" || selectedPayment === "master Card") {
  //           const transactionId = JSON.parse(
  //             localStorage.getItem("pendingOrder")
  //           ).transactionId;
  //           const paymentData = {
  //             orderTotal,
  //             transactionId,
  //             orderId: commandeId,
  //             paymentMethod: selectedPayment,
  //             cardNumber: cardDetails.number,
  //             cardCvc: cardDetails.cvc,
  //             cardExpiration: cardDetails.expiry,
  //           };

  //           function formatCardNumber(number) {
  //             return String(number)
  //               .match(/.{1,4}/g)
  //               .join("-");
  //           }
  //           console.log(cardDetails);
  //           const rawNum = String(cardDetails.number || "").replace(
  //             /\s|-/g,
  //             ""
  //           );
  //           const formattedNum = rawNum.match(/.{1,4}/g)?.join("-") || "";
  //           const data_to_send = {
  //             cardNumber: formattedNum,
  //             expiryDate: cardDetails.expiry,
  //             cvv: cardDetails.cvc,
  //             amount: orderTotal,
  //             payerName: JSON.parse(localStorage.getItem("userEcomme"))?.name,
  //             externalRef: transactionId,
  //             browserInfo: {
  //               javaEnabled: false,
  //               javascriptEnabled: true,
  //               screenHeight: 900,
  //               screenWidth: 1440,
  //               TZ: 1,
  //               challengeWindowSize: "05",
  //             },
  //           };

  //           axios
  //             .post(`${BackendUrl}/pay-with-card`, data_to_send)
  //             .then((respose) => {
  //               const reference = respose.data.transactionData.reference;
  //               const externalReference =
  //                 respose.data.transactionData.externalReference;
  //               const redirectUrl = respose.data.redirectUrl;

  //               console.log(respose.data);

  //               if (respose.data.success && respose.data.redirectUrl) {
  //                 window.open(
  //                   respose.data.redirectUrl, // URL à ouvrir
  //                   "_blank", // Ouvre dans une nouvelle fenêtre
  //                   "width=800,height=600,scrollbars=yes,resizable=yes"
  //                 );
  //               }
  //               axios
  //                 .get(`${BackendUrl}/payment_status_card`, {
  //                   params: {
  //                     externalRef: externalReference,
  //                   },
  //                 })
  //                 .then(async (response) => {
  //                   console.log("Réponse de la requête : ", response.data);
  //                   // échec
  //                   if (
  //                     response?.data?.rawResponse?.code === 200 ||
  //                     response?.data?.rawResponse?.code === 201
  //                   ) {
  //                     setSubmitStatus({
  //                       loading: false,
  //                       error:
  //                         response?.data?.rawResponse?.message ||
  //                         "payment effectuer avec succes",
  //                       success: true,
  //                     });
  //                     alert(
  //                       response?.data?.rawResponse?.message ||
  //                         "payment effectuer avec succes"
  //                     );
  //                     setMessage(
  //                       response?.data?.rawResponse?.message ||
  //                         "payment effectuer avec succes"
  //                     );
  //                     await axios
  //                       .post(`${BackendUrl}/payment_callback`, {
  //                         status: "success", // Statut du paiement (success/failed)
  //                         customerName: user?.name, // Nom du client
  //                         msisdn: mobileDetails.number, // Numéro de téléphone
  //                         reference: "komipay", // Référence iPay
  //                         publicReference: selectedPayment, // Référence publique iPay
  //                         externalReference: transactionId, // Notre référence de transaction
  //                         amount: orderTotal, // Montant payé
  //                         paymentDate: Date.now(), // Date du paiement
  //                       })
  //                       .then((r) => console.log(r))
  //                       .catch((err) => console.log(err));
  //                     localStorage.removeItem("panier");
  //                     localStorage.removeItem("orderTotal");
  //                     localStorage.removeItem("paymentInfo");
  //                     localStorage.removeItem("pendingOrder");
  //                     navigation("/Commande");
  //                   } else {
  //                     setSubmitStatus({
  //                       loading: false,
  //                       error:
  //                         response?.data?.rawResponse?.message ||
  //                         "Une erreur est survenue",
  //                       success: false,
  //                     });

  //                     await axios
  //                       .post(`${BackendUrl}/payment_callback`, {
  //                         status: "échec", // Statut du paiement (success/failed)
  //                         customerName: user?.name, // Nom du client
  //                         msisdn: mobileDetails.number, // Numéro de téléphone
  //                         reference: "komipay", // Référence iPay
  //                         publicReference: selectedPayment, // Référence publique iPay
  //                         externalReference: transactionId, // Notre référence de transaction
  //                         amount: orderTotal, // Montant payé
  //                         paymentDate: Date.now(), // Date du paiement
  //                       })
  //                       .then((r) => console.log(r))
  //                       .catch((err) => console.log(err));

  //                     return;
  //                   }
  //                 })
  //                 .catch((error) => {
  //                   setSubmitStatus({
  //                     loading: false,
  //                     error:
  //                       error?.response?.data?.message ||
  //                       "Une erreur est survenue veuillez verifier vos informations",
  //                     success: false,
  //                   });
  //                   console.error("Erreur lors de la requête : ", error);
  //                 });
  //             })
  //             .catch((error) => {
  //               setSubmitStatus({
  //                 loading: false,
  //                 error:
  //                   error?.response?.data?.message || "Une erreur est survenue",
  //                 success: false,
  //               });
  //               console.log(error);
  //             });

  //           ////////////// recuperation de l'url de confirmation de code via le backend /////////////////
  //         } else if (
  //           selectedPayment === "zeyna" ||
  //           selectedPayment === "nita" ||
  //           selectedPayment === "amana"
  //         ) {
  //           const paymentDataSend = {};
  //           paymentDataSend.option = selectedPayment;
  //           if (selectedPayment === "zeyna") {
  //             const securityCodereq = await axios.post(
  //               `${BackendUrl}/requestZeynaCashSecurityCode`,
  //               {
  //                 phoneNumber:
  //                   "+" + mobileDetails.operateur + mobileDetails.number,
  //               }
  //             );
  //             if (securityCodereq.data.success === true) {
  //               const securityCode =
  //                 prompt(
  //                   "veuiller rentrer le code qui vous a ete envoyer par sms"
  //                 ) || null;
  //               paymentDataSend.securityCode = securityCode || null;
  //             } else {
  //               setSubmitStatus({
  //                 loading: false,
  //                 error:
  //                   securityCodereq?.data?.message || "Une erreur est survenue",
  //                 success: false,
  //               });
  //               return;
  //             }
  //           }
  //           const transactionId = JSON.parse(
  //             localStorage.getItem("pendingOrder")
  //           )?.transactionId;

  //           paymentDataSend.phoneNumber =
  //             "+" + mobileDetails.operateur + mobileDetails.number;
  //           paymentDataSend.country = "niger";
  //           paymentDataSend.amount = "100";
  //           // paymentDataSend.amount = orderTotal;
  //           paymentDataSend.externalRef = transactionId;
  //           paymentDataSend.staType = selectedPayment;
  //           console.log(paymentDataSend);
  //           await axios
  //             .post(`${BackendUrl}/processSTAPayment`, paymentDataSend)
  //             .then((respose) => {
  //               alert(
  //                 `${respose?.data?.message} voici votre code de validation : ${respose?.data?.code_validation}`
  //               );
  //               setMessage(
  //                 `${respose?.data?.message} voici votre code de validation : ${respose?.data?.code_validation}`
  //               );
  //               console.log(respose?.data);
  //               axios
  //                 .get(`${BackendUrl}/payment_status_card`, {
  //                   params: {
  //                     externalRef: transactionId,
  //                   },
  //                 })
  //                 .then(async (response) => {
  //                   console.log("Réponse de la requête : ", response.data);
  //                   if (
  //                     response?.data?.rawResponse?.code === 200 ||
  //                     response?.data?.rawResponse?.code === 201
  //                   ) {
  //                     setSubmitStatus({
  //                       loading: false,
  //                       error:
  //                         response?.data?.rawResponse?.message ||
  //                         "payment effectuer avec succes",
  //                       success: true,
  //                     });
  //                     alert(response?.data?.rawResponse?.message);
  //                     setMessage(response?.data?.rawResponse?.message);
  //                     await axios
  //                       .post(`${BackendUrl}/payment_callback`, {
  //                         status: "success", // Statut du paiement (success/failed)
  //                         customerName: user?.name, // Nom du client
  //                         msisdn: mobileDetails.number, // Numéro de téléphone
  //                         reference: "komipay", // Référence iPay
  //                         publicReference: selectedPayment, // Référence publique iPay
  //                         externalReference: transactionId, // Notre référence de transaction
  //                         amount: orderTotal, // Montant payé
  //                         paymentDate: Date.now(), // Date du paiement
  //                       })
  //                       .then((r) => console.log(r))
  //                       .catch((err) => console.log(err));
  //                     localStorage.removeItem("panier");
  //                     localStorage.removeItem("orderTotal");
  //                     localStorage.removeItem("paymentInfo");
  //                     localStorage.removeItem("pendingOrder");
  //                     navigation("/Commande");
  //                   } else {
  //                     setSubmitStatus({
  //                       loading: false,
  //                       error:
  //                         response?.data?.rawResponse?.message ||
  //                         "Une erreur est survenue",
  //                       success: false,
  //                     });
  //                     await axios
  //                       .post(`${BackendUrl}/payment_callback`, {
  //                         status: "échec", // Statut du paiement (success/failed)
  //                         customerName: user?.name, // Nom du client
  //                         msisdn: mobileDetails.number, // Numéro de téléphone
  //                         reference: "komipay", // Référence iPay
  //                         publicReference: selectedPayment, // Référence publique iPay
  //                         externalReference: transactionId, // Notre référence de transaction
  //                         amount: orderTotal, // Montant payé
  //                         paymentDate: Date.now(), // Date du paiement
  //                       })
  //                       .then((r) => console.log(r))
  //                       .catch((err) => console.log(err));
  //                     return;
  //                   }
  //                 })
  //                 .catch((error) => {
  //                   setSubmitStatus({
  //                     loading: false,
  //                     error:
  //                       error?.response?.data?.message ||
  //                       "Une erreur est survenue veuillez verifier vos informations",
  //                     success: false,
  //                   });
  //                   console.error("Erreur lors de la requête : ", error);
  //                 });
  //             })
  //             .catch((error) => {
  //               setSubmitStatus({
  //                 loading: false,
  //                 error:
  //                   error?.response?.data?.message || "Une erreur est survenue",
  //                 success: false,
  //               });
  //               console.log(error);
  //             });
  //         } else if ("Mobile Money") {
  //           const transactionId = JSON.parse(
  //             localStorage.getItem("pendingOrder")
  //           )?.transactionId;
  //           const paymentDataSend = {
  //             operator: "airtel",
  //             amount: "100",
  //             phoneNumber: mobileDetails.number,
  //             payerName: user?.name,
  //             externalRef: transactionId,
  //           };

  //           await axios
  //             .post(`${BackendUrl}/processMobilePayment`, paymentDataSend)
  //             .then((respose) => {
  //               alert(`${respose?.data?.message}`);
  //               setMessage(`${respose?.data?.message}`);
  //               console.log(respose?.data);
  //               axios
  //                 .get(`${BackendUrl}/payment_status_card`, {
  //                   params: {
  //                     externalRef: transactionId,
  //                   },
  //                 })
  //                 .then(async (response) => {
  //                   console.log("Réponse de la requête : ", response.data);
  //                   if (
  //                     response?.data?.rawResponse?.code === 200 ||
  //                     response?.data?.rawResponse?.code === 201
  //                   ) {
  //                     setSubmitStatus({
  //                       loading: false,
  //                       error:
  //                         response?.data?.rawResponse?.message ||
  //                         "payment effectuer avec succes",
  //                       success: true,
  //                     });
  //                     alert(response?.data?.rawResponse?.message);
  //                     setMessage(response?.data?.rawResponse?.message);

  //                     await axios
  //                       .post(`${BackendUrl}/payment_callback`, {
  //                         status: "success", // Statut du paiement (success/failed)
  //                         customerName: user?.name, // Nom du client
  //                         msisdn: mobileDetails.number, // Numéro de téléphone
  //                         reference: "komipay", // Référence iPay
  //                         publicReference: selectedPayment, // Référence publique iPay
  //                         externalReference: transactionId, // Notre référence de transaction
  //                         amount: orderTotal, // Montant payé
  //                         paymentDate: Date.now(), // Date du paiement
  //                       })
  //                       .then((r) => console.log(r))
  //                       .catch((err) => console.log(err));
  //                     localStorage.removeItem("panier");
  //                     localStorage.removeItem("orderTotal");
  //                     localStorage.removeItem("paymentInfo");
  //                     localStorage.removeItem("pendingOrder");
  //                     navigation("/Commande");
  //                   } else {
  //                     setSubmitStatus({
  //                       loading: false,
  //                       error:
  //                         response?.data?.rawResponse?.message ||
  //                         "Une erreur est survenue",
  //                       success: false,
  //                     });
  //                     await axios
  //                       .post(`${BackendUrl}/payment_callback`, {
  //                         status: "échec", // Statut du paiement (success/failed)
  //                         customerName: user?.name, // Nom du client
  //                         msisdn: mobileDetails.number, // Numéro de téléphone
  //                         reference: "komipay", // Référence iPay
  //                         publicReference: selectedPayment, // Référence publique iPay
  //                         externalReference: transactionId, // Notre référence de transaction
  //                         amount: orderTotal, // Montant payé
  //                         paymentDate: Date.now(), // Date du paiement
  //                       })
  //                       .then((r) => console.log(r))
  //                       .catch((err) => console.log(err));
  //                     return;
  //                   }
  //                 })
  //                 .catch((error) => {
  //                   setSubmitStatus({
  //                     loading: false,
  //                     error:
  //                       error?.response?.data?.message ||
  //                       "Une erreur est survenue veuillez verifier vos informations",
  //                     success: false,
  //                   });
  //                   console.error("Erreur lors de la requête : ", error);
  //                 });
  //             })
  //             .catch((error) => {
  //               setSubmitStatus({
  //                 loading: false,
  //                 error:
  //                   error?.response?.data?.message || "Une erreur est survenue",
  //                 success: false,
  //               });
  //               console.log(error);
  //             });
  //         }

  //         ////////////////////////////////////getion du payment de la commande by ckomipay //////////////////////////////////

  //         // // Stocker les informations de paiement
  //         // localStorage.setItem(
  //         //   "paymentInfo",
  //         //   JSON.stringify({
  //         //     amount: orderTotal,
  //         //     transactionId: JSON.parse(localStorage.getItem("pendingOrder"))
  //         //       .transactionId,
  //         //   })
  //         // );

  //         // // Rediriger vers la page de paiement
  //         // window.location.href = "/payment.html";
  //       } catch (error) {
  //         console.error("Erreur:", error);
  //         alert("Une erreur est survenue lors de la création de la commande");
  //         setMessage(
  //           "Une erreur est survenue lors de la création de la commande"
  //         );
  //       }
  //     } else {
  //       // Paiement à la livraison
  //       const transactionId = generateUniqueID();
  //       const commandeData = {
  //         clefUser: userId,
  //         nbrProduits: produits,
  //         prix: orderTotal,
  //         statusPayment: "payé à la livraison",
  //         livraisonDetails: {
  //           customerName: deliveryInfo.name,
  //           email: deliveryInfo.email,
  //           region: deliveryInfo.region,
  //           quartier: deliveryInfo.quartier,
  //           numero: deliveryInfo.numero,
  //           description: deliveryInfo.description,
  //         },
  //         reference: transactionId,
  //         prod: panier,
  //         ...(orderCodeP?.isValide && {
  //           codePro: true,
  //           idCodePro: orderCodeP._id,
  //         }),
  //       };

  //       const response = await axios.post(
  //         `${BackendUrl}/createCommande`,
  //         commandeData
  //       );

  //       if (response.status === 200) {
  //         localStorage.removeItem("panier");
  //         localStorage.removeItem("orderTotal");

  //         if (orderCodeP?.isValide) {
  //           await axios.put(`${BackendUrl}/updateCodePromo`, {
  //             codePromoId: orderCodeP._id,
  //             isValide: false,
  //           });
  //           localStorage.removeItem("orderCodeP");
  //         }

  //         setSubmitStatus({
  //           loading: false,
  //           error: null,
  //           success: true,
  //         });
  //         setPaiementProduit(true);
  //       }
  //     }

  //     setOnSubmit(false);
  //   } catch (error) {
  //     console.error("Erreur:", error);
  //     setSubmitStatus({
  //       loading: false,
  //       error: error.message || "Une erreur est survenue",
  //       success: false,
  //     });
  //     setOnSubmit(false);
  //   }
  // };

  ////////////////////////////////////////////////////////////////////////////??????????????///////////////////////////
  // Define clear transaction states
  const TRANSACTION_STATES = {
    INITIATED: "initiated",
    PROCESSING: "processing",
    PENDING_CONFIRMATION: "pending_confirmation",
    CONFIRMED: "confirmed",
    FAILED: "failed",
    EXPIRED: "expired",
  };

  // Add transaction state to your order data
  const commandeData = {
    // existing fields...
    transactionState: TRANSACTION_STATES.INITIATED,
    paymentAttempts: 1,
    lastUpdated: new Date(),
  };

  // Add a robust polling mechanism with exponential backoff
  const pollPaymentStatus = async (externalRef, maxAttempts = 10) => {
    let attempt = 0;
    let delay = 2000; // Start with 2 seconds

    const checkStatus = async () => {
      attempt++;

      try {
        const response = await axios.get(`${BackendUrl}/payment_status_card`, {
          params: { externalRef },
        });

        // Process successful response
        if (
          response?.data?.rawResponse?.code === 200 ||
          response?.data?.rawResponse?.code === 201
        ) {
          return { success: true, data: response.data };
        }

        // If we haven't reached max attempts, schedule another check
        if (attempt < maxAttempts) {
          delay = Math.min(delay * 1.5, 30000); // Exponential backoff, max 30s
          return new Promise((resolve) => {
            setTimeout(() => resolve(checkStatus()), delay);
          });
        } else {
          return { success: false, error: "Maximum polling attempts reached" };
        }
      } catch (error) {
        // Handle network errors similarly with backoff
        if (attempt < maxAttempts) {
          delay = Math.min(delay * 1.5, 30000);
          return new Promise((resolve) => {
            setTimeout(() => resolve(checkStatus()), delay);
          });
        } else {
          return {
            success: false,
            error: error.message || "Network error during polling",
          };
        }
      }
    };

    return checkStatus();
  };

  // At the beginning of the payment process
  const recoverPendingTransactions = () => {
    try {
      const pendingOrder = localStorage.getItem("pendingOrder");
      if (pendingOrder) {
        const orderData = JSON.parse(pendingOrder);
        const timestamp = orderData.timestamp;
        const now = new Date().getTime();

        // If transaction is less than 24 hours old, try to recover
        if (now - timestamp < 24 * 60 * 60 * 1000) {
          // Check transaction status
          pollPaymentStatus(orderData.transactionId).then((result) => {
            if (result.success) {
              // Transaction was successful, complete the order process
              completeSuccessfulOrder(orderData);
            } else {
              // Ask if user wants to retry the payment
              if (
                window.confirm(
                  "Nous avons détecté une transaction inachevée. Voulez-vous réessayer?"
                )
              ) {
                // User wants to retry, keep order data but generate new transaction ID
                prepareRetryPayment(orderData);
              } else {
                // User doesn't want to retry, clean up
                localStorage.removeItem("pendingOrder");
              }
            }
          });
        } else {
          // Transaction too old, clean up
          localStorage.removeItem("pendingOrder");
        }
      }
    } catch (error) {
      console.error("Error recovering transaction:", error);
      localStorage.removeItem("pendingOrder");
    }
  };

  // Call this function when page loads
  useEffect(() => {
    recoverPendingTransactions();
  }, []);
  // On your backend, implement a webhook handler for payment service callbacks
  // This ensures you get notified even if client disconnects

  // Then, add client-side event listeners to check order status periodically
  const checkOrderStatus = async (orderId) => {
    try {
      const response = await axios.get(
        `${BackendUrl}/checkOrderStatus/${orderId}`
      );

      if (response.data.status === "completed") {
        // Order payment confirmed by server webhook, update UI
        setSubmitStatus({
          loading: false,
          error: null,
          success: true,
        });

        // Clean up local storage
        localStorage.removeItem("panier");
        localStorage.removeItem("orderTotal");
        localStorage.removeItem("paymentInfo");
        localStorage.removeItem("pendingOrder");

        // Redirect to order confirmation
        navigation("/Commande");
      }
    } catch (error) {
      console.error("Error checking order status:", error);
    }
  };

  // First, create the order with status "pending"
  const createOrder = async () => {
    try {
      // Create order code similar to what you have
      const orderResponse = await axios.post(
        `${BackendUrl}/createCommande`,
        commandeData
      );
      return orderResponse.data;
    } catch (error) {
      throw error;
    }
  };

  // Then, handle payment processing separately
  // const processPayment = async (orderId, paymentMethod) => {
  //   try {
  //     // Payment processing code based on method
  //     // ...
  //     return paymentResponse;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // Then, handle payment processing separately
  const processPayment = async (orderId, paymentMethod) => {
    try {
      // Payment processing code based on method
      let paymentResponse;

      if (paymentMethod === "Visa" || paymentMethod === "master Card") {
        paymentResponse = await processCardPayment(orderId, generateUniqueID());
      } else if (["zeyna", "nita", "amana"].includes(paymentMethod)) {
        paymentResponse = await processSTAPayment(orderId, generateUniqueID());
      } else if (paymentMethod === "Mobile Money") {
        paymentResponse = await processMobileMoneyPayment(
          orderId,
          generateUniqueID()
        );
      } else {
        // Cash on delivery
        paymentResponse = {
          success: true,
          message: "Paiement à la livraison enregistré",
        };
      }

      return paymentResponse;
    } catch (error) {
      throw error;
    }
  };

  // Finally, update order status based on payment result
  // const updateOrderStatus = async (
  //   orderId,
  //   paymentStatus,
  //   transactionDetails
  // ) => {
  //   try {
  //     const updateResponse = await axios.put(
  //       `${BackendUrl}/updateOrderStatus`,
  //       {
  //         orderId,
  //         status: paymentStatus,
  //         transactionDetails,
  //       }
  //     );
  //     return updateResponse.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // Function to complete a successful order
  const completeSuccessfulOrder = (orderData) => {
    // Clean up local storage
    localStorage.removeItem("panier");
    localStorage.removeItem("orderTotal");
    localStorage.removeItem("paymentInfo");
    localStorage.removeItem("pendingOrder");

    // Display success message
    setSubmitStatus({
      loading: false,
      error: null,
      success: true,
    });

    // Navigate to order confirmation page
    navigation("/Commande");
  };

  // Function to prepare for payment retry
  const prepareRetryPayment = (orderData) => {
    // Keep the order ID but update the transaction tracking
    const updatedOrderData = {
      ...orderData,
      timestamp: new Date().getTime(),
      retryCount: (orderData.retryCount || 0) + 1,
    };

    // Update localStorage with the new attempt information
    localStorage.setItem("pendingOrder", JSON.stringify(updatedOrderData));

    // Restart the payment process with the existing order data
    handlePaymentSubmit(new Event("submit"));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null, success: false });
    setOnSubmit(true);

    try {
      // Get user ID
      const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;
      if (!userId) {
        throw new Error(
          "ID utilisateur non trouvé. Veuillez vous reconnecter."
        );
      }

      // Validate all information first
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

      // 1. Save delivery address first - this is independent of payment
      await axios.post(`${BackendUrl}/createOrUpdateAddress`, {
        ...deliveryInfo,
        email: deliveryInfo.email !== "" ? deliveryInfo.email : null,
        clefUser: userId,
      });

      // 2. Check cart items
      const panier = JSON.parse(localStorage.getItem("panier"));
      if (!panier || panier.length === 0) {
        throw new Error("Aucun produit n'est sélectionné.");
      }

      // Prepare order items
      const produits = panier.map((item) => ({
        produit: item._id,
        quantite: item.quantity,
        tailles: item.sizes,
        couleurs: item.colors,
      }));

      // 3. Process based on payment method
      if (
        [
          "Visa",
          "master Card",
          "Mobile Money",
          "nita",
          "zeyna",
          "amana",
        ].includes(selectedPayment)
      ) {
        // Handle online payment methods
        await processOnlinePayment(userId, produits, panier);
      } else {
        // Handle cash on delivery
        await processCashOnDelivery(userId, produits, panier);
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

  // Separate function for online payment methods
  const processOnlinePayment = async (userId, produits, panier) => {
    try {
      // Initialize transaction tracking
      const transactionTracking = {
        startTime: new Date().getTime(),
        paymentMethod: selectedPayment,
        status: "initiated",
        retryCount: 0,
      };

      // Check for existing pending order
      const existingOrder = localStorage.getItem("pendingOrder");
      console.log(existingOrder);
      let commandeId;
      let transactionId;

      if (existingOrder) {
        // Use existing order but generate new transaction reference
        const orderData = JSON.parse(existingOrder);
        commandeId = orderData?._id;
        console.log(orderData);
        const currentReference = orderData.transactionId;
        transactionId = generateUniqueID();

        // Update order with new transaction ID
        await axios.put(`${BackendUrl}/updateCommande`, {
          id: commandeId,
          clefUser: userId,
          nbrProduits: produits,
          prix: orderTotal,
          oldReference: currentReference,
          newReference: transactionId,
          statusPayment: "en attente",
          transactionTracking: {
            ...transactionTracking,
            previousTransactionId: currentReference,
          },
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
        });
      } else {
        // Create new order
        transactionId = generateUniqueID();
        const commandeData = {
          clefUser: userId,
          nbrProduits: produits,
          prix: orderTotal,
          statusPayment: "en attente",
          transactionTracking,
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
        console.log(response.data.commande._id);
        commandeId = response.data.commande._id;
      }

      // Save order info to local storage with timestamp
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          commandeId,
          transactionId,
          paymentMethod: selectedPayment,
          timestamp: new Date().getTime(),
        })
      );

      // Process payment based on selected method
      if (selectedPayment === "Visa" || selectedPayment === "master Card") {
        await processCardPayment(commandeId, transactionId);
      } else if (["zeyna", "nita", "amana"].includes(selectedPayment)) {
        await processSTAPayment(commandeId, transactionId);
      } else if (selectedPayment === "Mobile Money") {
        await processMobileMoneyPayment(commandeId, transactionId);
      }
    } catch (error) {
      // Check if commandeId is defined before using it
      // if (typeof commandeId !== "undefined") {
      //   // Update order with failed status
      //   await updateOrderStatus(commandeId, "échec", {
      //     error: error.message,
      //     timestamp: new Date().getTime(),
      //   });
      // }
      console.log(error);
      throw error;
    }
  };

  // Process card payments (Visa/MasterCard)
  const processCardPayment = async (commandeId, transactionId) => {
    try {
      // Format card details
      const rawNum = String(cardDetails.number || "").replace(/\s|-/g, "");
      const formattedNum = rawNum.match(/.{1,4}/g)?.join("-") || "";

      const cardData = {
        cardNumber: formattedNum,
        expiryDate: cardDetails.expiry,
        cvv: cardDetails.cvc,
        amount: orderTotal,
        payerName: JSON.parse(localStorage.getItem("userEcomme"))?.name,
        externalRef: transactionId,
        browserInfo: {
          javaEnabled: false,
          javascriptEnabled: true,
          screenHeight: window.screen.height,
          screenWidth: window.screen.width,
          TZ: new Date().getTimezoneOffset() / -60,
          challengeWindowSize: "05",
        },
      };

      // Start background order status checking
      startOrderStatusPolling(commandeId, transactionId);

      // Initialize payment
      const response = await axios.post(
        `${BackendUrl}/pay-with-card`,
        cardData
      );

      if (response.data.success && response.data.redirectUrl) {
        // Update order status to processing
        await updateOrderStatus(commandeId, "processing", {
          redirectUrl: response.data.redirectUrl,
          timestamp: new Date().getTime(),
        });

        // Open payment window
        const paymentWindow = window.open(
          response.data.redirectUrl,
          "_blank",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );

        // Register window close event to check status
        if (paymentWindow) {
          const checkInterval = setInterval(async () => {
            if (paymentWindow.closed) {
              clearInterval(checkInterval);
              await verifyPaymentStatus(transactionId, commandeId);
            }
          }, 1000);
        }
      } else {
        throw new Error(
          response.data.message || "Failed to initialize payment"
        );
      }
    } catch (error) {
      console.error("Card payment error:", error);
      setSubmitStatus({
        loading: false,
        error:
          error.message || "Une erreur est survenue lors du paiement par carte",
        success: false,
      });
      throw error;
    }
  };

  // Process STA payments (zeyna, nita, amana)
  const processSTAPayment = async (commandeId, transactionId) => {
    try {
      const paymentData = {
        option: selectedPayment,
        phoneNumber: "+" + mobileDetails.operateur + mobileDetails.number,
        country: "niger",
        amount: orderTotal,
        externalRef: transactionId,
        staType: selectedPayment,
      };

      // For zeyna, request security code first
      if (selectedPayment === "zeyna") {
        const securityCodeReq = await axios.post(
          `${BackendUrl}/requestZeynaCashSecurityCode`,
          { phoneNumber: paymentData.phoneNumber }
        );

        if (securityCodeReq.data.success) {
          // Store this state to local storage in case of disconnect
          localStorage.setItem(
            "securityCodeRequested",
            JSON.stringify({
              timestamp: new Date().getTime(),
              orderId: commandeId,
              transactionId,
            })
          );

          const securityCode = prompt(
            "Veuillez entrer le code qui vous a été envoyé par SMS"
          );

          if (!securityCode) {
            throw new Error("Code de sécurité requis pour continuer");
          }

          paymentData.securityCode = securityCode;
        } else {
          throw new Error(
            securityCodeReq.data.message ||
              "Échec de la demande de code de sécurité"
          );
        }
      }

      // Start background order status checking
      startOrderStatusPolling(commandeId, transactionId);

      // Process payment
      const response = await axios.post(
        `${BackendUrl}/processSTAPayment`,
        paymentData
      );

      if (response.data.success) {
        // Update order status
        await updateOrderStatus(commandeId, "pending_confirmation", {
          code_validation: response.data.code_validation,
          message: response.data.message,
          timestamp: new Date().getTime(),
        });

        alert(
          `${response.data.message} Voici votre code de validation : ${response.data.code_validation}`
        );
        setMessage(
          `${response.data.message} Voici votre code de validation : ${response.data.code_validation}`
        );

        // Begin polling for final status
        await verifyPaymentStatus(transactionId, commandeId);
      } else {
        throw new Error(response.data.message || "Échec du paiement");
      }
    } catch (error) {
      console.error("STA payment error:", error);
      setSubmitStatus({
        loading: false,
        error: error.message || "Une erreur est survenue lors du paiement",
        success: false,
      });
      throw error;
    }
  };

  // Process mobile money payments
  const processMobileMoneyPayment = async (commandeId, transactionId) => {
    try {
      const paymentData = {
        operator: "airtel", // You might want to make this dynamic
        amount: orderTotal,
        phoneNumber: mobileDetails.number,
        payerName: JSON.parse(localStorage.getItem("userEcomme"))?.name,
        externalRef: transactionId,
      };

      // Start background order status checking
      startOrderStatusPolling(commandeId, transactionId);

      // Process payment
      const response = await axios.post(
        `${BackendUrl}/processMobilePayment`,
        paymentData
      );

      if (response.data.success) {
        // Update order status
        await updateOrderStatus(commandeId, "pending_confirmation", {
          message: response.data.message,
          timestamp: new Date().getTime(),
        });

        alert(`${response.data.message}`);
        setMessage(`${response.data.message}`);

        // Begin polling for final status
        await verifyPaymentStatus(transactionId, commandeId);
      } else {
        throw new Error(response.data.message || "Échec du paiement mobile");
      }
    } catch (error) {
      console.error("Mobile money payment error:", error);
      setSubmitStatus({
        loading: false,
        error:
          error.message || "Une erreur est survenue lors du paiement mobile",
        success: false,
      });
      throw error;
    }
  };

  // Process cash on delivery
  const processCashOnDelivery = async (userId, produits, panier) => {
    try {
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
        // Clear cart and totals
        localStorage.removeItem("panier");
        localStorage.removeItem("orderTotal");

        // Handle promo code if used
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
      } else {
        throw new Error("Échec de la création de la commande");
      }
    } catch (error) {
      console.error("Cash on delivery error:", error);
      setSubmitStatus({
        loading: false,
        error: error.message || "Une erreur est survenue",
        success: false,
      });
      throw error;
    }
  };

  // Verify payment status
  const verifyPaymentStatus = async (externalRef, orderId, maxAttempts = 5) => {
    let attempt = 0;
    const pollInterval = 5000; // 5 seconds

    const checkStatus = async () => {
      if (attempt >= maxAttempts) {
        // We've reached max attempts, show message to user
        setSubmitStatus({
          loading: false,
          error:
            "La vérification du paiement prend plus de temps que prévu. Vous recevrez une confirmation par email une fois le paiement validé.",
          success: false,
        });
        return;
      }

      attempt++;

      try {
        const response = await axios.get(`${BackendUrl}/payment_status_card`, {
          params: { externalRef },
        });

        if (
          response?.data?.rawResponse?.code === 200 ||
          response?.data?.rawResponse?.code === 201
        ) {
          // Payment successful
          await handleSuccessfulPayment(orderId, externalRef, response.data);
        } else if (response?.data?.status === "pending") {
          // Payment still pending, check again after interval
          setTimeout(checkStatus, pollInterval);
        } else {
          // Payment failed
          await handleFailedPayment(orderId, externalRef, response.data);
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        // Network error, try again
        setTimeout(checkStatus, pollInterval);
      }
    };

    // Start checking
    await checkStatus();
  };

  // Start background polling for order status
  const startOrderStatusPolling = (orderId, transactionId) => {
    // Store polling info in session storage
    sessionStorage.setItem(
      "orderStatusPolling",
      JSON.stringify({
        orderId,
        transactionId,
        lastChecked: new Date().getTime(),
        active: true,
      })
    );

    // Create a function to check periodically
    const checkOrderStatus = async () => {
      try {
        // Get polling info
        const pollingInfo = JSON.parse(
          sessionStorage.getItem("orderStatusPolling")
        );

        if (!pollingInfo || !pollingInfo.active) {
          return; // Polling has been stopped
        }

        // Check order status
        const response = await axios.get(
          `${BackendUrl}/checkOrderStatus/${pollingInfo.orderId}`
        );

        if (
          response.data.status === "completed" ||
          response.data.status === "failed"
        ) {
          // Payment completed or failed, stop polling
          pollingInfo.active = false;
          sessionStorage.setItem(
            "orderStatusPolling",
            JSON.stringify(pollingInfo)
          );

          if (response.data.status === "completed") {
            await handleSuccessfulPayment(
              pollingInfo.orderId,
              pollingInfo.transactionId,
              response.data
            );
          } else {
            await handleFailedPayment(
              pollingInfo.orderId,
              pollingInfo.transactionId,
              response.data
            );
          }
        } else {
          // Update last checked time
          pollingInfo.lastChecked = new Date().getTime();
          sessionStorage.setItem(
            "orderStatusPolling",
            JSON.stringify(pollingInfo)
          );

          // Schedule next check
          setTimeout(checkOrderStatus, 10000); // Check every 10 seconds
        }
      } catch (error) {
        console.error("Error checking order status:", error);
        // Continue polling despite error
        setTimeout(checkOrderStatus, 10000);
      }
    };

    // Start checking
    setTimeout(checkOrderStatus, 5000); // Start after 5 seconds
  };

  // Handle successful payment
  const handleSuccessfulPayment = async (
    orderId,
    transactionId,
    responseData
  ) => {
    try {
      // Update order status on server
      await axios.post(`${BackendUrl}/payment_callback`, {
        status: "success",
        customerName: JSON.parse(localStorage.getItem("userEcomme"))?.name,
        msisdn: mobileDetails.number,
        reference: "komipay",
        publicReference: selectedPayment,
        externalReference: transactionId,
        amount: orderTotal,
        paymentDate: Date.now(),
        responseData, // Include full response data for logging
      });

      // Update UI
      setSubmitStatus({
        loading: false,
        error: null,
        success: true,
      });

      // Show success message
      alert("Paiement effectué avec succès!");
      setMessage("Paiement effectué avec succès");

      // Clean up storage
      localStorage.removeItem("panier");
      localStorage.removeItem("orderTotal");
      localStorage.removeItem("paymentInfo");
      localStorage.removeItem("pendingOrder");
      localStorage.removeItem("securityCodeRequested");

      // Navigate to order confirmation
      navigation("/Commande");
    } catch (error) {
      console.error("Error handling successful payment:", error);
      // Even if there's an error here, consider the payment successful
      // since the payment provider confirmed it
      alert(
        "Paiement réussi, mais une erreur est survenue lors de la mise à jour de la commande. Un administrateur va vérifier votre commande."
      );

      // Clean up storage anyway
      localStorage.removeItem("panier");
      localStorage.removeItem("orderTotal");
      localStorage.removeItem("paymentInfo");
      localStorage.removeItem("pendingOrder");

      // Navigate to order confirmation
      navigation("/Commande");
    }
  };

  // Handle failed payment
  const handleFailedPayment = async (orderId, transactionId, responseData) => {
    try {
      // Update order status on server
      await axios.post(`${BackendUrl}/payment_callback`, {
        status: "échec",
        customerName: JSON.parse(localStorage.getItem("userEcomme"))?.name,
        msisdn: mobileDetails.number,
        reference: "komipay",
        publicReference: selectedPayment,
        externalReference: transactionId,
        amount: orderTotal,
        paymentDate: Date.now(),
        responseData, // Include full response data for logging
      });

      // Update UI
      setSubmitStatus({
        loading: false,
        error: responseData?.message || "Le paiement a échoué",
        success: false,
      });
    } catch (error) {
      console.error("Error handling failed payment:", error);
      // Update UI even if server update fails
      setSubmitStatus({
        loading: false,
        error:
          "Le paiement a échoué et une erreur est survenue lors de la mise à jour de la commande",
        success: false,
      });
    }
  };

  // Helper function to update order status
  const updateOrderStatus = async (orderId, status, additionalData = {}) => {
    try {
      await axios.put(`${BackendUrl}/updateOrderStatus`, {
        orderId,
        status,
        timestamp: new Date().getTime(),
        ...additionalData,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      // We don't throw here to avoid breaking the main flow
    }
  }; ////////////////////////////////////////////////////////////////////////////??????????????///////////////////////////
  const getPaymentDescription = () => {
    switch (selectedPayment) {
      case "master Card":
        return "Paiement sécurisé immédiat. Vos données sont chiffrées.";
      case "Visa":
        return "Paiement sécurisé immédiat. Vos données sont chiffrées.";
      case "Mobile Money":
        return "Vous recevrez un code de confirmation par SMS.";
      case "Payment a domicile":
        return "Un agent se déplacera sous 24-48h. Paiement en espèces ou carte.";
      case "nita":
        return "Notification via l'app MyNita pour finaliser le paiement.";
      case "zeyna":
        return "Code USSD envoyé sur votre téléphone pour finaliser.";
      case "amana":
        return "Lien de paiement envoyé par SMS. Confirmation instantanée.";
      default:
        return "Sélectionnez un mode de paiement pour continuer.";
    }
  };
  // Formater automatiquement le numéro de carte
  const formatCardNumber = (value) => {
    const v = String(value)
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#B17236]">
                Carte{" "}
                {selectedPayment === "master Card" ? "MasterCard" : "Visa"}
              </h2>
              <div className="text-xs text-blue-700 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                {getPaymentDescription()}
              </div>
            </div>

            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="relative mb-3">
                <div className="absolute top-3 left-3">
                  <CreditCard className="text-gray-400 h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={formatCardNumber(cardDetails.number || "")}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="pl-10 p-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="NOM DU TITULAIRE"
                    value={cardDetails.name || ""}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, name: e.target.value })
                    }
                    className="p-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>
                <div className="flex gap-1">
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#B17236]">
                Mobile Money
              </h2>
              <div className="text-xs text-blue-700 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                {getPaymentDescription()}
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#B17236]">
                {selectedPayment === "nita"
                  ? "MyNita"
                  : selectedPayment === "zeyna"
                  ? "Zeyna"
                  : "Amana"}
              </h2>
              <div className="text-xs text-blue-700 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                {getPaymentDescription()}
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#B17236]">
                Paiement à domicile
              </h2>
              <div className="text-xs text-blue-700 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                {getPaymentDescription()}
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
    <LoadingIndicator
      text={message.length > 0 ? message : null}
      loading={submitStatus.loading ? true : false}
    >
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
            <PaiementPage
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
              mobileDetails={mobileDetails}
              setMobileDetails={setMobileDetails}
              submitStatus={submitStatus}
              setSubmitStatus={setSubmitStatus}
              onSubmit={onSubmit}
              setOnSubmit={setOnSubmit}
              validatePaymentInfo={validatePaymentInfo}
              handlePress={handlePress}
              handlePaymentSubmit={handlePaymentSubmit}
              getPaymentDescription={getPaymentDescription}
              formatCardNumber={formatCardNumber}
            />
            {/* <div>
              <div className="p-6 w-full transition-all duration-300">
                <h1 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
                  Mode de paiement
                </h1>
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
                {renderSelectedPaymentPage()}
              </div>
            </div> */}
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
    </LoadingIndicator>
  );
};

export default OrderConfirmation;

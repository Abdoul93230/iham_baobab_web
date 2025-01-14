import React from "react";
import { useNavigate } from "react-router-dom";

const OrderPaymentHandler = ({ panier, pendingOrder, id }) => {
  const navigate = useNavigate();
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
  const handlePaymentRetry = () => {
    if (panier) {
      // Sauvegarder le nouveau panier dans le localStorage
      localStorage.setItem("panier", JSON.stringify(panier));
      const newTransactionReference = generateUniqueID();
      if (pendingOrder && id)
        localStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            commandeId: id,
            transactionId: newTransactionReference,
            timestamp: new Date().getTime(),
          })
        );

      // Rediriger vers la page panier
      navigate("/panier");
    }
  };

  return (
    <>
      {panier ? (
        <button
          onClick={handlePaymentRetry}
          className="px-4 py-1 text-nowrap bg-teal hover:bg-teal-600 text-white rounded-full text-xs md:text-sm transition-colors duration-200"
        >
          Faire le paiement ?
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderPaymentHandler;

import React from "react";
import { useNavigate } from "react-router-dom";

const OrderPaymentHandler = ({ panier }) => {
  const navigate = useNavigate();

  const handlePaymentRetry = () => {
    if (panier) {
      // Sauvegarder le nouveau panier dans le localStorage
      localStorage.setItem("panier", JSON.stringify(panier));

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

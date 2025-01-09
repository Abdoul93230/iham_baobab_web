import React, { useEffect } from "react";

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(false);
    document.body.appendChild(script);
  });
};

const PaymentButton = () => {
  //   useEffect(() => {
  //     loadScript("https://i-pay.money/checkout.js").catch((err) => {
  //       console.error("Failed to load iPaymoney script:", err);
  //     });
  //   }, []);
  useEffect(() => {
    loadScript("https://i-pay.money/checkout.js")
      .then(() => {
        console.log("SDK iPaymoney chargé");
      })
      .catch((err) => {
        console.error("Échec du chargement du SDK", err);
      });
  }, []);

  const handleClick = () => {
    console.log("Bouton cliqué");
  };

  return (
    <button
      type="button"
      className="ipaymoney-button"
      data-amount="100" // Remplacez par le montant à payer
      data-environement="live" // Utilisez "live" ou "test"
      data-key="pk_f83a240bd0df4393b35a819925863e16" // Remplacez par votre clé publique
      data-transaction-id="id_unique_transaction22e454" // Remplacez par un ID unique
      data-redirect-url="https://ihambaobab.onrender.com" // Lien après paiement
      data-callback-url="https://secoure.onrender.com/payment_callback" // Lien pour le statut
      onClick={handleClick}
    >
      CheckOut
    </button>
  );
};

export default PaymentButton;

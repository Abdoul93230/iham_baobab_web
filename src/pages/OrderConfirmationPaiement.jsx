import React from "react";
import OrderConfirmation from "../components/panier/OrderConfirmation";
export default function OrderConfirmationPaiement({
  total,
  codeP,
  setCodeP,
  acces,
}) {
  return (
    <OrderConfirmation
      acces={acces}
      total={total}
      codeP={codeP}
      setCodeP={setCodeP}
    />
  );
}

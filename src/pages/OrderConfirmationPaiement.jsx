import React from "react";
import OrderConfirmation from "../components/panier/OrderConfirmation";
export default function OrderConfirmationPaiement({ total, codeP, setCodeP }) {
  return <OrderConfirmation total={total} codeP={codeP} setCodeP={setCodeP} />;
}

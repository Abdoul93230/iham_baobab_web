import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IPayPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData, transactionId } = location.state || {};

  useEffect(() => {
    if (!orderData || !transactionId) {
      navigate('/panier');
      return;
    }

    // Charger le script iPay directement dans le head
    const script = document.createElement('script');
    script.src = 'https://i-pay.money/checkout.js';
    document.head.appendChild(script);

    return () => {
      const ipayScript = document.querySelector('script[src="https://i-pay.money/checkout.js"]');
      if (ipayScript) {
        document.head.removeChild(ipayScript);
      }
    };
  }, [orderData, transactionId, navigate]);

  if (!orderData || !transactionId) {
    return null;
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'transparent',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        backgroundColor: 'transparent',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '400px'
      }}>
        <div>
          <button
            type="button"
            id="checkout-button"
            className="ipaymoney-button"
            data-amount={orderData.prix}
            data-environement="live"
            data-key="pk_f83a240bd0df4393b35a819925863e16"
            data-transaction-id={transactionId}
            data-redirect-url="https://ihambaobab.onrender.com"
            data-callback-url="https://secoure.onrender.com/payment_callback"
          >
            CheckOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default IPayPayment;
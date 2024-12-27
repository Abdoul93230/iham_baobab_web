import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cleanupAfterPayment = async () => {
      try {
        // Nettoyer le localStorage
        localStorage.removeItem("panier");
        localStorage.removeItem("orderTotal");
        localStorage.removeItem("paymentInfo");
        localStorage.removeItem("pendingOrder");
        
        // Si un code promo était utilisé
        const orderCodeP = localStorage.getItem("orderCodeP");
        if (orderCodeP) {
          localStorage.removeItem("orderCodeP");
        }

        // Rediriger vers la page d'accueil après 5 secondes
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } catch (error) {
        console.error('Erreur lors du nettoyage:', error);
      }
    };

    cleanupAfterPayment();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Paiement réussi !
          </h2>
          <p className="mt-2 text-gray-600">
            Merci pour votre commande. Votre paiement a été traité avec succès.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Vous serez redirigé vers la page d'accueil dans quelques secondes...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

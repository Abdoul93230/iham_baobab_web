import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Retourner à la page du panier
    navigate('/panier');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Échec du paiement
          </h2>
          <p className="mt-2 text-gray-600">
            Désolé, votre paiement n'a pas pu être traité. Veuillez réessayer.
          </p>
          <button
            onClick={handleRetry}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Retourner au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

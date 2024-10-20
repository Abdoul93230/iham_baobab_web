// OrderConfirmation.js
import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = ({ onClose }) => {
    const navigation = useNavigate()
  return (
    <div className="fixed inset-0 p-3 z-1 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Check className="h-12 w-12 text-green-600 animate-bounce" />
        </div>
        <h2 className="text-2xl font-semibold text-green-800 mb-2">Commande confirmée !</h2>
        <p className="text-gray-700 mb-4">Merci pour votre achat. Vous recevrez bientôt un e-mail de confirmation.</p>
        <button 
          onClick={() => navigation("/Home")} 
          className="w-full bg-[#30A08B] text-white py-2 rounded-lg font-semibold hover:bg-[#30A08B]/90 transition duration-200"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;

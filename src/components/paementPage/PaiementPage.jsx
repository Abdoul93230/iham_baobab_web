import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MasterCard from "./paiementPhoto/masterCard.jpeg";
import VisaCard from "./paiementPhoto/VisaCard.png";
import DomicileCard from "./paiementPhoto/domicile.jpeg";
import MobileMoney from "./paiementPhoto/MobileMoney.png";

const PaiementPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
  const [mobileDetails, setMobileDetails] = useState({ number: '', country: '', operator: '' });

  const africanCountries = [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Cape Verde',
    'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Democratic Republic of the Congo',
    'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana',
    'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar',
    'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger',
    'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone',
    'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Swaziland', 'Tanzania', 'Togo', 'Tunisia',
    'Uganda', 'Zambia', 'Zimbabwe'
  ];

  const handlePress = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const renderSelectedPaymentPage = () => {
    switch (selectedPayment) {
      case 'masterCard':
      case 'visa':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 border-t pt-4"
          >
            <h2 className="text-lg font-bold mb-3">Détails de la carte {selectedPayment === 'masterCard' ? 'MasterCard' : 'Visa'}</h2>
            <input
              type="text"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
              placeholder="Numéro de carte"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                placeholder="MM/AA"
                className="p-3 border border-gray-300 rounded-lg w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <input
                type="text"
                value={cardDetails.cvc}
                onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                placeholder="CVC"
                className="p-3 border border-gray-300 rounded-lg w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
          </motion.div>
        );
      case 'mobileMoney':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 border-t pt-4"
          >
            <h2 className="text-lg font-bold mb-3">Mobile Money</h2>
            <input
              type="tel"
              value={mobileDetails.number}
              onChange={(e) => setMobileDetails({...mobileDetails, number: e.target.value})}
              placeholder="Numéro de téléphone"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <select 
              value={mobileDetails.country} 
              onChange={(e) => setMobileDetails({...mobileDetails, country: e.target.value})}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Sélectionnez un pays</option>
              {africanCountries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <input
              type="text"
              value={mobileDetails.operator}
              onChange={(e) => setMobileDetails({...mobileDetails, operator: e.target.value})}
              placeholder="Opérateur (ex: Orange, MTN, Airtel)"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </motion.div>
        );
      case 'domicile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 border-t pt-4"
          >
            <h2 className="text-lg font-bold mb-3">Paiement à domicile</h2>
            <p className="text-gray-600">Un agent vous contactera pour organiser le paiement à votre domicile.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Mode de paiement</h1>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {[
            { id: 'masterCard', logo: MasterCard, label: 'MasterCard', color: '#30A08B' },
            { id: 'visa', logo: VisaCard, label: 'Visa', color: '#B2905F' },
            { id: 'mobileMoney', logo: MobileMoney, label: 'Mobile Money', color: '#B17236' },
            { id: 'domicile', logo: DomicileCard, label: 'Domicile', color: '#30A08B' },
          ].map(({ id, logo, label, color }) => (
            <motion.label
              key={id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center ${selectedPayment === id ? 'bg-opacity-100 ' : 'bg-opacity-50'} text-white p-4 rounded-lg transition-all duration-300 cursor-pointer`}
              style={{ backgroundColor: color }}
            >


              <input
                type="checkbox"
                checked={selectedPayment === id}
                onChange={() => handlePress(id)}
                className="sr-only" // Hide the default checkbox
                />
          

              <div className="flex items-center justify-center mb-2">
                <div className={`w-5 h-5 border-2 rounded-full mr-2 flex items-center justify-center ${selectedPayment === id ? 'bg-white' : 'bg-transparent'}`}>
                  {selectedPayment === id && (
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                  )}
                </div>
                <img src={logo} alt={label} className="h-8" />
              </div>
              <span className="text-sm">{label}</span>
            </motion.label>
          ))}
        </div>
        {renderSelectedPaymentPage()}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-[#30A08B] text-white p-3 rounded-lg w-full shadow-md hover:bg-opacity-90 transition-all duration-300"
        >
          Confirmer le paiement
        </motion.button>
      </div>
    </div>
  );
};

export default PaiementPage;
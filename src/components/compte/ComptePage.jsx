import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComptePage() {
  const navigation = useNavigate();
  const [name, setName] = useState('Abassa');
  const [email, setEmail] = useState('delomodibo@gmail.com');
  const [phone, setPhone] = useState('85822480');

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          {/* Profile image */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-center text-sm mb-4 text-gray-600">Click me to select image (max 4MB)</p>

          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#B2905F]">Nom:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-[#B2905F] shadow-sm focus:border-[#30A08B] focus:ring focus:ring-[#30A08B] focus:ring-opacity-50 transition duration-200 ease-in-out p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#B2905F]">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-[#B2905F] shadow-sm focus:border-[#30A08B] focus:ring focus:ring-[#30A08B] focus:ring-opacity-50 transition duration-200 ease-in-out p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#B2905F]">Téléphone:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border border-[#B2905F] shadow-sm focus:border-[#30A08B] focus:ring focus:ring-[#30A08B] focus:ring-opacity-50 transition duration-200 ease-in-out p-2"
              />
            </div>
          </div>

          {/* Change password link */}
          <div className="mt-4">
            <button className="text-sm text-[#B2905F] hover:underline">Changer le mot de passe ?</button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button onClick={() => navigation("/Home")} className="px-4 py-2 bg-[#B2905F] text-white rounded-md hover:bg-opacity-90 transition-colors">
              Retour
            </button>
            <button className="px-4 py-2 bg-[#30A08B] text-white rounded-md hover:bg-opacity-90 transition-colors">
              Soumettre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

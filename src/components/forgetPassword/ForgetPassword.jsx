import React, { useState } from 'react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#B2905F]">Mot de passe oublié</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 border  rounded-md focus:outline-none focus:ring-[#B2905F] focus:border-[#B2905F]"
              placeholder="Votre adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[#30A08B] rounded-md hover:bg-[#B17236] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B2905F]"
            >
              Réinitialiser le mot de passe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;

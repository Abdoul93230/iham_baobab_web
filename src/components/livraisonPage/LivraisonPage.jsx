import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LivraisonPage = () => {
    const navigate = useNavigate()
  const [service, setService] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [quartier, setQuartier] = useState("");
  const [plus, setPlus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const envoyer = () => {
    // Logique d'envoi des données
    console.log("Données envoyées", { nom, email, phone, region, quartier, plus });
  };

  const handleRetour = () => {
    // Logique de retour, par exemple, navigation vers une autre page
    console.log("Retour à la page précédente");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#30A08B]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-[#B17236] text-center">Adresse de livraison</h1>
        <div className="bg-white mx-auto shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="mb-4">
            <label className="block text-[#B17236] text-sm font-bold mb-2" htmlFor="region">
              Région
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#30A08B]"
            >
              <option value="">Choisir une région</option>
              <option value="Niamey">Niamey</option>
              <option value="Maradi">Maradi</option>
              <option value="Dosso">Dosso</option>
              <option value="Zinder">Zinder</option>
              <option value="Agadez">Agadez</option>
              <option value="Diffa">Diffa</option>
              <option value="Tillaberi">Tillaberi</option>
              <option value="Tahoua">Tahoua</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-[#B17236] text-sm font-bold mb-2" htmlFor="quartier">
              Quartier
            </label>
            <input
              type="text"
              id="quartier"
              value={quartier}
              onChange={(e) => setQuartier(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#30A08B]"
              placeholder="Enregistrez ici"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#B17236] text-sm font-bold mb-2" htmlFor="nom">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#30A08B]"
              placeholder="Entrez votre nom"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#B17236] text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#30A08B]"
              placeholder="Entrez votre email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#B17236] text-sm font-bold mb-2" htmlFor="phone">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#30A08B]"
              placeholder="Entrez votre numéro"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#B17236] text-sm font-bold mb-2" htmlFor="plus">
              Plus de détails
            </label>
            <textarea
              id="plus"
              value={plus}
              onChange={(e) => setPlus(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#30A08B] h-24"
              placeholder="Détails sur votre location"
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="bg-[#B2905F] hover:bg-[#a67947] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#B2905F] focus:ring-opacity-50"
            >
              Retour
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={envoyer}
              className="bg-[#30A08B] hover:bg-[#2c9580] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#30A08B] focus:ring-opacity-50"
            >
              Soumettre
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivraisonPage;
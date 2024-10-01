import React from 'react';
import { useNavigate } from 'react-router-dom';
const ConfidentialitePage = () => {
    const navigation = useNavigate()
  const data = [
    { titre: '1. Introduction :', description: "Bienvenue sur notre page de confidentialité. Chez [VotreEntreprise], nous sommes attachés à protéger la confidentialité de vos données personnelles." },
    { titre: '2. Données personnelles collectées :', description: "Nous pouvons collecter les types suivants de données personnelles lorsque vous utilisez notre site : votre nom, adresse e-mail, adresse postale, numéro de téléphone, informations de paiement, et toute autre information que vous choisissez de nous fournir." },
    { titre: '3. Buts de la collecte des données :', description: "Nous collectons vos données personnelles pour traiter vos commandes et communiquer avec vous." },
    { titre: '4. Base légale de la collecte des données :', description: "Nous collectons vos données sur la base de votre consentement et pour exécuter un contrat avec vous." },
    { titre: '5. Durée de conservation des données :', description: "Nous conservons vos données aussi longtemps que nécessaire." },
    { titre: '6. Droits des utilisateurs :', description: "Vous avez le droit d'accéder, de rectifier, ou de supprimer vos données personnelles." },
    { titre: '7. Sécurité des données :', description: "Nous prenons des mesures de sécurité pour protéger vos données." },
    { titre: '8. Mises à jour de la politique de confidentialité :', description: "Cette politique peut être mise à jour périodiquement." },
    { titre: '9. Consentement :', description: "En utilisant notre site, vous consentez à notre politique de confidentialité." },
  ];

  return (
    <div className="flex flex-col items-center bg-white p-6">
      <h1 className="text-3xl font-bold text-[#B2905F] mb-6">Mention légale</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-3xl">
        {data.map((item, index) => (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md border border-[#B2905F]" key={index}>
            <h2 className="text-[#30A08B] font-bold text-lg mb-2">{item.titre}</h2>
            <p className="text-black">{item.description}</p>
          </div>
        ))}
      </div>
      <div className='mt-4'>
        <button onClick={() => navigation(-1)} className='btn border border-secondary text-[#30A08B]'>Retour</button>
      </div>
    </div>
  );
};

export default ConfidentialitePage;



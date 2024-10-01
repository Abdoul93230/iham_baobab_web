import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrequementQeustion = () => {
  const navigate = useNavigate()
  const data = [
    { titre: '1. Quels sont les modes de paiement acceptés sur votre site ?', description: "Nous acceptons les paiements par carte de crédit/débit (Visa, MasterCard), Mobile Money (Airtel, Orange, Moov)." },
    { titre: '2. Quelle est la politique de livraison et combien de temps cela prendra-t-il ?', description: "Nous proposons une livraison standard et express. Le délai de livraison dépend de votre emplacement, mais en général, cela prend entre 3 à 7 jours ouvrables pour la livraison standard et 1 à 3 jours ouvrables pour la livraison express." },
    { titre: '3. Puis-je suivre ma commande en ligne ?', description: "Oui, une fois que votre commande a été expédiée, vous recevrez un numéro de suivi par e-mail, qui vous permettra de suivre l'état de votre commande en ligne." },
    { titre: '4. Proposez-vous des remises pour les achats en gros ?', description: "Oui, nous offrons des remises pour les achats en gros. Veuillez nous contacter pour plus de détails sur nos offres spéciales pour les grossistes." },
  ];

  return (
    <div className="flex flex-col items-center bg-white p-6">
      <h1 className="text-3xl font-bold text-[#B17236] mb-6">Questions fréquemment posées :</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-3xl">
        {data.map((item, index) => (
          <div className="bg-white shadow-lg rounded-lg p-4 border border-[#B2905F]" key={index}>
            <h2 className="text-[#30A08B] font-bold text-lg mb-2">{item.titre}</h2>
            <p className="text-black">{item.description}</p>
          </div>
        ))}
      </div>
      <div className='mt-4' onClick={() => navigate(-1)}>
        <button className='btn border-secondary text-[#30A08B]'>Retour </button>

      </div>
    </div>
  );
};

export default FrequementQeustion;




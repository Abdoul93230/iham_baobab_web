import React from "react";
import { useNavigate } from "react-router-dom";
const InformationPage = () => {
  const navigate = useNavigate();
  const data = [
    {
      titre: "1. Introduction :",
      description:
        "Bienvenue sur notre page de confidentialité. Chez [VotreEntreprise], nous sommes attachés à protéger la confidentialité de vos données personnelles.",
    },
    {
      titre: "2. Conditions générales d'utilisation (CGU) :",
      description:
        "Bienvenue sur Chagona-ne.onrender.com. En utilisant ce site, vous acceptez nos CGU et notre politique de confidentialité.",
    },
    {
      titre: "3. Politique de confidentialité :",
      description:
        "Chez Chagona-ne, nous respectons la confidentialité de nos utilisateurs.",
    },
    {
      titre: "4. Politique de cookies :",
      description:
        "Notre site utilise des cookies pour améliorer votre expérience de navigation.",
    },
    {
      titre: "5. Conditions de vente :",
      description:
        "En passant commande sur Chagona-ne.onrender.com, vous acceptez nos conditions de vente.",
    },
    {
      titre: "6. Politique de retour et de remboursement :",
      description:
        "Si vous n'êtes pas satisfait de votre achat, vous pouvez retourner le produit.",
    },
    {
      titre: "7. Droits d'auteur et propriété intellectuelle :",
      description:
        "Le contenu et les images présents sur chagona-ne.onrender.com sont protégés par des droits d'auteur.",
    },
    {
      titre: "8. Responsabilité :",
      description:
        "Nous ne pouvons garantir l'exhaustivité et l'exactitude des informations.",
    },
    {
      titre: "9. Clause de non-responsabilité :",
      description:
        "Les informations fournies ne constituent pas un avis professionnel.",
    },
    {
      titre: "9. Clause de non-responsabilité :",
      description:
        "Les informations fournies ne constituent pas un avis professionnel.",
    },
  ];

  return (
    <div className="flex flex-col items-center bg-white p-6">
      <h1 className="text-3xl font-bold text-[#B17236] mb-6 text-center">
        Informations légales :
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-[#30A08B]">
          1 Mentions légales :
        </h2>
        <p className="text-black">IHamBaobab SARL</p>
        <p className="text-black">Niamey/Niger/Bobiel</p>
        <p className="text-black">ihambaobab@gmail.com</p>
        <p className="text-black">+227 87727501</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {data.map((item, index) => (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md" key={index}>
            <h2 className="text-xl font-bold text-[#30A08B]">{item.titre}</h2>
            <p className="text-black mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformationPage;

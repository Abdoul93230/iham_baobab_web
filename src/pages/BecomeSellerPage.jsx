import React, { useEffect, useState } from "react";
import {
  Store,
  ShoppingCart,
  DollarSign,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import HomeHeader from "@/components/homePage/HomeHeader";

const BecomeSellerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const colors = {
    teal: "#30A08B",
    brown: "#B2905F",
    darkBrown: "#B17236",
    lightTeal: "#E6F2EF",
  };

  const sellerBenefits = [
    {
      icon: ShoppingCart,
      title: "Accès à un Large Marché",
      description: "Touchez des clients dans toute l'Afrique de l'Ouest",
    },
    {
      icon: DollarSign,
      title: "Revenus Supplémentaires",
      description: "Monétisez vos produits avec des commissions attractives",
    },
    {
      icon: Users,
      title: "Support Communautaire",
      description: "Accompagnement et formation continue",
    },
  ];

  const sellerRequirements = [
    "Produits de qualité",
    "Capacité de livraison",
    "Documentation professionnelle",
    "Engagement envers la satisfaction client",
  ];

  const handleSellerPortal = () => {
    // Redirection vers le portail des vendeurs
    window.location.href = "https://seller.notreplateforme.com/inscription";
  };

  return (
    <>
      <HomeHeader />
      <div
        className="min-h-screen p-8"
        style={{ backgroundColor: colors.lightTeal }}
      >
        <div className="container mx-auto">
          <h1
            className="text-4xl font-bold mb-8 text-center"
            style={{ color: colors.darkBrown }}
          >
            Devenez Vendeur
          </h1>

          {/* Avantages Vendeurs */}
          <div
            className="bg-white rounded-xl p-8 mb-8"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors.teal }}
            >
              <Store className="inline-block mr-2" />
              Pourquoi Devenir Vendeur
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {sellerBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <benefit.icon
                    size={48}
                    className="mx-auto mb-4"
                    color={colors.teal}
                  />
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: colors.darkBrown }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ color: colors.brown }}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Critères de Sélection */}
          <div
            className="bg-white rounded-xl p-8 mb-8"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors.teal }}
            >
              Critères Requis
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sellerRequirements.map((requirement, index) => (
                <div
                  key={index}
                  className="p-3 rounded"
                  style={{
                    backgroundColor: colors.lightTeal,
                    color: colors.darkBrown,
                  }}
                >
                  {requirement}
                </div>
              ))}
            </div>
          </div>

          {/* Portail Vendeurs */}
          <div
            className="bg-white rounded-xl p-8 text-center w-full"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: colors.darkBrown }}
            >
              Commencez Votre Aventure
            </h2>
            <div className="flex justify-center items-center">
              <Award size={48} className="mr-4" color={colors.teal} />
              <button
                onClick={handleSellerPortal}
                className="flex items-center px-6 py-3 rounded-full text-white font-bold text-lg"
                style={{
                  backgroundColor: colors.teal,
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Accéder au Portail Vendeurs
                <ArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeSellerPage;

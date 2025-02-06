import React, { useEffect } from "react";
import {
  RefreshCcw,
  Package,
  Clock,
  ShieldCheck,
  DollarSign,
  Truck,
} from "lucide-react";
import HomeHeader from "@/components/homePage/HomeHeader";

const ReturnPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const colors = {
    teal: "#30A08B",
    brown: "#B2905F",
    darkBrown: "#B17236",
    lightTeal: "#E6F2EF",
  };

  const returnSteps = [
    {
      icon: Package,
      title: "Vérification du Produit",
      description:
        "Assurez-vous que le produit est dans son état original et non utilisé",
    },
    {
      icon: Clock,
      title: "Délai de Retour",
      description: "Effectuez le retour dans les 14 jours suivant la réception",
    },
    {
      icon: Truck,
      title: "Expédition du Retour",
      description:
        "Conditionnez soigneusement le produit et utilisez l'étiquette de retour fournie",
    },
  ];

  const returnReasons = [
    "Produit défectueux",
    "Produit non conforme à la description",
    "Erreur de livraison",
    "Produit endommagé pendant le transport",
  ];

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
            Politique de Retour
          </h1>

          {/* Processus de Retour */}
          <div
            className="bg-white rounded-xl p-8 mb-8"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors.teal }}
            >
              <RefreshCcw className="inline-block mr-2" />
              Étapes du Retour
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {returnSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <step.icon
                    size={48}
                    className="mx-auto mb-4"
                    color={colors.teal}
                  />
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: colors.darkBrown }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ color: colors.brown }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Motifs de Retour */}
          <div
            className="bg-white rounded-xl p-8 mb-8"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors.teal }}
            >
              Motifs de Retour Acceptés
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {returnReasons.map((reason, index) => (
                <div
                  key={index}
                  className="p-3 rounded"
                  style={{
                    backgroundColor: colors.lightTeal,
                    color: colors.darkBrown,
                  }}
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>

          {/* Garanties */}
          <div
            className="bg-white rounded-xl p-8"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors.darkBrown }}
            >
              Nos Engagements
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <ShieldCheck size={48} className="mb-4" color={colors.teal} />
                <h3
                  className="font-bold mb-2"
                  style={{ color: colors.darkBrown }}
                >
                  Qualité Garantie
                </h3>
                <p className="text-center" style={{ color: colors.brown }}>
                  Contrôle rigoureux des retours
                </p>
              </div>
              <div className="flex flex-col items-center">
                <DollarSign size={48} className="mb-4" color={colors.teal} />
                <h3
                  className="font-bold mb-2"
                  style={{ color: colors.darkBrown }}
                >
                  Remboursement Rapide
                </h3>
                <p className="text-center" style={{ color: colors.brown }}>
                  Remboursement sous 5-7 jours ouvrables
                </p>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCcw size={48} className="mb-4" color={colors.teal} />
                <h3
                  className="font-bold mb-2"
                  style={{ color: colors.darkBrown }}
                >
                  Simplicité
                </h3>
                <p className="text-center" style={{ color: colors.brown }}>
                  Processus de retour transparent
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicyPage;

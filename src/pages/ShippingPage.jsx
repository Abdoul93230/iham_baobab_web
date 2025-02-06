import React, { useEffect } from "react";
import { Truck, Globe, MapPin, Shield, Clock } from "lucide-react";
import HomeHeader from "@/components/homePage/HomeHeader";

const ShippingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const colors = {
    teal: "#30A08B",
    brown: "#B2905F",
    darkBrown: "#B17236",
    lightTeal: "#E6F2EF",
  };

  const westAfricanCountries = [
    "Bénin",
    "Burkina Faso",
    "Cap-Vert",
    "Côte d'Ivoire",
    "Gambie",
    "Ghana",
    "Guinée",
    "Guinée-Bissau",
    "Liberia",
    "Mali",
    "Niger",
    "Nigeria",
    "Sénégal",
    "Sierra Leone",
    "Togo",
  ];

  const shippingZones = [
    {
      name: "Zone Locale",
      description: "Ville principale et périphérie immédiate",
      characteristics: [
        "Délai le plus court",
        "Frais de base minimal",
        "Optimal pour les livraisons urgentes",
      ],
    },
    {
      name: "Zone Nationale",
      description: "Toutes les régions du pays",
      characteristics: [
        "Couverture complète nationale",
        "Tarification adaptée à la distance",
        "Suivi détaillé du colis",
      ],
    },
    {
      name: "Zone Internationale (Afrique de l'Ouest)",
      description: "Pays limitrophes et continentaux",
      characteristics: [
        "Couverture de 15 pays",
        "Tarifs spéciaux inter-régionaux",
        "Options de livraison flexibles",
      ],
    },
  ];

  const shippingCalculationDetails = [
    {
      title: "Frais de Base",
      description:
        "Un tarif initial déterminé selon le type de produit et la zone d'expédition",
    },
    {
      title: "Frais au Kilogramme",
      description:
        "Coût supplémentaire calculé précisément selon le poids exact du produit",
    },
    {
      title: "Zones d'Expédition",
      description:
        "Tarification ajustée en fonction de la distance et de la complexité logistique",
    },
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
            Livraison en Afrique de l'Ouest
          </h1>

          {/* Couverture Géographique */}
          <div
            className="bg-white rounded-xl p-8 mb-8"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: colors.teal }}
            >
              <Globe className="inline-block mr-2" />
              Couverture Géographique
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {westAfricanCountries.map((country, index) => (
                <div
                  key={index}
                  className="p-2 rounded text-center"
                  style={{
                    backgroundColor: colors.lightTeal,
                    color: colors.darkBrown,
                  }}
                >
                  {country}
                </div>
              ))}
            </div>
          </div>

          {/* Zones de Livraison */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {shippingZones.map((zone, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6"
                style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: colors.darkBrown }}
                >
                  {zone.name}
                </h3>
                <p className="mb-4" style={{ color: colors.brown }}>
                  {zone.description}
                </p>
                <ul>
                  {zone.characteristics.map((char, charIndex) => (
                    <li
                      key={charIndex}
                      className="flex items-center mb-2"
                      style={{ color: colors.brown }}
                    >
                      <MapPin className="mr-2" size={16} color={colors.teal} />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Calcul des Frais */}
          <div
            className="bg-white rounded-xl p-8"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors.darkBrown }}
            >
              Calcul des Frais d'Expédition
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {shippingCalculationDetails.map((detail, index) => (
                <div key={index} className="text-center">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: colors.teal }}
                  >
                    {detail.title}
                  </h3>
                  <p className="text-base" style={{ color: colors.brown }}>
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Garanties */}
          <div
            className="bg-white rounded-xl p-8 mt-8 text-center"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: colors.darkBrown }}
            >
              Nos Garanties
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <Truck className="mb-4" size={48} color={colors.teal} />
                <h3
                  className="font-bold mb-2"
                  style={{ color: colors.darkBrown }}
                >
                  Livraison Fiable
                </h3>
                <p style={{ color: colors.brown }}>
                  Suivi en temps réel et délais garantis
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="mb-4" size={48} color={colors.teal} />
                <h3
                  className="font-bold mb-2"
                  style={{ color: colors.darkBrown }}
                >
                  Sécurité
                </h3>
                <p style={{ color: colors.brown }}>
                  Protection complète de vos colis
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="mb-4" size={48} color={colors.teal} />
                <h3
                  className="font-bold mb-2"
                  style={{ color: colors.darkBrown }}
                >
                  Rapidité
                </h3>
                <p style={{ color: colors.brown }}>
                  Options de livraison adaptées
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;

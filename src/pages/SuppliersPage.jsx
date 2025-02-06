import React, { useEffect, useState } from "react";
import {
  MapPin,
  Truck,
  Database,
  Award,
  Users,
  Shield,
  Target,
} from "lucide-react";
import HomeHeader from "@/components/homePage/HomeHeader";

const SuppliersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const colors = {
    teal: "#30A08B",
    brown: "#B2905F",
    darkBrown: "#B17236",
  };

  const [activeTab, setActiveTab] = useState("suppliers");

  const niameySuppliers = [
    {
      name: "Tech Market Niger",
      category: "Électronique",
      address: "Quartier Plateau, Niamey",
      partnership: "Exclusif",
      expertise: "Équipements électroniques et informatiques",
      description:
        "Leader en solutions technologiques avec plus de 10 ans d'expérience",
    },
    {
      name: "Sahel Textile Hub",
      category: "Textiles",
      address: "Zone Industrielle, Niamey",
      partnership: "Stratégique",
      expertise: "Textiles traditionnels et modernes du Niger",
      description: "Spécialiste des tissus locaux depuis 2008",
    },
    {
      name: "Niger Digital Solutions",
      category: "Technologies",
      address: "Kouara Kano, Niamey",
      partnership: "Partenaire principal",
      expertise: "Services numériques et solutions e-commerce",
      description: "Leader de l'innovation numérique au Niger",
    },
    {
      name: "Niamey Logistics",
      category: "Transport",
      address: "Route de l'Aéroport, Niamey",
      partnership: "Premium",
      expertise: "Solutions logistiques intégrées",
      description: "Expert en logistique urbaine et régionale",
    },
    {
      name: "Green Energy Niger",
      category: "Énergie",
      address: "Zone Industrielle, Niamey",
      partnership: "Stratégique",
      expertise: "Solutions d'énergie renouvelable",
      description: "Pionnier des solutions solaires au Niger",
    },
  ];

  const strategicPoints = [
    {
      title: "Développement Local",
      icon: Award,
      description:
        "Notre réseau de fournisseurs locaux permet d'optimiser les délais et de soutenir l'économie locale. Cette approche garantit une meilleure réactivité et adaptation aux besoins spécifiques du marché nigérien.",
      subPoints: [
        "Création d'emplois locaux",
        "Réduction des délais logistiques",
        "Adaptation aux besoins locaux",
      ],
    },
    {
      title: "Innovation Numérique",
      icon: Target,
      description:
        "L'intégration des solutions numériques dans notre chaîne d'approvisionnement améliore l'efficacité et la traçabilité. Nos partenaires technologiques nous permettent de maintenir une avance concurrentielle.",
      subPoints: [
        "Digitalisation des processus",
        "Traçabilité améliorée",
        "Optimisation des coûts",
      ],
    },
    {
      title: "Partenariats Durables",
      icon: Users,
      description:
        "Nos relations avec les fournisseurs sont basées sur la confiance et l'engagement mutuel. Nous privilégions des partenariats à long terme pour garantir stabilité et qualité.",
      subPoints: [
        "Engagement long terme",
        "Support mutuel",
        "Croissance partagée",
      ],
    },
    {
      title: "Qualité & Conformité",
      icon: Shield,
      description:
        "Nos fournisseurs sont sélectionnés selon des critères stricts de qualité et de conformité. Un processus rigoureux d'évaluation continue assure le maintien des standards.",
      subPoints: [
        "Audits réguliers",
        "Certifications requises",
        "Amélioration continue",
      ],
    },
  ];

  return (
    <>
      <HomeHeader />
      <div
        className="min-h-screen bg-gray-50"
        style={{ backgroundColor: colors.teal + "10" }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="p-6 border-b" style={{ borderColor: colors.teal }}>
              <h1
                className="text-3xl font-bold mb-4"
                style={{ color: colors.brown }}
              >
                Nos Fournisseurs et Partenaires
              </h1>
              <p className="text-gray-600 mb-4">
                Cette liste représente une sélection de nos principaux
                partenaires. Pour des raisons de confidentialité et de stratégie
                commerciale, tous nos fournisseurs ne sont pas présentés ici.
              </p>
            </div>

            <div className="flex border-b" style={{ borderColor: colors.teal }}>
              {["suppliers", "strategy"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-1/2 py-4 text-lg font-semibold transition-colors ${
                    activeTab === tab
                      ? `bg-opacity-10 text-opacity-100`
                      : `text-opacity-60 hover:bg-opacity-5`
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === tab ? colors.teal : "transparent",
                    color: activeTab === tab ? colors.darkBrown : colors.brown,
                  }}
                >
                  {tab === "suppliers" ? "Nos Fournisseurs" : "Notre Stratégie"}
                </button>
              ))}
            </div>

            {activeTab === "suppliers" && (
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {niameySuppliers.map((supplier, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-5 transform transition hover:scale-105 hover:shadow-lg"
                      style={{
                        borderColor: colors.teal,
                        backgroundColor: `${colors.teal}05`,
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <Database
                          className="mr-3"
                          style={{ color: colors.darkBrown }}
                        />
                        <h3
                          className="text-xl font-bold"
                          style={{ color: colors.brown }}
                        >
                          {supplier.name}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <MapPin
                            className="inline-block mr-2 text-sm"
                            style={{ color: colors.teal }}
                          />
                          {supplier.address}
                        </p>
                        <p>
                          <Truck
                            className="inline-block mr-2 text-sm"
                            style={{ color: colors.teal }}
                          />
                          {supplier.category}
                        </p>
                        <p className="text-sm text-gray-600">
                          {supplier.expertise}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {supplier.description}
                        </p>
                        <div
                          className="mt-3 px-3 py-1 rounded-full text-xs font-semibold inline-block"
                          style={{
                            backgroundColor: colors.teal + "20",
                            color: colors.darkBrown,
                          }}
                        >
                          {supplier.partnership}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "strategy" && (
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {strategicPoints.map((point, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md border"
                      style={{ borderColor: colors.teal }}
                    >
                      <point.icon
                        className="mb-4"
                        style={{ color: colors.teal, fontSize: "2.5rem" }}
                      />
                      <h4
                        className="text-xl font-bold mb-3"
                        style={{ color: colors.brown }}
                      >
                        {point.title}
                      </h4>
                      <p className="mb-4 text-gray-600">{point.description}</p>
                      <ul className="space-y-2">
                        {point.subPoints.map((subPoint, idx) => (
                          <li key={idx} className="flex items-center">
                            <div
                              className="w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: colors.teal }}
                            ></div>
                            <span className="text-sm text-gray-600">
                              {subPoint}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuppliersPage;

import React, { useEffect } from "react";
import { MapPin, Users, Truck, Building, Phone, Mail } from "lucide-react";
import HomeHeader from "@/components/homePage/HomeHeader";

const NigerPresencePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const colors = {
    teal: "#30A08B",
    brown: "#B2905F",
    darkBrown: "#B17236",
  };

  const regions = [
    {
      name: "Niamey",
      role: "Siège Principal",
      address: "Quartier Bobiel",
      services: ["Centre logistique", "Support client", "Formation"],
      contact: "+227 87 72 75 01",
      stats: "300+ clients actifs",
    },
    {
      name: "Maradi",
      role: "Hub Commercial",
      address: "Zone Industrielle",
      services: ["Distribution régionale", "Service client local"],
      contact: "+227 87 72 75 01",
      stats: "220+ clients actifs",
    },
    {
      name: "Zinder",
      role: "Centre Régional",
      address: "Centre-ville",
      services: ["Point relais", "Support local"],
      contact: "+227 87 72 75 01",
      stats: "100+ clients actifs",
    },
    {
      name: "Tahoua",
      role: "Point Relais",
      address: "Quartier Central",
      services: ["Distribution", "Support client"],
      contact: "+227 87 72 75 01",
      stats: "200+ clients actifs",
    },
    {
      name: "Agadez",
      role: "Bureau Régional",
      address: "Zone Commerciale",
      services: ["Livraison locale", "Support"],
      contact: "+227 87 72 75 01",
      stats: "80+ clients actifs",
    },
  ];

  const features = [
    {
      title: "Réseau National",
      description: "Présence dans les 5 plus grandes villes du Niger",
      icon: Building,
    },
    {
      title: "Livraison Rapide",
      description: "24-48h dans les zones urbaines",
      icon: Truck,
    },
    {
      title: "Support Local",
      description: "Équipes locales dans chaque région",
      icon: Users,
    },
  ];

  return (
    <>
      <HomeHeader />
      <div
        className="min-h-screen"
        style={{ backgroundColor: `${colors.teal}10` }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1
              className="text-4xl font-bold mb-6"
              style={{ color: colors.darkBrown }}
            >
              IHAM Partout au Niger
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: colors.brown }}
            >
              Un réseau national au service de nos clients, avec une présence
              locale pour un service personnalisé et efficace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl text-center"
                style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
              >
                <feature.icon
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: colors.teal }}
                />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.darkBrown }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: colors.brown }}>{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 transform hover:scale-105 transition-transform"
                style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
              >
                <div className="flex items-center mb-4">
                  <MapPin
                    className="w-6 h-6 mr-2"
                    style={{ color: colors.teal }}
                  />
                  <h3
                    className="text-xl font-bold"
                    style={{ color: colors.darkBrown }}
                  >
                    {region.name}
                  </h3>
                </div>

                <div className="space-y-3 mb-4">
                  <p className="font-semibold" style={{ color: colors.brown }}>
                    {region.role}
                  </p>
                  <p className="text-gray-600">
                    <Building className="w-4 h-4 inline mr-2" />
                    {region.address}
                  </p>
                  <div className="space-y-1">
                    {region.services.map((service, idx) => (
                      <p
                        key={idx}
                        className="text-sm"
                        style={{ color: colors.brown }}
                      >
                        • {service}
                      </p>
                    ))}
                  </div>
                  <p
                    className="text-sm font-semibold mt-2"
                    style={{ color: colors.teal }}
                  >
                    {region.stats}
                  </p>
                </div>

                <div
                  className="border-t pt-4 mt-4"
                  style={{ borderColor: `${colors.teal}20` }}
                >
                  <div className="flex items-center gap-4">
                    <Phone className="w-4 h-4" style={{ color: colors.teal }} />
                    <span className="text-sm">{region.contact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-16 text-center bg-white rounded-xl p-8"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: colors.darkBrown }}
            >
              Contact National
            </h2>
            <div className="flex justify-center gap-8">
              <div className="flex items-center">
                <Phone
                  className="w-5 h-5 mr-2"
                  style={{ color: colors.teal }}
                />
                <span>+227 87 72 75 01</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" style={{ color: colors.teal }} />
                <span>ihambaobab@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NigerPresencePage;

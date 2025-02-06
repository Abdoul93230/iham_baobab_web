import React, { useEffect, useState } from "react";
import {
  Award,
  TrendingUp,
  Users,
  Star,
  ChevronDown,
  Globe,
  Target,
  Zap,
  Shield,
  Heart,
} from "lucide-react";
import HomeHeader from "@/components/homePage/HomeHeader";

const AnniversaryPreview = () => {
  const colors = {
    teal: "#30A08B",
    brown: "#B2905F",
    darkBrown: "#B17236",
  };

  const [activeAchievement, setActiveAchievement] = useState(null);

  const achievements = [
    {
      number: "1K+",
      text: "Clients Satisfaits",
      icon: Users,
      details: [
        "9 80 clients particuliers actifs",
        "1 00 entreprises partenaires",
        "Taux de satisfaction client de 94%",
        "Présence dans 5 régions majeures",
      ],
    },
    {
      number: "50+",
      text: "Partenaires Stratégiques",
      icon: Award,
      details: [
        "23 fournisseurs locaux certifiés",
        "20 partenaires technologiques",
        "5 collaborations internationales",
        "7 institutions financières",
      ],
    },
    {
      number: "450%",
      text: "Croissance depuis 2023",
      icon: TrendingUp,
      details: [
        "Volume de transactions x5",
        "Base utilisateurs x4.5",
        "Revenus multipliés par 4",
        "Équipe x3",
      ],
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Lancement",
      achievements: [
        "Création d'IHAM Baobab",
        "Première plateforme e-commerce",
        "100 premiers clients",
        "5 partenaires fondateurs",
      ],
    },
    {
      year: "2024",
      title: "Expansion",
      achievements: [
        "Lancement app mobile",
        "2,000 clients actifs",
        "Certification ISO",
        "Prix de l'innovation",
      ],
    },
    {
      year: "2025",
      title: "Leadership",
      achievements: [
        "5,000+ clients",
        "100+ partenaires",
        "Expansion régionale",
        "Technologies IA",
      ],
    },
  ];

  const innovations = [
    {
      icon: Globe,
      title: "Expansion Régionale",
      description: "Présence dans 2 pays d'Afrique de l'Ouest",
    },
    {
      icon: Target,
      title: "IA & Analytics",
      description: "Personnalisation avancée et prédiction des tendances",
    },
    {
      icon: Zap,
      title: "Solutions Mobile",
      description: "Applications natives et paiements instantanés",
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Cryptage de nouvelle génération",
    },
    {
      icon: Heart,
      title: "Impact Social",
      description: "40+ emplois créés, formation numérique gratuite",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HomeHeader />
      <div
        className="min-h-screen"
        style={{ backgroundColor: `${colors.teal}10` }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <span
              className="text-lg px-4 py-1 rounded-full inline-block mb-4"
              style={{
                backgroundColor: `${colors.teal}20`,
                color: colors.teal,
              }}
            >
              Septembre 2025
            </span>
            <h1
              className="text-6xl font-bold mb-6"
              style={{ color: colors.darkBrown }}
            >
              IHAM Baobab
            </h1>
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: colors.brown }}
            >
              2 Ans d'Innovation et de Croissance
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: colors.brown }}
            >
              De start-up ambitieuse à leader régional de l'e-commerce,
              découvrez notre parcours extraordinaire et notre vision pour
              l'avenir du commerce digital en Afrique.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 cursor-pointer transition-all"
                style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
                onClick={() =>
                  setActiveAchievement(
                    activeAchievement === index ? null : index
                  )
                }
              >
                <div className="text-center">
                  <item.icon
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: colors.teal }}
                  />
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: colors.darkBrown }}
                  >
                    {item.number}
                  </div>
                  <div className="text-lg mb-4" style={{ color: colors.brown }}>
                    {item.text}
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 mx-auto transition-transform ${
                      activeAchievement === index ? "rotate-180" : ""
                    }`}
                    style={{ color: colors.teal }}
                  />
                </div>
                <div
                  className={`mt-4 space-y-2 overflow-hidden transition-all ${
                    activeAchievement === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {item.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className="flex items-center gap-2"
                      style={{ color: colors.brown }}
                    >
                      <Star
                        className="w-4 h-4"
                        style={{ color: colors.teal }}
                      />
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 mb-16 shadow-xl">
            <h2
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: colors.darkBrown }}
            >
              Notre Parcours Extraordinaire
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: `${colors.teal}10` }}
                >
                  <div
                    className="text-2xl font-bold mb-4"
                    style={{ color: colors.teal }}
                  >
                    {milestone.year}
                  </div>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: colors.darkBrown }}
                  >
                    {milestone.title}
                  </h3>
                  <ul className="space-y-2">
                    {milestone.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2"
                        style={{ color: colors.brown }}
                      >
                        <Star
                          className="w-4 h-4"
                          style={{ color: colors.teal }}
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: colors.darkBrown }}
            >
              Innovations 2025
            </h2>
            <div className="grid md:grid-cols-5 gap-6">
              {innovations.map((innovation, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl text-center"
                  style={{ boxShadow: `0 4px 20px ${colors.teal}10` }}
                >
                  <innovation.icon
                    className="w-10 h-10 mx-auto mb-4"
                    style={{ color: colors.teal }}
                  />
                  <h3
                    className="font-bold mb-2"
                    style={{ color: colors.darkBrown }}
                  >
                    {innovation.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.brown }}>
                    {innovation.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="text-center p-6 md:p-12 rounded-2xl"
            style={{ backgroundColor: colors.darkBrown }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-white">
              #IHAMBaobab2025
            </h2>
            <p className="text-base md:text-xl mb-3 md:mb-4 text-white opacity-90">
              Façonnons ensemble l'avenir du commerce digital en Afrique
            </p>
            <div className="text-sm md:text-lg text-white opacity-80">
              Septembre 2023 - Septembre 2025
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnniversaryPreview;

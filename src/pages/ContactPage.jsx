import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Users,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import HomeHeader from "@/components/homePage/HomeHeader";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const colors = {
    teal: "#30A08B",
    brown: "#B2905F",
    darkBrown: "#B17236",
    lightTeal: "#E6F2EF",
    softBlue: "#E6F2F8",
  };

  const [activeSection, setActiveSection] = useState("support");

  const contactSections = {
    support: {
      icon: HelpCircle,
      title: "Support Client",
      details: [
        "Assistance personnalisée",
        "Résolution rapide des problèmes",
        "Disponible 7j/7 de 8h à 20h",
      ],
    },
    commercial: {
      icon: Users,
      title: "Équipe Commerciale",
      details: [
        "Conseils personnalisés",
        "Solutions sur mesure",
        "Partenariats stratégiques",
      ],
    },
    technique: {
      icon: Globe,
      title: "Support Technique",
      details: [
        "Expertise technologique",
        "Résolution des problèmes complexes",
        "Innovation continue",
      ],
    },
  };

  const contactChannels = [
    {
      icon: Phone,
      title: "Téléphone",
      info: "+227 87 72 75 01",
      description: "Support immédiat et personnalisé",
    },
    {
      icon: Mail,
      title: "Email",
      info: "ihambaobab@gmail.com",
      description: "Réponse sous 24h garanti",
    },
    {
      icon: MessageCircle,
      title: "Chat en Ligne",
      info: "Disponible sur le site",
      description: "Assistance instantanée",
    },
  ];

  const CurrentSectionIcon = contactSections[activeSection].icon;

  return (
    <>
      <HomeHeader />
      <div
        className="min-h-screen p-4 sm:p-8"
        style={{ backgroundColor: colors.lightTeal }}
      >
        <div className="container mx-auto max-w-7xl">
          <h1
            className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center"
            style={{ color: colors.darkBrown }}
          >
            Contactez-Nous
          </h1>

          {/* Contact Sections Selector - Responsive Scrolling */}
          <div className="flex overflow-x-auto space-x-2 mb-6 sm:mb-12 pb-2">
            {Object.entries(contactSections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`
                  flex-shrink-0 flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all 
                  ${
                    activeSection === key
                      ? "bg-teal text-white"
                      : "bg-white text-gray-700"
                  }
                `}
                style={{
                  backgroundColor:
                    activeSection === key ? colors.teal : "white",
                  color: activeSection === key ? "white" : colors.darkBrown,
                }}
              >
                <section.icon className="mr-1 sm:mr-2 w-4 h-4 sm:w-auto sm:h-auto" />
                <span className="text-sm sm:text-base">{section.title}</span>
              </button>
            ))}
          </div>

          {/* Active Section Details - Responsive Layout */}
          <div
            className="bg-white rounded-xl p-4 sm:p-8 mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8"
            style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
          >
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                style={{ color: colors.teal }}
              >
                {contactSections[activeSection].title}
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                {contactSections[activeSection].details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm sm:text-base"
                    style={{ color: colors.brown }}
                  >
                    <div
                      className="w-2 h-2 mr-2 sm:mr-3 rounded-full"
                      style={{ backgroundColor: colors.teal }}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <CurrentSectionIcon
                size={80} // Reduced size for mobile
                className="opacity-20"
                color={colors.teal}
              />
            </div>
          </div>

          {/* Contact Channels - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {contactChannels.map((channel, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center"
                style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
              >
                <channel.icon
                  size={40} // Reduced size for mobile
                  className="mx-auto mb-3 sm:mb-4"
                  color={colors.teal}
                />
                <h3
                  className="text-lg sm:text-xl font-bold mb-1 sm:mb-2"
                  style={{ color: colors.darkBrown }}
                >
                  {channel.title}
                </h3>
                <p
                  className="mb-1 sm:mb-2 font-semibold text-sm sm:text-base"
                  style={{ color: colors.brown }}
                >
                  {channel.info}
                </p>
                <p
                  className="text-sm sm:text-base"
                  style={{ color: colors.brown }}
                >
                  {channel.description}
                </p>
              </div>
            ))}
          </div>

          {/* Location and Hours - Responsive Layout */}
          <div className="mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div
              className="bg-white rounded-xl p-4 sm:p-6"
              style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
            >
              <h3
                className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                style={{ color: colors.teal }}
              >
                <MapPin className="inline-block mr-1 sm:mr-2 w-4 h-4 sm:w-auto sm:h-auto" />
                Nos Bureaux
              </h3>
              <p
                className="text-sm sm:text-base"
                style={{ color: colors.brown }}
              >
                Niamey, Niger
                <br />
                Niamey / Bobiel
                <br />
                Pharmacie Goroual
              </p>
            </div>
            <div
              className="bg-white rounded-xl p-4 sm:p-6"
              style={{ boxShadow: `0 4px 20px ${colors.teal}20` }}
            >
              <h3
                className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                style={{ color: colors.teal }}
              >
                <Clock className="inline-block mr-1 sm:mr-2 w-4 h-4 sm:w-auto sm:h-auto" />
                Heures d'Ouverture
              </h3>
              <ul
                className="text-sm sm:text-base"
                style={{ color: colors.brown }}
              >
                <li>Lundi - Vendredi : 8h - 20h</li>
                <li>Samedi : 9h - 15h</li>
                <li>Dimanche : Support en ligne uniquement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

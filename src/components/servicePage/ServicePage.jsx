import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  X,
  Filter,
  ChevronDown,
  SlidersHorizontal,
  ShoppingBag,
  CreditCard,
  User,
  Clock,
  Star,
  BarChart,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

const ServicePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Options de filtrage et tri
  const filterOptions = {
    categories: ["Commandes", "Paiement", "Compte", "Livraison"],
    type: ["FAQ", "Guide", "Tutoriel", "Information"],
    importance: ["Essentiel", "Recommandé", "Optionnel"],
  };

  const sortOptions = [
    { id: "relevance", label: "Pertinence", icon: Star },
    { id: "recent", label: "Plus récent", icon: Clock },
    { id: "popular", label: "Plus populaire", icon: BarChart },
  ];

  // Base de données enrichie avec des métadonnées
  const helpData = [
    {
      id: "commandes",
      title: "Commandes",
      icon: ShoppingBag,
      articles: [
        {
          title: "Comment suivre ma commande ?",
          content:
            "Suivez votre commande via votre espace client ou avec votre numéro de suivi.",
          tags: ["suivi", "commande", "tracking", "livraison"],
          category: "Commandes",
          type: "FAQ",
          lastUpdated: "2024-01-15",
          popularity: 95,
        },
        {
          title: "Délais de livraison",
          content:
            "Les délais varient entre 24h et 72h selon votre localisation.",
          tags: ["délai", "livraison", "temps", "durée"],
          category: "Commandes",
          type: "Information",
          lastUpdated: "2024-01-14",
          popularity: 88,
        },
        {
          title: "Modifier ma commande",
          content:
            "Vous pouvez modifier votre commande dans les 2h suivant la validation.",
          tags: ["modifier", "changer", "commande", "annuler"],
          category: "Commandes",
          type: "Guide",
          lastUpdated: "2024-01-13",
          popularity: 82,
        },
      ],
    },
    {
      id: "paiement",
      title: "Paiement",
      icon: CreditCard,
      articles: [
        {
          title: "Moyens de paiement acceptés",
          content:
            "Nous acceptons les CB, Mobile Money, et le paiement à la livraison.",
          tags: ["paiement", "cb", "mobile money", "cash"],
          category: "Paiement",
          type: "Information",
          lastUpdated: "2024-01-15",
          popularity: 91,
        },
        {
          title: "Problème de paiement",
          content:
            "En cas d'échec, vérifiez vos informations ou contactez votre banque.",
          tags: ["erreur", "échec", "paiement", "problème"],
          category: "Paiement",
          type: "FAQ",
          lastUpdated: "2024-01-14",
          popularity: 85,
        },
      ],
    },
    {
      id: "compte",
      title: "Compte",
      icon: User,
      articles: [
        {
          title: "Créer un compte",
          content: "Inscrivez-vous en quelques clics avec votre email.",
          tags: ["inscription", "créer", "compte", "nouveau"],
          category: "Compte",
          type: "Guide",
          lastUpdated: "2024-01-15",
          popularity: 94,
        },
        {
          title: "Mot de passe oublié",
          content:
            "Réinitialisez votre mot de passe via le lien 'Mot de passe oublié'.",
          tags: ["password", "mot de passe", "oublié", "reset"],
          category: "Compte",
          type: "FAQ",
          lastUpdated: "2024-01-13",
          popularity: 89,
        },
      ],
    },
  ];

  const searchAndFilterContent = useMemo(() => {
    return (query, filters, sortType, category) => {
      let results = [];
      const searchTerm = query.toLowerCase();

      // Parcourir toutes les sections
      helpData.forEach((section) => {
        section.articles.forEach((article) => {
          let score = 0;
          let matches = false;

          // Recherche textuelle
          if (searchTerm) {
            if (article.title.toLowerCase().includes(searchTerm)) score += 3;
            if (article.content.toLowerCase().includes(searchTerm)) score += 1;
            if (
              article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
            )
              score += 2;
            matches = score > 0;
          } else {
            matches = true;
          }

          // Filtre par catégorie
          if (category !== "all") {
            matches = matches && article.category === category;
          }

          // Ajouter l'article aux résultats s'il correspond aux critères
          if (matches) {
            results.push({
              ...article,
              relevanceScore: score,
              section: section.title,
            });
          }
        });
      });

      // Tri des résultats
      switch (sortType) {
        case "recent":
          results.sort(
            (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
          );
          break;
        case "popular":
          results.sort((a, b) => b.popularity - a.popularity);
          break;
        default: // 'relevance'
          if (searchTerm) {
            results.sort((a, b) => b.relevanceScore - a.relevanceScore);
          } else {
            results.sort((a, b) => b.popularity - a.popularity);
          }
      }

      return results;
    };
  }, [helpData]);

  // Mise à jour des résultats
  useEffect(() => {
    const results = searchAndFilterContent(
      searchQuery,
      activeFilters,
      sortBy,
      selectedCategory
    );
    setSearchResults(results);
  }, [
    searchQuery,
    activeFilters,
    sortBy,
    selectedCategory,
    searchAndFilterContent,
  ]);

  // Gestion de la fermeture du panel de recherche lors d'un clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchContainer = document.getElementById("search-container");
      if (searchContainer && !searchContainer.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec recherche avancée */}
      <div className="bg-[#30A08B] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Centre d'Aide</h1>

          <div id="search-container" className="relative">
            {/* Barre de recherche principale */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Rechercher une réponse..."
                  className="w-full px-6 py-4 pr-12 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#B2905F] focus:bg-white/20 transition-all duration-300 text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-14 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
              </div>

              <button
                onClick={() => setIsSearchFocused(!isSearchFocused)}
                className="px-6 py-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-colors duration-200"
              >
                <Filter className="w-6 h-6" />
              </button>
            </div>

            {/* Panel de résultats avec filtres */}
            {isSearchFocused && (
              <div className="absolute w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                {/* Filtres et tri */}
                <div className="border-b border-gray-100 p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#B17236] font-semibold">Filtres</h3>
                    {selectedCategory !== "all" && (
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="text-sm text-gray-500 hover:text-[#30A08B]"
                      >
                        Réinitialiser
                      </button>
                    )}
                  </div>

                  {/* Catégories */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === "all"
                          ? "bg-[#30A08B] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Tout
                    </button>
                    {filterOptions.categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === category
                            ? "bg-[#30A08B] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Options de tri */}
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm w-full sm:w-auto justify-center mb-1 sm:mb-0 ${
                          sortBy === option.id
                            ? "bg-[#30A08B] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <option.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Résultats de recherche */}
                <div className="max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          className="p-4 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-[#30A08B]">
                                  {result.category}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-sm text-gray-500">
                                  {result.type}
                                </span>
                              </div>
                              <h3 className="text-lg font-medium text-gray-900 mb-1">
                                {result.title}
                              </h3>
                              <p className="text-gray-600">{result.content}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {new Date(
                                    result.lastUpdated
                                  ).toLocaleDateString()}
                                </span>
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <BarChart className="w-4 h-4" />
                                  {result.popularity}% pertinent
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <p className="text-lg mb-2">Aucun résultat trouvé</p>
                      <p className="text-sm">
                        Essayez de modifier vos critères de recherche
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        {helpData.map((section) => (
          <div key={section.id} className="mb-6">
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )
              }
              className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[#30A08B]/10">
                  <section.icon className="w-6 h-6 text-[#30A08B]" />
                </div>
                <h2 className="text-xl font-semibold text-[#B17236]">
                  {section.title}
                </h2>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-[#B2905F] transform transition-transform duration-200 ${
                  expandedSection === section.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSection === section.id && (
              <div className="mt-2 space-y-2">
                {section.articles.map((article, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm"
                  >
                    <h3 className="text-lg font-medium text-[#30A08B] mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600">{article.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Section Contact */}
      <div className="mt-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto py-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#B17236]">
              Besoin d'aide supplémentaire ?
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Notre équipe est disponible 24/7 pour vous aider
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: "Téléphone",
                info: "+227 87 72 75 01",
                desc: "Support immédiat",
              },
              {
                icon: Mail,
                title: "Email",
                info: "abdoulrazak9323@gmail.com",
                desc: "Réponse < 2h",
              },
              {
                icon: MessageCircle,
                title: "Chat en direct",
                info: "Démarrer",
                desc: "Disponible 24/7",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#30A08B]/20"
              >
                <div className="p-4 rounded-xl bg-[#30A08B]/10 inline-block mb-6 group-hover:bg-[#30A08B] transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-[#30A08B] group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#B17236] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-2">{item.desc}</p>
                <p className="text-[#30A08B] font-medium text-lg">
                  {item.info}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;

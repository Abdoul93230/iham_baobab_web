import React, { useState, useEffect, useRef } from "react";
import { Search, Camera, X, History, Filter, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const allProducts = useSelector((state) => state.products.data);
  const categories = useSelector((state) => state.products.categories);

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const handleSearch = debounce((term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    let results = allProducts
      .filter((product) => {
        // Supprime les balises HTML de la description pour la recherche
        const cleanDescription =
          product.description?.replace(/<[^>]*>/g, "") || "";

        const matchesSearch =
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          cleanDescription.toLowerCase().includes(term.toLowerCase());

        const matchesCategory =
          !filters.category || product.ClefType === filters.category;
        const matchesMinPrice =
          !filters.minPrice || product.prix >= parseFloat(filters.minPrice);
        const matchesMaxPrice =
          !filters.maxPrice || product.prix <= parseFloat(filters.maxPrice);

        return (
          matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
        );
      })
      .slice(0, 5);

    setSearchResults(results);

    if (term.length > 2) {
      const newHistory = [
        term,
        ...searchHistory.filter((h) => h !== term),
      ].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
  }, 300);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, filters]);

  // Support des raccourcis clavier
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K pour focus sur la recherche
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Echap pour fermer les résultats
      if (e.key === "Escape") {
        setShowResults(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Fermeture au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const createMarkup = (html) => {
    return { __html: html };
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const cleanText = typeof text === "string" ? stripHtml(text) : "";
    const parts = cleanText.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleProductClick = (productId) => {
    navigate(`/ProduitDétail/${productId}`);
    setShowResults(false);
    setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    inputRef.current?.focus();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="relative flex-grow max-w-xl mx-4 my-2" ref={searchRef}>
      <div className="relative flex items-center">
        {/* Bouton filtres - Ajusté pour ne pas chevaucher l'input */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute left-3 flex items-center text-emerald-600 hover:text-emerald-700 z-10"
        >
          <Filter className="h-5 w-5" />
        </button>

        <input
          ref={inputRef}
          className="border-2 text-[#30A08B] border-emerald-600 p-2 pl-12 pr-24 rounded-full w-full 
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
          type="text"
          placeholder="Rechercher des produits... (Ctrl + K)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(true)}
          maxLength={45}
        />

        {/* Actions à droite - Espacées correctement */}
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
          <button
            className="p-1 hover:bg-gray-100 rounded-full group relative"
            aria-label="Recherche par image"
          >
            <Camera className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-all duration-200" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Recherche par image
            </span>
          </button>
        </div>

        <button
          className="absolute right-1 p-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 
                   text-white rounded-full hover:bg-emerald-700 transition flex items-center justify-center"
          onClick={() => handleSearch(searchTerm)}
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Panneau des filtres - Position ajustée */}
      {showFilters && (
        <div className="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 left-0">
          <h3 className="font-semibold mb-3 text-emerald-700">Filtres</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Catégorie</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm mb-1">Prix min</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Prix max</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Résultats de recherche et historique */}
      {showResults &&
        (searchResults.length > 0 || searchHistory.length > 0) && (
          <div className="absolute z-40 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
            {/* Historique des recherches */}
            {searchHistory.length > 0 && !searchTerm && (
              <div className="p-3 border-b">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <History className="h-4 w-4 mr-1" />
                    Recherches récentes
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Effacer
                  </button>
                </div>
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(term)}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}

            {/* Résultats de recherche */}
            {searchResults.map((product) => (
              <div
                key={product._id}
                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="ml-3 flex-grow">
                  <p className="text-sm font-medium text-gray-900">
                    {highlightText(product.name, searchTerm)}
                  </p>
                  <p className="text-sm text-emerald-600 font-semibold">
                    {product.prix.toLocaleString()} FCFA
                  </p>
                  {product.description && (
                    <p className="text-xs text-gray-500 truncate max-w-md">
                      {highlightText(product.description, searchTerm)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default SearchBar;

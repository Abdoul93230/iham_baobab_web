import React, { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function VoirPlus() {
  const navigation = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const filteredCategories = DATA_Categories.filter(
    (c) => c.name !== "all"
  )?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(DATA_Categories.filter((c) => c.name !== "all"));

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigation(`/Categorie/${category.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#30A08B] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigation("/Home")}
            className="p-2 hover:bg-[#2a907d] rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="ml-4 text-2xl font-semibold text-white">
            Toutes les catégories
          </h1>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#30A08B] focus:border-[#30A08B] outline-none"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B2905F] w-5 h-5" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center space-y-3 border border-gray-200 hover:border-[#30A08B]"
            >
              <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="text-sm font-medium text-center text-[#B17236] group-hover:text-[#30A08B]">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#B17236]">Aucune catégorie trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}

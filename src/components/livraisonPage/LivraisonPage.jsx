import React, { useState } from 'react';

const LivraisonPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    phone: '',
    region: '',
    quartier: '',
    rue: '',
    batiment: '',
    instructions: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données du formulaire:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        {/* En-tête avec animation */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#B17236] mb-2 sm:mb-3">
            Adresse de Livraison
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#B2905F] animate-pulse">
            Remplissez vos informations de livraison
          </p>
        </div>

        {/* Formulaire principal */}
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-300"
        >
          {/* Section Informations Personnelles */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
              Informations Personnelles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2" htmlFor="nom">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  id="nom"
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleChange}
                />
              </div>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleChange}
                />
              </div>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2" htmlFor="phone">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section Adresse de Livraison */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
              Adresse de Livraison
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2" htmlFor="region">
                  Région *
                </label>
                <select
                  id="region"
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez une région</option>
                  <option value="Niamey">Niamey</option>
                  <option value="Maradi">Maradi</option>
                  <option value="Dosso">Dosso</option>
                  <option value="Zinder">Zinder</option>
                  <option value="Agadez">Agadez</option>
                  <option value="Diffa">Diffa</option>
                  <option value="Tillaberi">Tillaberi</option>
                  <option value="Tahoua">Tahoua</option>
                </select>
              </div>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2" htmlFor="quartier">
                  Quartier *
                </label>
                <input
                  type="text"
                  id="quartier"
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleChange}
                />
              </div>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2" htmlFor="rue">
                  Rue
                </label>
                <input
                  type="text"
                  id="rue"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleChange}
                />
              </div>

              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2" htmlFor="batiment">
                  Bâtiment/Immeuble
                </label>
                <input
                  type="text"
                  id="batiment"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section Instructions de Livraison */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#B17236] border-b-2 border-[#30A08B] pb-2">
              Instructions Supplémentaires
            </h2>
            
            <div className="transform transition-all duration-300 hover:-translate-y-1">
              <label className="block text-sm sm:text-base text-[#B2905F] font-medium mb-1 sm:mb-2" htmlFor="instructions">
                Instructions pour le livreur
              </label>
              <textarea
                id="instructions"
                rows="4"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-[#30A08B] focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Points de repère, instructions spéciales..."
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
            <button
              type="button"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[#B2905F] hover:bg-[#B17236] text-white rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={() => window.history.back()}
            >
              Retour
            </button>
            
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[#30A08B] hover:bg-[#2a8f7c] text-white rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Confirmer la livraison
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LivraisonPage;
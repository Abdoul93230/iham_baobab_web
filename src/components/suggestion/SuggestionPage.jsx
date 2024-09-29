import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SuggestionPage() {
  const [suggestion, setSuggestion] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!suggestion.trim() || !category || !type) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setTimeout(() => {
      setSuggestionsList([...suggestionsList, { suggestion, category, type }]);
      setSuccess("Suggestion envoyée avec succès !");
      setSuggestion("");
      setCategory("");
      setType("");
      setError(null);
    }, 500);
  };

  return (
    <div className="flex container flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 bg-white shadow">
        <button onClick={() => navigate(-1)} className="text-blue-500">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-grow">
          Suggestion Page
        </h1>
      </div>

      {/* Main content */}
      <div className="flex-grow p-4 flex flex-col items-center bg-gray-50">
        <h2 className="text-xl font-semibold text-[#B17236] mb-4">
          Votre suggestion
        </h2>

        {/* Category selection */}
        <div className="w-full mb-4">
          <label className="block text-gray-700 mb-2">Catégorie</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="Produit">Produit</option>
            <option value="Service">Service</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {/* Type selection */}
        <div className="w-full mb-4">
          <label className="block text-gray-700 mb-2">Type de suggestion</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Produit"
                checked={type === "Produit"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Produit
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Service"
                checked={type === "Service"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Service
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Autre"
                checked={type === "Autre"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Autre
            </label>
          </div>
        </div>

        {/* Suggestion input */}
        <div className="w-full bg-white rounded-lg shadow-md p-2 mb-4">
          <textarea
            className="w-full p-3 border-none resize-none focus:ring-0 text-gray-700"
            rows={4}
            placeholder="Enregistrez ici"
            value={suggestion}
            onChange={(e) => {
              setSuggestion(e.target.value);
              setError(null); // Réinitialiser l'erreur lors de la saisie
            }}
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/* Success message */}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#30A08B] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md"
          disabled={!suggestion.trim() || !category || !type} // Désactive le bouton si les champs ne sont pas remplis
        >
          Envoyer
        </button>
      </div>

      {/* Suggestions List */}
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-semibold text-[#B17236] mb-2">
          Suggestions précédentes
        </h3>
        <ul className="bg-white rounded-lg shadow-md p-4">
          {suggestionsList.length === 0 ? (
            <li className="text-gray-500">Aucune suggestion encore.</li>
          ) : (
            suggestionsList.map((sug, index) => (
              <li key={index} className="border-b py-2 text-gray-700">
                <strong>{sug.type}</strong>: {sug.suggestion} (Catégorie:{" "}
                {sug.category})
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Help Section */}
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-semibold text-[#B17236] mb-2">
          Besoin d'aide ?
        </h3>
        <p className="text-gray-700">
          Si vous avez des questions concernant le processus de suggestion,
          veuillez nous contacter à
          <a href="mailto:support@example.com" className="text-blue-500">
            {" "}
            support@example.com
          </a>
          .
        </p>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-white border-t border-gray-200 text-center">
        <p className="text-sm bg-gradient-to-r from-[#30A08B] via-[#B2905F] to-[#B17236] bg-clip-text text-transparent">
          © {new Date().getFullYear()} IHAM Baobab. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

export default SuggestionPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../pages/LoadingIndicator";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const BackendUrl = process.env.REACT_APP_Backend_Url;

  const montrerAlerte = (message, type = "info") => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!regexMail.test(email)) {
      montrerAlerte("Veuillez saisir une adresse e-mail valide", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BackendUrl}/forgotPassword`, {
        email,
      });
      montrerAlerte(response.data.message);
      setLoading(false);
      navigate(`/ResetPassword/${email}`);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        montrerAlerte(error.response.data.message, "error");
      } else {
        montrerAlerte(
          "Une erreur est survenue lors de la réinitialisation",
          "error"
        );
      }
    }
  };

  return (
    <LoadingIndicator loading={loading}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* Icône stylisée */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* En-tête */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">
              Mot de passe oublié ?
            </h2>
            <p className="text-gray-600">
              Saisissez votre adresse e-mail ci-dessous pour recevoir les
              instructions de réinitialisation
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="exemple@domaine.fr"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Réinitialiser mon mot de passe
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full text-gray-600 hover:text-emerald-600 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Retour à la connexion
            </button>
          </form>
        </div>

        {/* Alertes */}
        <div className="fixed bottom-4 right-4 space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg shadow-lg transition-all duration-300 ${
                alert.type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {alert.message}
            </div>
          ))}
        </div>
      </div>
    </LoadingIndicator>
  );
};

export default ForgetPassword;

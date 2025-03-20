// SimpleSecurityModal.jsx
import React from "react";

const SimpleSecurityModal = ({ onSubmit, onCancel }) => {
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = () => {
    if (!code.trim()) {
      setError("Veuillez saisir le code");
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError("Le code doit contenir 6 chiffres");
      return;
    }

    onSubmit(code);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-medium mb-2">Code de sécurité</h3>
        <p className="text-gray-600 mb-4">
          Veuillez saisir le code qui vous a été envoyé par SMS
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError("");
          }}
          maxLength={6}
          className="w-full border p-2 mb-2 rounded"
          placeholder="Code à 6 chiffres"
          autoFocus
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleSecurityModal;

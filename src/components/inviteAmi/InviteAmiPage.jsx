import React, { useState } from "react";

export default function InviteAmiPage() {
  const [emails, setEmails] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const productImage =
    "https://cc-prod.scene7.com/is/image/CCProdAuthor/product-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900";
  const maxEmailFields = 5;
  const [sendText, setSendText] = useState(
    "Salut [Nom de votre ami], Je viens de découvrir un super site de commerce électronique avec des produits de haute qualité à des prix compétitifs. Si tu t'inscris en utilisant mon lien de parrainage, tu bénéficieras d'une réduction sur ta première commande, et moi aussi ! Ne rate pas cette occasion, rejoins-moi sur ce site génial ! Amicalement, [Ton nom]"
  );

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const addEmailField = () => {
    if (emails.length < maxEmailFields) {
      setEmails([...emails, ""]);
    }
  };

  const removeEmailField = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const invalidEmails = emails.filter(
      (email) => email && !isValidEmail(email)
    );

    if (invalidEmails.length > 0) {
      setErrorMessage(
        `Les emails suivants sont invalides : ${invalidEmails.join(", ")}`
      );
      setLoading(false);
      return;
    }

    const message = `J'ai trouvé ce produit génial ! Regardez-le : ${productImage}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;

    alert(`Invitations envoyées à : ${emails.join(", ")}`);
    window.open(whatsappUrl, "_blank");
    setSuccessMessage("Invitations envoyées avec succès !");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 text-[#30A08B] text-center">
          Inviter des amis
        </h2>
        <img
          src={productImage}
          alt="Produit"
          className="w-full h-auto object-cover mb-4 rounded-md shadow-md"
        />

        <div className="w-full space-y-4">
          <textarea
            value={sendText}
            onChange={(e) => setSendText(e.target.value)}
            className="flex-grow w-100 h-[162px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30A08B] mr-2"
            rows="4"
            placeholder="Message à envoyer"
          />

          {emails.map((email, index) => (
            <div key={index} className="flex items-center">
              <input
                type="email"
                placeholder="Email de l'ami"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30A08B] mr-2"
              />
              {index > 0 && (
                <button
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => removeEmailField(index)}
                >
                  Supprimer
                </button>
              )}
            </div>
          ))}
          <div className="flex w-full justify-between  py-0">
            {emails.length < maxEmailFields && (
              <button
                className="px-4 py-2 col-5 bg-[#30A08B] text-white rounded-md hover:bg-opacity-90"
                onClick={addEmailField}
              >
                Ajouter un ami
              </button>
            )}

            <button
              className="px-4 py-2 col-5 bg-[#30A08B] text-white rounded-md hover:bg-opacity-90"
              onClick={removeEmailField} // Fonction à ajouter
            >
              Envoyer par email
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="text-green-600">{successMessage}</div>
        )}
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}

        <button
          className={`w-full px-4 py-2 mt-3 ${
            loading ? "bg-gray-500" : "bg-[#B2905F]"
          } text-white rounded-md hover:bg-opacity-90`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Envoi..." : "Envoyer les invitations"}
        </button>
      </div>
    </div>
  );
}

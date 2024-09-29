import React, { useState } from 'react';

export default function InviteAmiPage() {
  const [emails, setEmails] = useState(['']);
  const productImage = 'https://via.placeholder.com/150'; // Remplacez par l'URL de votre produit

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const removeEmailField = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };

  const handleSubmit = () => {
    const message = `J'ai trouvé ce produit génial ! Regardez-le : ${productImage}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    
    alert(`Invitations envoyées à : ${emails.join(', ')}`);
    window.open(whatsappUrl, '_blank'); // Ouvre WhatsApp avec le message
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-[#30A08B]">Inviter des amis</h2>
      
      <img src={productImage} alt="Produit" className="w-full h-auto mb-4 rounded-md shadow-md" />

      <div className="w-full">
        {emails.map((email, index) => (
          <div key={index} className="flex items-center mb-4">
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
        <button
          className="mb-4 px-4 py-2 bg-[#30A08B] text-white rounded-md hover:bg-opacity-90"
          onClick={addEmailField}
        >
          Ajouter un ami
        </button>
      </div>
      
      <button
        className="px-4 py-2 bg-[#B2905F] text-white rounded-md hover:bg-opacity-90"
        onClick={handleSubmit}
      >
        Envoyer les invitations
      </button>
    </div>
  );
}


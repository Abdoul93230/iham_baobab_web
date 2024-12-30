import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Package,
  Truck,
  Loader,
  ChevronLeft,
  User,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Send,
  Check,
  CheckCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

export default function CommandeSuivi() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userEcomme = JSON.parse(localStorage.getItem("userEcomme"));
        if (!userEcomme || !userEcomme.id) {
          throw new Error("Utilisateur non connecté");
        }

        // Fetch order details
        const orderResponse = await axios.get(
          `${BackendUrl}/getCommandesById/${id}`
        );
        setOrder(orderResponse.data.commande);

        // Fetch shipping address
        const addressResponse = await axios.get(
          `${BackendUrl}/getAddressByUserKey/${userEcomme.id}`
        );
        setShippingAddress(addressResponse.data.address);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="w-6 h-6 animate-spin text-teal-600" />
          <span>Chargement des détails de la commande...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 flex items-center space-x-2">
          <AlertCircle className="w-6 h-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Commande non trouvée</div>
      </div>
    );
  }

  const handleContact = (type) => {
    setSelectedContact(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
    setModalMessage("");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      time: format(new Date(), "HH:mm"),
      isDeliverer: false,
      type: "text",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const ChatMessage = ({ message }) => (
    <div
      className={`flex ${
        message.isDeliverer ? "justify-start" : "justify-end"
      } mb-4`}
    >
      <div className={`max-w-[100%] sm:max-w-[70%] bg-gray-100 rounded-lg p-3`}>
        <div className="flex items-start gap-2">
          {message.isDeliverer && (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          )}
          <div className="flex-1">
            <p
              className={`text-sm font-medium ${
                message.isDeliverer ? "text-gray-800" : "text-teal-800"
              }`}
            >
              {message.isDeliverer ? "Livreur" : "Vous"}
            </p>
            <p className="text-gray-700">{message.text}</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-xs text-gray-500">{message.time}</span>
              {!message.isDeliverer &&
                (message.read ? (
                  <CheckCheck className="w-4 h-4 text-teal-600" />
                ) : (
                  <Check className="w-4 h-4 text-gray-400" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-2">
        <button
          className="flex items-center text-gray-600 mb-4 hover:text-gray-800"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Retour aux commandes
        </button>

        <div className="flex mb-4 border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === "details"
                ? "border-b-2 border-teal text-teal"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Détails de la commande
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "map"
                ? "border-b-2 border-teal text-teal"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("map")}
          >
            Suivre sur la carte
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mr-4">
                  Commande #{order.reference || "N/A"}
                </h1>
                <span className="px-4 py-1 text-nowrap bg-teal text-white rounded-full text-xs md:text-sm">
                  {order.etatTraitement}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Commandé le:{" "}
                  {new Date(order.date).toLocaleDateString("fr-FR")}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Status: {order.statusLivraison}
                </div>
              </div>
            </div>
          </div>

          {activeTab === "details" && (
            <>
              <div className="mb-8">
                <h2 className="font-semibold text-lg mb-4">
                  Détails de la livraison
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {shippingAddress && (
                    <>
                      <div className="bg-white rounded-lg p-4 shadow">
                        <p className="font-medium">Nom du client</p>
                        <p className="text-gray-600">{shippingAddress.name}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow">
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">{shippingAddress.email}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow">
                        <p className="font-medium">Région</p>
                        <p className="text-gray-600">
                          {shippingAddress.region}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow">
                        <p className="font-medium">Quartier</p>
                        <p className="text-gray-600">
                          {shippingAddress.quartier}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow">
                        <p className="font-medium">Numéro de téléphone</p>
                        <p className="text-gray-600">
                          {shippingAddress.numero}
                        </p>
                      </div>
                      {shippingAddress.description && (
                        <div className="bg-white rounded-lg p-4 shadow">
                          <p className="font-medium">Description</p>
                          <p className="text-gray-600">
                            {shippingAddress.description}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-semibold text-lg mb-4">
                  Articles commandés
                </h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Taille
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Couleur
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.nbrProduits.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.produit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantite}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.tailles ? item.tailles.join(", ") : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.couleurs ? item.couleurs.join(", ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold">
                    Total: {order.prix || 0} F CFA
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-semibold text-lg mb-4">
                  Statut de la commande
                </h2>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Status du paiement</p>
                      <p className="text-gray-600">{order.statusPayment}</p>
                    </div>
                    <div>
                      <p className="font-medium">Status de la livraison</p>
                      <p className="text-gray-600">{order.statusLivraison}</p>
                    </div>
                    <div>
                      <p className="font-medium">État du traitement</p>
                      <p className="text-gray-600">{order.etatTraitement}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "map" && (
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Carte en cours de développement</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {selectedContact === "message"
                ? "Envoyer un message"
                : "Appeler le livreur"}
            </h3>
            {selectedContact === "message" && (
              <textarea
                className="w-full p-2 border rounded-lg mb-4"
                rows="4"
                placeholder="Votre message..."
                value={modalMessage}
                onChange={(e) => setModalMessage(e.target.value)}
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={handleCloseModal}
              >
                Annuler
              </button>
              {selectedContact === "message" && (
                <button
                  className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark"
                  onClick={handleSendMessage}
                >
                  Envoyer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

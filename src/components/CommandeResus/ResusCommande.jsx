import React, { useState, useEffect } from "react";
import {
  MapPin,
  Package,
  Truck,
  Loader,
  ChevronLeft,
  User,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;
export default function ResusCommande() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
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
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Commandé le:{" "}
                  {new Date(order.date).toLocaleDateString("fr-FR")}
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
        </div>
      </div>
    </div>
  );
}

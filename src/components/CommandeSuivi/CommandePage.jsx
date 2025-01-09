import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

export default function CommandePage() {
  const navigation = useNavigate();
  const [activeTab, setActiveTab] = useState("inProgress");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userEcomme = JSON.parse(localStorage.getItem("userEcomme"));
        if (!userEcomme || !userEcomme.id) {
          throw new Error("Utilisateur non connecté");
        }

        const response = await axios.get(
          `${BackendUrl}/getCommandesByClefUser/${userEcomme.id}`
        );
        setOrders(response.data.commandes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getOrderStatus = (order) => {
    if (
      order.statusLivraison === "en cours" ||
      order.statusPayment === "en cours"
    ) {
      return "inProgress";
    }
    return "rejected";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getWeekDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { weekday: "long" });
  };

  const filteredOrders = orders.filter(
    (order) => getOrderStatus(order) === activeTab
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen container">
      <div className="flex-grow p-4">
        <div className="flex space-x-2 mb-4">
          <button
            className={`flex-1 py-2 px-4 rounded-full ${
              activeTab === "inProgress"
                ? "bg-[#30A08B] text-white"
                : "bg-gray-100 text-[#333]"
            }`}
            onClick={() => setActiveTab("inProgress")}
          >
            En cours{" "}
            {
              orders.filter((order) => getOrderStatus(order) === "inProgress")
                .length
            }
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-full ${
              activeTab === "rejected"
                ? "bg-[#30A08B] text-white"
                : "bg-gray-100 text-[#333]"
            }`}
            onClick={() => setActiveTab("rejected")}
          >
            Récus{" "}
            {
              orders.filter((order) => getOrderStatus(order) === "rejected")
                .length
            }
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {filteredOrders.reverse().map((order, index) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow cursor-pointer"
              onClick={() => {
                if (getOrderStatus(order) === "inProgress") {
                  navigation(`/Suivre la commande/${order._id}`);
                } else {
                  navigation(`/Commande réisus/${order._id}`);
                }
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#B2905F]">{getWeekDay(order.date)}</span>
                <span className="text-[#B2905F]">{formatDate(order.date)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#30A08B] font-semibold">Produit</p>
                  <p className="text-[#30A08B]">
                    {order.nbrProduits.length} Produit(s)
                  </p>
                </div>
                <div>
                  <p className="text-[#30A08B] font-semibold">Prix Total</p>
                  <p className="text-[#30A08B]">{order.prix || 0} F CFA</p>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <p className="text-gray-600">État: {order.etatTraitement}</p>
                <p className="text-gray-600">Ref: {order.reference}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

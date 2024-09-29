import React, { useState } from 'react';
import { ChevronLeft, Truck, Package, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommandePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inProgress');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = {
    inProgress: [
      { 
        id: 1234, 
        date: '20 Sept 2023', 
        status: 'En cours', 
        details: '1x T-shirt, 2x Pantalon', 
        events: [
          { date: '20 Sept 2023', time: '10:00', description: 'Commande reçue' },
          { date: '20 Sept 2023', time: '14:30', description: 'Préparation en cours' },
          { date: '21 Sept 2023', time: '09:15', description: 'Emballage' },
        ],
        estimatedDelivery: '23 Sept 2023',
        trackingNumber: 'TR123456789'
      },
      // ... autres commandes en cours
    ],
    received: [
      { 
        id: 5678, 
        date: '15 Sept 2023', 
        status: 'Livrée', 
        details: '1x Chaussures, 2x T-shirt', 
        events: [
          { date: '15 Sept 2023', time: '08:00', description: 'Commande reçue' },
          { date: '16 Sept 2023', time: '11:30', description: 'Expédiée' },
          { date: '18 Sept 2023', time: '14:00', description: 'Livrée' },
        ],
        deliveryDate: '18 Sept 2023',
        trackingNumber: 'TR987654321'
      },
  
      // ... autres commandes reçues
    ],
  };

  const renderOrderList = () => {
    const currentOrders = activeTab === 'inProgress' ? orders.inProgress : orders.received;

    return (
      <ul className="space-y-2">
        {currentOrders.length === 0 ? (
          <p className="text-gray-600">Aucune commande {activeTab === 'inProgress' ? 'en cours' : 'reçue'} pour le moment.</p>
        ) : (
          currentOrders.map(order => (
            <li key={order.id} className="p-4 bg-white border border-gray-200 rounded-md shadow">
              <h4 className="font-semibold">Commande #{order.id}</h4>
              <p className="text-gray-500">Date: {order.date}</p>
              <p className="text-gray-600">Statut: {order.status}</p>
              <p className="mt-2 text-gray-800">Détails: {order.details}</p>
              <button
                className={`mt-2 px-4 py-2 bg-[#30A08B] text-white rounded-md hover:bg-opacity-90 ${activeTab === 'inProgress' ? 'bg-[#30A08B]' : 'bg-[#B2905F]'}`}
                onClick={() => setSelectedOrder(order)}
              >
                Suivre la commande
              </button>
            </li>
          ))
        )}
      </ul>
    );
  };

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Détails de la commande #{selectedOrder.id}</h3>
          <p><strong>Date:</strong> {selectedOrder.date}</p>
          <p><strong>Statut:</strong> {selectedOrder.status}</p>
          <p><strong>Détails:</strong> {selectedOrder.details}</p>
          <p><strong>Numéro de suivi:</strong> {selectedOrder.trackingNumber}</p>
          {selectedOrder.estimatedDelivery && (
            <p><strong>Livraison estimée:</strong> {selectedOrder.estimatedDelivery}</p>
          )}
          {selectedOrder.deliveryDate && (
            <p><strong>Date de livraison:</strong> {selectedOrder.deliveryDate}</p>
          )}
          
          <h4 className="font-semibold mt-4 mb-2">Historique de la commande:</h4>
          <ul className="space-y-2">
            {selectedOrder.events.map((event, index) => (
              <li key={index} className="flex items-center">
                {index === 0 && <Package className="mr-2 text-[#30A08B]" />}
                {index === selectedOrder.events.length - 1 && <CheckCircle className="mr-2 text-[#30A08B]" />}
                {index !== 0 && index !== selectedOrder.events.length - 1 && <Truck className="mr-2 text-[#30A08B]" />}
                <div>
                  <p className="font-semibold">{event.description}</p>
                  <p className="text-sm text-gray-500">{event.date} à {event.time}</p>
                </div>
              </li>
            ))}
          </ul>
          
          <button
            className="mt-4 px-4 py-2 bg-[#B2905F] text-white rounded-md hover:bg-opacity-90 w-full"
            onClick={() => setSelectedOrder(null)}
          >
            Fermer
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex container-fluid flex-col w-screen h-screen bg-gradient-to-r bg-opacity-10 from-[#30A08B] to-[#B2905F]">
      {/* Header */}
      <div className="bg-white bg-opacity-10 container p-4 flex items-center rounded">
        <ChevronLeft className="text-blue-500 mr-2 cursor-pointer" onClick={() => navigate(-1)} color='#FFF' />
        <h1 className="text-xl font-semibold flex-grow text-center">Commande</h1>
      </div>

      {/* Main content */}
      <div className="flex-grow container overflow-auto">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-[#B2905F] mb-4">Ma commande</h2>
          
          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <button
              className={`flex-1 py-2 px-4 rounded-full ${activeTab === 'inProgress' ? 'bg-[#30A08B] text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('inProgress')}
            >
              En cours <span className="ml-1">{orders.inProgress.length}</span>
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-full ${activeTab === 'received' ? 'bg-[#B2905F] text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('received')}
            >
              Reçus <span className="ml-1">{orders.received.length}</span>
            </button>
          </div>

          {/* Order list */}
          {renderOrderList()}

          {/* Order details modal */}
          {renderOrderDetails()}
        </div>
      </div>
    </div>
  );
}

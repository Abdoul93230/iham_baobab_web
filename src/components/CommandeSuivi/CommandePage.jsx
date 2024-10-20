import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CommandePage() {
  const navigation = useNavigate()
  const [activeTab, setActiveTab] = useState('inProgress');

  const orders = [
    {
      date: '05/10/2024',
      productCount: 1,
      totalPrice: 0,
      status: 'inProgress'
    },
    {
      date: '05/10/2024',
      productCount: 1,
      totalPrice: 15500,
      status: 'rejected'
    },
    {
      date: '05/10/2024',
      productCount: 1,
      totalPrice: 15500,
      status: 'rejected'
    },
    {
      date: '05/10/2024',
      productCount: 1,
      totalPrice: 15500,
      status: 'rejected'
    },
    {
      date: '05/10/2024',
      productCount: 1,
      totalPrice: 15500,
      status: 'rejected'
    },
    {
      date: '05/10/2024',
      productCount: 1,
      totalPrice: 15500,
      status: 'rejected'
    },
    {
      date: '05/10/2024',
      productCount: 1,
      totalPrice: 0,
      status: 'inProgress'
    },
  ];

  const filteredOrders = orders.filter(order => order.status === activeTab);

  return (
    <div className="flex flex-col h-screen container">
      {/* Main content */}
      <div className="flex-grow p-4">
        {/* Tabs */}
        <div className="flex space-x-2 mb-4">
          <button
            className={`flex-1 py-2 px-4 rounded-full ${activeTab === 'inProgress' ? 'bg-[#30A08B] text-white' : 'bg-gray-100 text-[#333]'}`}
            onClick={() => setActiveTab('inProgress')}
          >
            En cours {orders.filter(order => order.status === 'inProgress').length}
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-full ${activeTab === 'rejected' ? 'bg-[#30A08B] text-white' : 'bg-gray-100 text-[#333]'}`}
            onClick={() => setActiveTab('rejected')}
          >
            Récus {orders.filter(order => order.status === 'rejected').length}
          </button>
        </div>

        {/* Order list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {filteredOrders.map((order, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow" onClick={() => {
              if (order.status === "inProgress" ) {
                navigation("/Suivre la commande") 
              }else if(order.status === "rejected") {
                navigation("/Commande réisus") 
              }
            }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#B2905F]">samedi</span>
                <span className="text-[#B2905F]">{order.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#30A08B] font-semibold">Produit</p>
                  <p className="text-[#30A08B]">{order.productCount} Produit</p>
                </div>
                <div>
                  <p className="text-[#30A08B] font-semibold">Prix Total</p>
                  <p className="text-[#30A08B]">{order.totalPrice} F CFA</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

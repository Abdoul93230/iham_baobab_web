import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Package, Truck, Loader, ChevronLeft, User, Calendar, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function CommandeSuivi() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('details');

    const [order] = useState({
        numero: "001",
        status: "Livrée",
        livreur: {
            nom: "Abassa Soumana",
            telephone: "+227 91234567",
            evaluation: 4.8,
            nombreLivraisons: 128
        },
        tempsLivraison: "8 - 15 min",
        depart: "Point de Recharge IHAMBaobab",
        destination: "Chez Madame 1",
        adresse: "Saga, Niamey, Niger",
        dateCommande: "2024-10-01 14:30",
        modePaiement: "Paiement à la livraison",
        items: [
            { marque: "Oriba gaz", taille: "6", quantite: 1, prix: 3500 },
            { marque: "Oriba gaz", taille: "12", quantite: 1, prix: 11500 }
        ],
        historique: [
            { date: "01/10/2024", status: "Commande reçue", icon: Package, time: "14:30" },
            { date: "02/10/2024", status: "En préparation", icon: Loader, time: "14:35" },
            { date: "03/10/2024", status: "Expédiée", icon: Truck, time: "14:40" },
        ]
    });

    const messages = [
        {
            id: 1,
            text: "Bonjour, je suis en route avec votre commande.",
            time: "14:35",
            isDeliverer: true,
        },
        {
            id: 2,
            text: "D'accord, merci !",
            time: "14:36",
            isDeliverer: false,
        },
        {
            id: 3,
            text: "Je serai là d'une minute à l'autre.",
            time: "14:35",
            isDeliverer: true,
        },
        {
            id: 4,
            text: "C'est gentil, vous êtes vraiment génial !",
            time: "14:36",
            isDeliverer: false,
        },
        {
            id: 5,
            text: "C'est normal.",
            time: "14:35",
            isDeliverer: true,
        },
    ];

    const ChatMessage = ({ message }) => (
        <div className={`flex ${message.isDeliverer ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className={`max-w-[100%] sm:max-w-[70%] bg-gray-200 rounded-lg p-3 shadow-sm`}>
                <div className="flex items-start gap-2">
                    {message.isDeliverer && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                        </div>
                    )}
                    <div className="flex-1">
                        <p className={`text-sm font-medium ${message.isDeliverer ? 'text-gray-800' : 'text-teal-800'}`}>
                            {message.isDeliverer ? 'Livreur' : 'Vous'}
                        </p>
                        <p className="text-gray-700">{message.text}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-2">
                <button className="flex items-center text-gray-600 mb-4 hover:text-gray-800" onClick={() => navigate(-1)}>
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Retour aux commandes
                </button>

                <div className="flex mb-4 border-b">
                    <button
                        className={`px-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-teal text-teal' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Détails de la commande
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <div className="flex items-center mb-2">
                                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mr-4">
                                    Commande #{order.numero}
                                </h1>
                                <span className="px-4 py-1 text-nowrap bg-teal text-white rounded-full text-xs md:text-sm">
                                    {order.status}
                                </span>
                            </div>
                            <div className="text-sm md:text-base text-gray-600 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Commandé le: {new Date(order.dateCommande).toLocaleDateString('fr-FR')}
                            </div>
                        </div>

                        <div className="mt-4 bg-white shadow-md p-4 rounded-lg border border-gray-200 w-full md:w-auto">
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-gray-300 rounded-full mr-3 flex items-center justify-center overflow-hidden">
                                    <User className="w-8 h-8 text-gray-600" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-lg text-gray-800">{order.livreur.nom}</p>
                                    <div className="flex items-center text-sm md:text-base text-gray-600">
                                        <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                                        {order.livreur.nombreLivraisons} livraisons
                                        <span className="mx-2">•</span>
                                        {order.livreur.evaluation} ⭐
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {activeTab === 'details' && (
                        <>
                            <div className="mb-8 bg-gray-50 rounded-lg p-4">
                                <h2 className="font-semibold text-lg md:text-xl mb-4">Suivi de la commande</h2>
                                <div className="space-y-6">
                                    {order.historique.map((event, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                <event.icon className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <p className="font-medium">{event.status}</p>
                                                    <p className="text-sm text-gray-500">{event.time}</p>
                                                </div>
                                                <p className="text-sm text-gray-500">{event.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="font-semibold text-lg md:text-xl mb-4">Détails de la livraison</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 shadow">
                                        <p className="font-medium">Temps de livraison</p>
                                        <p className="text-gray-600">{order.tempsLivraison}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow">
                                        <p className="font-medium">Départ</p>
                                        <p className="text-gray-600">{order.depart}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow">
                                        <p className="font-medium">Destination</p>
                                        <p className="text-gray-600">{order.destination}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow">
                                        <p className="font-medium">Adresse</p>
                                        <p className="text-gray-600">{order.adresse}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow">
                                        <p className="font-medium">Mode de paiement</p>
                                        <p className="text-gray-600">{order.modePaiement}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow">
                                        <p className="font-medium">Articles</p>
                                        <ul className="list-disc list-inside">
                                            {order.items.map((item, index) => (
                                                <li key={index}>{item.quantite} x {item.marque} ({item.taille})  <span className='text-red-500'> - {item.prix} CFA</span> </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="mt-8">
                        <h2 className="font-semibold text-lg md:text-xl mb-4">Messagerie</h2>
                        <div className="bg-gray-100 rounded-lg p-4 max-h-100 overflow-y-auto">
                            {messages.map(message => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

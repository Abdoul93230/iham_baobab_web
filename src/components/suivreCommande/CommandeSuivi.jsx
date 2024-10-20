import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Package, Truck, Loader, ChevronLeft, User, Clock, Calendar, CheckCircle, AlertCircle,


 Send, Check, CheckCheck
 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {  } from 'lucide-react';


import { format } from 'date-fns';


// import Map from './Map';
export default function CommandeSuivi() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('details');
    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const [order] = useState({
        numero: "001",
        status: "En cours",
        livreur: {
            nom: "Abassa Soumana",
            telephone: "+227 91234567",
            photo: "/livreur-photo.jpg",
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
            { marque: "Oriba gaz", taille: "6 kg", quantite: 1, prix: 3500 },
            { marque: "Oriba gaz", taille: "12 kg", quantite: 1, prix: 11500 }
        ],
        historique: [
            { date: "01/10/2024", status: "Commande reçue", icon: Package, time: "14:30" },
            { date: "02/10/2024", status: "En préparation", icon: Loader, time: "14:35" },
            { date: "03/10/2024", status: "Expédiée", icon: Truck, time: "14:40" },
        ]
    });

    const handleContact = (type) => {
        setSelectedContact(type);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact(null);
        setModalMessage(''); // Réinitialiser le message du modal à la fermeture
    };

    const handleCancelOrder = () => {
        if (window.confirm("Êtes-vous sûr de vouloir annuler cette commande ?")) {
            alert("Commande annulée");
        }
    };

    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Bonjour, je suis en route avec votre commande.",
            time: "14:35",
            isDeliverer: true,
            type: 'text'
        },
        {
            id: 2,
            text: "D'accord, merci !",
            time: "14:36",
            isDeliverer: false,
            type: 'text'
        },
        {
            id: 3,
            text: "Je serai là d'une minute à l'autre.",
            time: "14:35",
            isDeliverer: true,
            type: 'text'
        },
        {
            id: 4,
            text: "C'est gentille vous êtes vraiment génial !",
            time: "14:36",
            isDeliverer: false,
            type: 'text'
        },
        {
            id: 3,
            text: "C'est normal .",
            time: "14:35",
            isDeliverer: true,
            type: 'text'
        },
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            text: newMessage,
            time: format(new Date(), 'HH:mm'),
            isDeliverer: false,
            type: 'text'
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };
    const ChatMessage = ({ message }) => (
        <div className={`flex ${message.isDeliverer ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className={`max-w-[100%] sm:max-w-[70%] bg-gray-100 rounded-lg p-3`}>
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
                        <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs text-gray-500">{message.time}</span>
                            {!message.isDeliverer && (message.read ? <CheckCheck className="w-4 h-4 text-teal-600" /> : <Check className="w-4 h-4 text-gray-400" />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    const handleSendMessageFromModal = () => {
        if (!modalMessage.trim()) return; // Ne pas envoyer de message vide
    
        const message = {
            id: messages.length + 1,
            text: modalMessage,
            time: format(new Date(), 'HH:mm'),
            date: format(new Date(), 'yyyy-MM-dd'),
            read: false,
            isDeliverer: false,
            type: 'text'
        };
    
        setMessages([...messages, message]); // Ajouter le message à la liste
        setModalMessage(''); // Réinitialiser le message après l'envoi
        handleCloseModal(); // Fermer le modal
    };
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
                    <button
                        className={`px-4 py-2 ${activeTab === 'map' ? 'border-b-2 border-teal text-teal' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('map')}
                    >
                        Suivre sur la carte
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

                    {activeTab === 'details' ? (
                        <>
                            <div className="mb-8 bg-gray-50 rounded-lg p-4">
                                <h2 className="font-semibold text-lg md:text-xl mb-4">Suivi de la commande</h2>
                                <div className="space-y-6">
                                    {order.historique.map((event, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100  flex items-center justify-center mr-4">
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
                                <h2 className="font-semibold text-lg md:text-xl mb-4">Détails de livraison</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start">
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                                        <div>
                                            <p className="font-medium">De: {order.depart}</p>
                                            <p className="text-gray-600">Vers: {order.destination}</p>
                                            <p className="text-gray-600">{order.adresse}</p>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <Clock className="w-5 h-5 text-green-600 mr-2" />
                                            <p className="text-green-600 font-medium">
                                                Arrivée prévue dans {order.tempsLivraison}
                                            </p>
                                        </div>
                                        <p className="text-sm md:text-base text-gray-600">
                                            Mode de paiement: {order.modePaiement}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="font-semibold text-lg md:text-xl mb-4">Articles commandés</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="text-left py-3 px-4">Marque</th>
                                                <th className="text-left py-3 px-4">Taille</th>
                                                <th className="text-center py-3 px-4">Quantité</th>
                                                <th className="text-right py-3 px-4">Prix</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items.map((item, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="py-3 px-4 text-nowrap">{item.marque}</td>
                                                    <td className="py-3 px-4 text-nowrap">{item.taille}</td>
                                                    <td className="py-3 px-4 text-center">{item.quantite}</td>
                                                    <td className="py-3 px-4 text-right text-nowrap">
                                                        {item.prix.toLocaleString()} F CFA
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="border-t font-semibold">
                                                <td colSpan={3} className="py-3 px-4">Total:</td>
                                                <td className="py-3 px-4 text-right text-nowrap">
                                                    {order.items.reduce((acc, item) => acc + item.prix, 0).toLocaleString()} F CFA
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-gray-600">Carte de suivi en temps réel</p>
                        {/* <Map /> */}
                        </div>
                    )}

                    <div className="flex flex-wrap py-3 gap-4">
                        <button 
                            onClick={() => handleContact('phone')}
                            className="flex items-center px-6 py-2 bg-gradient-to-r  from-teal to-brown text-white rounded-lg hover:bg-teal-dark transition-colors"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Contacter le livreur
                        </button>
                        <button 
                            onClick={() => handleContact('message')}
                            className="flex items-center px-6 py-2 bg-gradient-to-r  from-teal to-brown text-white rounded-lg hover:bg-teal-dark transition-colors"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Envoyer un message
                        </button>
                        <button 
                            onClick={handleCancelOrder}
                            className="flex items-center px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors ml-auto"
                        >
                            <AlertCircle className="w-5 h-5 mr-2" />
                            Annuler la commande
                        </button>
                    </div>




                    <div className="mb-8 bg-gray-50 rounded-lg p-4">
                        <h2 className="font-semibold text-lg md:text-xl mb-4">Messages</h2>
                        <div className="max-h-60 overflow-y-auto">
                            {messages.map(message => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} className="mt-4 flex">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                placeholder="Écrire un message..."
                                className="flex-grow border rounded-md p-2"
                            />
                            <button type="submit" className="ml-2 bg-teal text-white rounded-md px-4 py-2">Envoyer</button>
                        </form>
                    </div>


                </div>
                
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">
                            {selectedContact === 'phone' ? 'Appeler le livreur' : 'Envoyer un message'}
                        </h3>
                        <div className="mb-4">
                            <p className="text-gray-600 mb-2">Livreur: {order.livreur.nom}</p>
                            {selectedContact === 'phone' ? (
                                <p className="text-teal-600">{order.livreur.telephone}</p>
                            ) : (
                                <textarea 
                                    className="w-full border rounded-lg p-2" 
                                    placeholder="Écrivez votre message ici..."
                                    rows="4"
                                    value={modalMessage}
                                    onChange={(e) => setModalMessage(e.target.value)}
                                    // ici tu me fait les page messagerie pour deux personne moi comme pour whatsapp
                                />
                            )}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Annuler
                            </button>
                            <button
                                 onClick={selectedContact === 'phone' ? handleCloseModal : handleSendMessageFromModal}
                                className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark"
                            >
                                {selectedContact === 'phone' ? 'Appeler' : 'Envoyer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

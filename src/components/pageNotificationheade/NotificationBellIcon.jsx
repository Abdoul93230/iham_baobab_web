import React, { useContext, useState } from "react";
import { Bell, ArrowLeft, Trash2, ChevronDown } from "lucide-react";


export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Commande expédiée",
      message:
        "Votre commande #12345 a été expédiée. Livraison prévue le 20 octobre.",
      time: "2 minutes",
      isRead: false,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcpaTGMqlpesi0trVl47SlQOkZf-t2CPueDeQV9MYWklrbYJFAHVghAlh3DadogMr4Ao&usqp=CAU",
    },
    {
      id: 2,
      type: "promo",
      title: "Offre Flash !",
      message:
        "Profitez de -30% sur la nouvelle collection automne pendant 24h !",
      time: "1 heure",
      isRead: false,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      type: "stock",
      title: "Produit de nouveau disponible",
      message:
        'Le produit "Nike Air Max" que vous suiviez est de nouveau en stock.',
      time: "3 heures",
      isRead: true,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 4,
      type: "review",
      title: "Évaluation demandée",
      message:
        "Merci d'avoir acheté chez nous ! Nous apprécierions vos commentaires.",
      time: "5 heures",
      isRead: false,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 5,
      type: "update",
      title: "Mise à jour de l'application",
      message:
        "Une nouvelle version de l'application est disponible. Mettez à jour maintenant !",
      time: "1 jour",
      isRead: false,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 6,
      type: "event",
      title: "Événement spécial",
      message: "Ne manquez pas notre événement exclusif ce samedi à 14h !",
      time: "2 jours",
      isRead: false,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 7,
      type: "newsletter",
      title: "Nouvelle lettre d'information",
      message:
        "Découvrez les dernières nouvelles et offres dans notre lettre d'information.",
      time: "3 jours",
      isRead: true,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 8,
      type: "reminder",
      title: "Rappel de paiement",
      message: "N'oubliez pas que votre paiement est dû le 25 octobre.",
      time: "4 jours",
      isRead: false,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [displayCount, setDisplayCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleShowMore = () => {
    setIsLoading(true);
    // Simulation d'un chargement
    setTimeout(() => {
      setDisplayCount((prev) => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header amélioré */}
        <div className=" top-0 z-10 bg-gradient-to-b from-gray-50 to-transparent pb-4 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-white/80 rounded-full transition-all duration-200 shadow-sm"
                aria-label="Retour"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-[#30A08B]" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#30A08B]">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600">
                    {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#B2905F] hover:text-[#B17236] transition-all duration-200 font-medium 
                       px-4 py-2 rounded-full hover:bg-[#B2905F]/10"
            >
              Tout marquer comme lu
            </button>
          </div>
        </div>

        {/* Liste des notifications */}
        <div className="mt-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <Bell className="h-16 w-16 mx-auto text-[#30A08B] mb-4 animate-bounce" />
              <p className="text-gray-500 text-lg">Aucune notification</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {notifications.slice(0, displayCount).map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      bg-white rounded-xl shadow-sm overflow-hidden
                      transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                      ${
                        !notification.isRead
                          ? "border-l-4 border-l-[#30A08B]"
                          : "border-l-4 border-l-transparent"
                      }
                    `}
                  >
                    {/* ... contenu de la notification ... */}
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <img
                          src={notification.image}
                          alt=""
                          className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {notification.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                {notification.message}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 sm:ml-4">
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                il y a {notification.time}
                              </span>
                              <button
                                onClick={() => handleDelete(notification.id)}
                                className="p-1 hover:bg-red-50 rounded-full transition-all duration-200"
                                aria-label="Supprimer"
                              >
                                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {notification.type === "order" && (
                              <button className="text-sm px-6 py-2 bg-[#30A08B] text-white rounded-full hover:bg-[#B2905F] transition-all duration-200 w-full sm:w-auto shadow-sm hover:shadow-md">
                                Suivre ma commande
                              </button>
                            )}
                            {notification.type === "promo" && (
                              <button
                                className="text-sm px-6 py-2 bg-[#B2905F] text-white rounded-full hover:bg-[#B17236] 
                                               transition-all duration-200 w-full sm:w-auto shadow-sm hover:shadow-md"
                              >
                                En profiter
                              </button>
                            )}
                            {notification.type === "stock" && (
                              <button
                                className="text-sm px-6 py-2 bg-[#B17236] text-white rounded-full hover:bg-[#30A08B] 
                                               transition-all duration-200 w-full sm:w-auto shadow-sm hover:shadow-md"
                              >
                                Voir le produit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bouton "Voir plus" amélioré */}
              {notifications.length > displayCount && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleShowMore}
                    disabled={isLoading}
                    className="group flex items-center gap-2 px-6 py-3 bg-white text-[#30A08B] rounded-full
                             hover:bg-[#30A08B] hover:text-white transition-all duration-300
                             shadow-sm hover:shadow-md disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span className="text-brown">Chargement...</span>
                      </div>
                    ) : (
                      <>
                        <span>Voir plus de notifications</span>
                        <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

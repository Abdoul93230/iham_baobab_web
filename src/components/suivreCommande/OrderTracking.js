import React from "react";
import { CheckCircle, Clock, Truck, Package, AlertCircle } from "lucide-react";

const OrderTracking = ({ order }) => {
  const getStatusDetails = () => {
    const statuses = [
      {
        id: 1,
        title: "Commande confirmée",
        description: `Commande #${order._id.slice(0, 7)} reçue`,
        icon: Package,
        date: new Date(order.date).toLocaleDateString("fr-FR"),
        isCompleted: true,
      },
      {
        id: 2,
        title: "Paiement",
        description:
          order.statusPayment !== "échec" && order.statusPayment !== "en cours"
            ? "Paiement validé"
            : "En attente de paiement",
        icon:
          order.statusPayment !== "échec" && order.statusPayment !== "en cours"
            ? CheckCircle
            : Clock,
        isCompleted:
          order.statusPayment !== "échec" && order.statusPayment !== "en cours",
        isError: order.statusPayment === "échec",
      },
      {
        id: 3,
        title: "Traitement",
        description: order.etatTraitement,
        icon: order.etatTraitement === "Traité" ? CheckCircle : Clock,
        isCompleted: order.etatTraitement === "Traité",
      },
      {
        id: 4,
        title: "Livraison",
        description: order.statusLivraison,
        icon: Truck,
        isCompleted:
          order.statusLivraison !== "en cours" &&
          order.statusLivraison !== "échec",
      },
    ];
    return statuses;
  };

  const statuses = getStatusDetails();

  return (
    <div className="p-4">
      <div className="space-y-8">
        {statuses.map((status, index) => {
          const Icon = status.icon;
          return (
            <div key={status.id} className="relative">
              {index !== statuses.length - 1 && (
                <div
                  className={`absolute left-6 top-14 h-full w-0.5 ${
                    status.isCompleted ? "bg-teal-600" : "bg-gray-200"
                  }`}
                />
              )}
              <div className="relative flex items-start space-x-4">
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full ${
                    status.isError
                      ? "bg-red-100"
                      : status.isCompleted
                      ? "bg-teal-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      status.isError
                        ? "text-red-600"
                        : status.isCompleted
                        ? "text-teal-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {status.title}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {status.description}
                  </div>
                  {status.date && (
                    <div className="mt-1 text-xs text-gray-400">
                      {status.date}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;

import React from "react";
import { Package } from "lucide-react";

const OrderedItems = ({ items, totalPrice }) => {
  return (
    <div className="mb-8">
      <h2 className="font-semibold text-lg mb-4">Articles commandés</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-800">
                  {item.produit}
                </h3>
                <p className="text-sm text-gray-500">
                  Quantité: {item.quantite}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 border-t pt-3">
              {item.tailles && item.tailles.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Tailles sélectionnées
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tailles.map((taille, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {taille}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.couleurs && item.couleurs.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Couleurs sélectionnées
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.couleurs.map((couleur, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {couleur}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center bg-white rounded-lg shadow p-4">
        <span className="text-gray-600 font-medium">Total de la commande</span>
        <span className="text-xl font-semibold text-gray-800">
          {totalPrice} F CFA
        </span>
      </div>
    </div>
  );
};

export default OrderedItems;

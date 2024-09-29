import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";

function HomeFooter() {
  return (
    <footer className="bg-gradient-to-r mt-4 from-[#30A08B] to-[#B2905F] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">À propos</h3>
            <ul className="space-y-2">
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  Qui sommes-nous
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  Nos magasins
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  IHAM Baobab Anniversery {new Date().getFullYear()}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Service client</h3>
            <ul className="space-y-2">
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  Contactez-nous
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  Devenir vendeure  
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  expedier votre commande 
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  Par tout au Niger 
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                 Retourner une commande 
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
            <ul className="flex flex-wrap space-x-4">
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  <FaFacebook size={20} />
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  <FaTwitter size={20} />
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  <FaInstagram size={20} />
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  <FaTiktok size={20} />
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  <FaLinkedin size={20} />
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300">
                  <FaWhatsapp size={20} />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Inscrivez-vous pour recevoir nos dernières offres :
            </p>
            <form className="flex flex-col md:flex-row items-center">
              <div className="flex w-full mb-2 md:mb-0">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="border-2 border-emerald-600 p-3 rounded-l-full w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out shadow-md"
                />
                <button
                  className="bg-emerald-600 text-white rounded-r-full px-6 py-3 hover:bg-emerald-700 transition duration-200 ease-in-out shadow-md transform hover:scale-105"
                  type="submit"
                >
                  S'abonner
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} IHAM Baobab. Tous droits
              réservés.
            </p>
            <div className="flex space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                alt="Moyens de paiement"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                alt="MasterCard"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                alt="PayPal"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;

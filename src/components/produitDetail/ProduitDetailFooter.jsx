import React from 'react';
import { Facebook, X, Instagram, Mail, Phone, MapPin } from "lucide-react";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const HomeProductsFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-[#30A08B] to-[#B2905F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4">À propos de nous</h3>
            <p className="text-gray-300">
              Nous sommes passionnés par la qualité et l'innovation. Notre mission est de vous offrir les meilleurs produits au meilleur prix.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Accueil</a></li>
              <li><a href="#" className="hover:text-gray-300">Produits</a></li>
              <li><a href="#" className="hover:text-gray-300">À propos</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contactez-nous</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Rue du Commerce,8001 Niamey</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@example.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Inscrivez-vous pour recevoir nos dernières offres</p>
            <form className="flex flex-col space-y-2">
              <input type="email" placeholder="Votre email" className="bg-gray-800 border-gray-700 p-2 rounded" />
              <button type="submit" className="bg-gradient-to-r from-[#B17236] to-[#B2905F] hover:bg-opacity-80 p-2 rounded">
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Réseaux sociaux et copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-300"><FacebookIcon className="h-6 w-6" /></a>
            <a href="#" className="hover:text-gray-300"><XIcon className="h-6 w-6" /></a>
            <a href="#" className="hover:text-gray-300"><InstagramIcon className="h-6 w-6" /></a>
            <a href="#" className="hover:text-gray-300"><LinkedInIcon className="h-6 w-6" /></a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ihambaobab. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeProductsFooter;

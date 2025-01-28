import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LogoText from "../../image/LogoText.png";
const HomeProductsFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-[#30A08B] to-[#B2905F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4">À propos de nous</h3>
            <p className="text-gray-300">
              Nous sommes passionnés par la qualité et l'innovation. Notre
              mission est de vous offrir les meilleurs produits au meilleur
              prix.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <button className="hover:text-emerald-300 transition duration-300 transform hover:scale-105">
                  Accueil
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300 transform hover:scale-105">
                  Produits
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300 transform hover:scale-105">
                  À propos
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300 transform hover:scale-105">
                  Contact
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-300 transition duration-300 transform hover:scale-105">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contactez-nous</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Bobiel Niamey/Niger</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+227 87 72 75 01</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>ihambaobab@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Inscrivez-vous pour recevoir nos dernières offres
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 border-gray-700 p-2 rounded"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#B17236] to-[#B2905F] hover:bg-opacity-80 p-2 rounded"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Réseaux sociaux et copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span href="#" className="hover:text-gray-300 cursor-pointer">
              <a
                style={{ textDecoration: "none" }}
                href="https://www.facebook.com/profile.php?id=61564475374925"
                target="blank"
              >
                <FacebookIcon className="h-6 w-6" />
              </a>
            </span>
            <span href="#" className="hover:text-gray-300 cursor-pointer">
              <XIcon className="h-6 w-6" />
            </span>
            <span href="#" className="hover:text-gray-300 cursor-pointer">
              <a
                style={{ textDecoration: "none" }}
                href="https://www.instagram.com/iham_baobab?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="blank"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
            </span>
            <span href="#" className="hover:text-gray-300 cursor-pointer">
              <LinkedInIcon className="h-6 w-6" />
            </span>
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

import React, { useState } from 'react';
import { Mail, Phone, Lock, Eye, EyeOff, User } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/logo.png';

function Inscription() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigate();
    
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <img src={logo} alt="Logo" className="mx-auto w-25 h-25" />
                    <h2 className="mt-6 text-3xl font-bold text-[#B2905F]" style={{textTransform: "uppercase"}}>Créer un compte</h2>
                </div>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nom complet
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#B2905F] focus:border-[#B2905F] sm:text-sm"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Adresse email
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#B2905F] focus:border-[#B2905F] sm:text-sm"
                                placeholder="vous@exemple.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Numéro de téléphone
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#B2905F] focus:border-[#B2905F] sm:text-sm"
                                placeholder="+33 6 12 34 56 78"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de passe
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#B2905F] focus:border-[#B2905F] sm:text-sm"
                                placeholder="Votre mot de passe"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                >
                                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirmer le mot de passe
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#B2905F] focus:border-[#B2905F] sm:text-sm"
                                placeholder="Confirmez votre mot de passe"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                >
                                    {showConfirmPassword ? <Eye className="h-5 w-5" />: <EyeOff className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-[#B2905F] focus:ring-[#B2905F] border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            J'accepte les{' '}
                            <span className="font-medium text-[#B2905F] hover:text-[#B17236] cursor-pointer">
                                conditions d'utilisation
                            </span>{' '}
                            et la{' '}
                            <p className="font-medium text-[#B2905F] hover:text-[#B17236] cursor-pointer">
                                politique de confidentialité
                            </p>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#30A08B] hover:bg-[#B17236] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#30A08B]"
                        >
                            S'inscrire
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Ou inscrivez-vous avec</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <div>
                            <p className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Sign up with Facebook</span>
                                <FacebookIcon />
                            </p>
                        </div>

                        <div>
                            <p className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Sign up with Twitter</span>
                                <XIcon />
                            </p>
                        </div>

                        <div>
                            <p
                              
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Sign up with GitHub</span>
                                <GoogleIcon />
                            </p>
                        </div>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Déjà membre ?{' '}
                    <span onClick={() => navigation("/")} className="font-medium text-[#30A08B] hover:text-[#B2905F] cursor-pointer">
                        Connectez-vous
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Inscription;
// #30A08B
// #B2905F
// #B17236

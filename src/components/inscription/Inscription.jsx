import React, { useState } from 'react';
import { Mail, Phone, Lock, Eye, EyeOff, User } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../image/logo.png';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from '../../pages/LoadingIndicator';
import Alert from '../../pages/Alert';
import axios from 'axios';
const BackendUrl = process.env.REACT_APP_Backend_Url;



function Inscription({chg}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alert, setAlert] = useState({ visible: false, type: "", message: "ds" });
    const navigation = useNavigate();
    

    const navigue = useNavigate();
    const [isloading, setIsloading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [whatsapp, setWhatsapp] = useState(true);
    const regexPhone = /^[0-9]{8,}$/;
    const location = useLocation();
    
    // const handleAlert = (message) => {
    //     toast.success(`${message} !`, {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   };
    
    //   const handleAlertwar = (message) => {
    //     toast.warn(`${message} !`, {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   };

      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const showAlert = (type, message) => {
        setAlert({ visible: true, type, message });
        setTimeout(() => {
          setAlert({ visible: false, type: "", message: "" });
        }, 5000); // 3 secondes
      };
      
      const handleAlert = (message) => {
        showAlert("success", message);
      };
    
      const handleAlertwar = (message) => {
        showAlert("warn", message);
      };



      const navigateBasedOnLocation = () => {
        const location = new URLSearchParams(window.location.search);
        const destinations = {
          fromCart: "/NotificationHeader",
          fromProfile: "/Profile",
          fromMore: "/More",
          fromMessages: "/Messages",
        };
    
        for (const [key, path] of Object.entries(destinations)) {
          if (location.get(key)) {
            navigation(`${path}?${key}=true`);
            return;
          }
        }
        navigation("/Home");
      };





      const validateCredentials = (e) => {
        e.preventDefault();
        const nameV = name.trim();
        const emailV = email.trim();
        const passwordV = password.trim();
        const passwordCV = passwordConf.trim();
        const phoneNumberV = phoneNumber.trim();
        // console.log(nameV,emailV,passwordV,phoneNumberV)
    
        if (nameV === "" || name.length < 3) {
          handleAlertwar("Veuillez entrer un nom valide au moins 3 string.");
          return false;
        } else if (emailV.length !== 0 && !validateEmail(emailV)) {
          handleAlertwar("Veuillez entrer une adresse e-mail valide.");
          return false;
        } else if (passwordV === "" || passwordV.length < 6) {
          handleAlertwar(
            "Veuillez entrer un mot de passe valide au moins 6 carracters."
          );
          return false;
        }else if (passwordCV !==passwordV) {
            handleAlertwar(
              "vos deux mot de passe ne sont pas comforme"
            );
            return false;
          }
        
        else if (
          (phoneNumberV.length > 0 && !regexPhone.test(phoneNumber)) ||
          phoneNumberV.length > 11
        ) {
          handleAlertwar("Veuillez entrer un numero fonctionnel");
          return false;
        } else {
        //   console.log(passwordV,phoneNumberV,emailV)
          setIsloading(true);
          axios
            .post(`${BackendUrl}/user`, {
              name: nameV,
              password: passwordV,
              email: emailV,
              phoneNumber:phoneNumberV,
              whatsapp,
            })
            .then((response) => {
            //   console.log(passwordV,phoneNumberV,emailV,2)
              axios
                .post(
                  `${BackendUrl}/login`,
    
                  {
                    email: emailV.length > 0 ? emailV : null, // Utilisez l'email si il est saisi
                    phoneNumber: phoneNumberV.length > 0 ? phoneNumberV : null, // Utilisez le numéro de téléphone si il est saisi
                    password: passwordV,
                  },
                  {
                    withCredentials: true,
                    credentials: "include",
                  }
                )
                .then((user) => {
                  // console.log(user);
                  const dateActuelle = new Date();
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const dateInscription = dateActuelle.toLocaleDateString(
                    "fr-FR",
                    options
                  );
    
                  if (user.status === 200) {
                    const message = `<h1>Nouvel Utilisateur Inscrit sur Habou227</h1>
                    <p>Cher(e)Habou227,</p>
                    <p>Nous avons le plaisir de vous informer qu'un nouvel utilisateur s'est inscrit sur Habou227. Voici les détails de l'utilisateur :</p>
                    <ul>
                        <li>Nom : ${nameV}</li>
                        <li>Adresse e-mail ou numero : ${emailV} ${phoneNumberV}</li>
                        <li>Date d'inscription : ${dateInscription}</li>
                    </ul>
                    <p>Vous pouvez vérifier ces informations dans notre base de données pour assurer le suivi approprié. N'hésitez pas à contacter l'utilisateur pour le saluer et l'orienter dans son expérience de magasinage en ligne.</p>
                    <p>Si vous avez des questions ou avez besoin d'informations supplémentaires, n'hésitez pas à me contacter à abdoulrazak9323@gmail.com ou par téléphone au [+227 87727501].</p>
                    <p>Nous sommes ravis d'accueillir de nouveaux utilisateurs sur Habou227 et espérons que cette nouvelle inscription contribuera à notre croissance continue.</p>
                    <p>Cordialement,</p>
                    <p>Abdoul Razak<br>L'équipe IHAM Baobab</p>`;
                    const emailData = {
                      senderEmail: emailV,
                      subject: "Nouveau utilisateur",
                      message: `<div>${message}</div`,
                      titel: `<br/><br/><h3>Nouveau utilisateur sur IHAM Baobab Web</h3>`,
                    };
    
                    axios
                      .post(`${BackendUrl}/sendMail`, emailData)
                      .then((response) => {})
                      .catch((error) => {
                        console.error("Erreur lors de la requête email:", error);
                      });
    
                    handleAlert(user.data.message);
                    setIsloading(false);
                    chg("oui");
                    navigateBasedOnLocation()
                    localStorage.setItem(`userEcomme`, JSON.stringify(user.data));
                  } else {
                    handleAlertwar(user.data.message);
                  }
                })
                .catch((error) => {
                  setIsloading(false);
                  if (error.response.status === 400){
                    handleAlertwar(error.response.data.message);
                    console.log('non1')
                  }
                  else{ console.log(error.response);
                    console.log('non1')
                  }
                });
            })
            .catch((error) => {
              setIsloading(false);
              console.log(error);
              if (error.response.status === 400) {
                handleAlertwar(error.response.data.message);
                return;
              }
              if (error.response.status === 409) {
                setIsloading(false);
                handleAlertwar(error.response.data.message);
                return;
              }
              // console.log(error.response.data.message);
              console.log(error.response);
            });
        }
      };






      if(isloading){
        return  <div
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Connection en cours Veuillez Patientez....
          <LoadingIndicator loading={isloading} />
        </h1>
      </div>
      }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <img src={logo} alt="Logo" className="mx-auto w-25 h-25" />
                    <h2 className="mt-6 text-3xl font-bold text-[#B2905F]" style={{textTransform: "uppercase"}}>Créer un compte</h2>
                </div>

                <form  onSubmit={validateCredentials} className="space-y-6">
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
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
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
                                
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
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
                                value={phoneNumber}
                                onChange={e=>setPhoneNumber(e.target.value)}
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
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#B2905F] focus:border-[#B2905F] sm:text-sm"
                                placeholder="Votre mot de passe"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                                value={passwordConf}
                                onChange={e=>setPasswordConf(e.target.value)}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#B2905F] focus:border-[#B2905F] sm:text-sm"
                                placeholder="Confirmez votre mot de passe"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
            {alert.visible && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ visible: false })} />
      )}
        </div>
    );
}

export default Inscription;
// #30A08B
// #B2905F
// #B17236

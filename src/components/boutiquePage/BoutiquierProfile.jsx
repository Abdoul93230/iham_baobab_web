import React, { useState } from 'react'
import { 
  MapPin, 
  Phone, 
  Star, 
  ShoppingBag, 
  MessageCircle, 
  Share2, 
  Check, 
  Clock,
  Heart,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Calendar,
  Award,
  Target,
  Truck,
  CreditCard,
  UserPlus,
  UserCheck,

} from 'lucide-react'


export default function BoutiquierProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeSection, setActiveSection] = useState('produits');
  const [selectedReviewFilter, setSelectedReviewFilter] = useState('recent');
  const [newReview, setNewReview] = useState({
    client: '',
    note: 0,
    commentaire: ''
  });

  // Données du boutiquier avec informations détaillées
  const boutiquier = {
    id: 1,
    nom: "Marie Andriatsitohaina",
    photo: "https://plus.unsplash.com/premium_photo-1669343628944-d0e2d053a5e8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    adresse: "Rue Ranavalona, Antananarivo, Madagascar",
    telephone: "+261 34 XX XX XX",
    email: "marie.artisan@example.com",
    description: "Artisan passionnée de mode malgache, je crée des vêtements et accessoires uniques qui célèbrent notre patrimoine culturel.",
    note: 4.7,
    totalProduits: 42,
    followers: 256,
    categoriesProduits: [
      "Vêtements Traditionnels", 
      "Accessoires", 
      "Artisanat Local"
    ],
    heuresOuverture: "8h-18h",
    estVerifie: true,
    informationsDetaillees: {
      dateInscription: "2022-03-15",
      methodesLivraison: ["Colissimo", "Livraison locale", "Point relais"],
      methodesPaiement: ["Carte bancaire", "PayPal", "Virement"],
      politique: "Remboursement possible sous 14 jours, article non utilisé et dans son état original.",
      certifications: ["Artisan local", "Made in Madagascar"]
    },
    produits: [
      {
        id: 1,
        nom: "Robe Traditionnelle Malgache",
        prix: 129.99,
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S711d4e9bd7d54ee0be1500b1d8966600x.jpg_480x480.jpg_.webp",
        note: 4.8
      },
      {
        id: 2,
        nom: "Sac Tressé Artisanal",
        prix: 89.50,
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S711d4e9bd7d54ee0be1500b1d8966600x.jpg_480x480.jpg_.webp",
        note: 4.9
      },
      {
        id: 3,
        nom: "Écharpe en Soie",
        prix: 59.99,
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S711d4e9bd7d54ee0be1500b1d8966600x.jpg_480x480.jpg_.webp",
        note: 4.7
      }
    ],
    avis: [
      {
        id: 1,
        client: "Sophie Dupont",
        note: 5,
        date: "2024-02-15",
        commentaire: "Une robe absolument magnifique ! La qualité est exceptionnelle et le design unique. Je recommande vivement.",
        likes: 12,
        dislikes: 0
      },
      {
        id: 2,
        client: "Jean Martin",
        note: 4,
        date: "2024-01-20",
        commentaire: "Très bon artisan. Le sac que j'ai acheté est très bien confectionné. Petit bémol sur le délai de livraison.",
        likes: 5,
        dislikes: 2
      },
      {
        id: 3,
        client: "Léa Rakoto",
        note: 5,
        date: "2024-03-10",
        commentaire: "Fière de soutenir l'artisanat local. Chaque pièce raconte une histoire et transmet notre culture.",
        likes: 8,
        dislikes: 1
      }
    ]
  };

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index} 
        size={20}
        onClick={() => interactive && setNewReview({...newReview, note: index + 1})}
        className={`cursor-${interactive ? 'pointer' : 'default'} ${
          index < Math.floor(rating) 
            ? 'text-yellow-500' 
            : 'text-gray-300'
        }`}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  const filterAndSortReviews = () => {
    let filteredReviews = [...boutiquier.avis];
    
    switch(selectedReviewFilter) {
      case 'top':
        filteredReviews.sort((a, b) => b.likes - a.likes);
        break;
      case 'recent':
      default:
        filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    return filteredReviews;
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.client || !newReview.commentaire || newReview.note === 0) {
      alert('Veuillez remplir tous les champs et donner une note');
      return;
    }

    const review = {
      ...newReview,
      id: boutiquier.avis.length + 1,
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0
    };

    boutiquier.avis.push(review);
    setNewReview({ client: '', note: 0, commentaire: '' });
  };

  const renderReviews = () => {
    const reviews = filterAndSortReviews();

    return (
      <div className="space-y-4 mb-3">
  {/* Filtre des avis */}
<div className="flex flex-col sm:flex-row justify-between items-center mb-4">
  <h3 className="text-xl font-semibold text-[#30A08B] mb-2 sm:mb-0">
    Avis Clients ({reviews.length})
  </h3>
  
  <div className="flex space-x-2">
    {['recent', 'top'].map((filter) => (
      <button
        key={filter}
        onClick={() => setSelectedReviewFilter(filter)}
        className={`px-3 py-1 rounded-full text-xs capitalize text-nowrap transition duration-300 ${
          selectedReviewFilter === filter
            ? 'bg-[#30A08B] text-white'
            : 'bg-gray-200 text-gray-700'
        } hover:bg-[#30A08B] hover:text-white`}
      >
        {filter === 'recent' ? 'Plus récents' : 'Les plus likés'}
      </button>
    ))}
  </div>
</div>


        {/* Liste des avis existants */}
        {reviews.map((avis) => (
          <div 
            key={avis.id} 
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{avis.client}</h4>
                <div className="flex">
                  {renderStars(avis.note)}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(avis.date).toLocaleDateString('fr-FR', {
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric'
                })}
              </span>
            </div>
            <p className="text-gray-600 mb-3">{avis.commentaire}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-green-600">
                <ThumbsUp size={16} />
                <span>{avis.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-red-600">
                <ThumbsDown size={16} />
                <span>{avis.dislikes}</span>
              </button>
            </div>
          </div>
        ))}

        {/* Formulaire d'ajout d'avis */}
        <form onSubmit={handleAddReview} className="bg-white p-6 rounded-xl shadow-md mt-6">
          <h3 className="text-xl font-semibold text-[#30A08B] mb-4">
            Laissez votre avis
          </h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Votre nom"
              value={newReview.client}
              onChange={(e) => setNewReview({...newReview, client: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
            <div className="flex items-center space-x-2">
              <span>Votre note :</span>
              {renderStars(newReview.note, true)}
            </div>
            <textarea 
              placeholder="Votre commentaire"
              value={newReview.commentaire}
              onChange={(e) => setNewReview({...newReview, commentaire: e.target.value})}
              className="w-full p-2 border rounded-md h-24"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-[#30A08B] text-white py-2 rounded-full hover:bg-opacity-90"
            >
              Publier mon avis
            </button>
          </div>
        </form>

        {reviews.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Aucun avis pour le moment
          </div>
        )}
      </div>
    );
  };

  const renderInfoSection = () => {
    const { informationsDetaillees } = boutiquier;
    return (
      <div className="space-y-6">
        {/* Informations de contact */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#30A08B] mb-4">
            Coordonnées
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-[#30A08B]" />
              <span>{boutiquier.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-[#30A08B]" />
              <span>{boutiquier.telephone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-[#30A08B]" />
              <span>{boutiquier.adresse}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="text-[#30A08B]" />
              <span>
                Inscrit depuis le{' '}
                {new Date(informationsDetaillees.dateInscription).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Livraison et Paiement */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#30A08B] mb-4">
            Livraison & Paiement
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Truck className="text-[#30A08B]" />
              <div>
                <span className="font-semibold">Méthodes de livraison</span>
                <div className="text-gray-600">
                  {informationsDetaillees.methodesLivraison.join(', ')}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="text-[#30A08B]" />
              <div>
                <span className="font-semibold">Méthodes de paiement</span>
                <div className="text-gray-600">
                  {informationsDetaillees.methodesPaiement.join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Politique et Certifications */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#30A08B] mb-4">
            Politique et Certifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Target className="text-[#30A08B]" />
              <div>
                <span className="font-semibold">Politique de retour</span>
                <p className="text-gray-600">
                  {informationsDetaillees.politique}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="text-[#30A08B]" />
              <div>
                <span className="font-semibold">Certifications</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {informationsDetaillees.certifications.map((cert) => (
                    <span 
                      key={cert}
                      className="bg-[#30A08B]/10 text-[#30A08B] px-3 py-1 rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* En-tête du Profil (code précédent inchangé) */}
      <div className="relative">
{/* Couverture (simulée) */}
<div className="bg-[#30A08B] h-40 md:h-56"></div>

<div className="container mx-auto px-4 -mt-16 relative">
  <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
    {/* Photo de Profil */}
    <div className="relative">
      <img 
        src={boutiquier.photo} 
        alt={boutiquier.nom}
        className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white object-cover shadow-lg"
      />
      {boutiquier.estVerifie && (
        <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
          <Check size={16} />
        </div>
      )}
    </div>

    <div className="text-center md:text-left flex-1">
      <div className="flex items-center justify-center md:justify-start space-x-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {boutiquier.nom}
        </h1>
      </div>

      <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
        {renderStars(boutiquier.note)}
        <span className="text-gray-600 ml-2">
          ({boutiquier.note}/5)
        </span>
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
  
  {/* Bouton Suivre avec deux icônes */}
  <button
    onClick={() => setIsFollowing(!isFollowing)}
    className={`px-6 py-2 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform ${
      isFollowing
        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        : 'bg-[#B17236] text-white hover:scale-105'
    } shadow-md focus:outline-none flex items-center justify-center space-x-2`}
  >
    {/* Icône 1 (par exemple un coeur) */}
    <span>{isFollowing ? 'Suivi' : 'Suivre'}</span>
    {isFollowing ?   <UserCheck size={20} className="inline" /> : <UserPlus size={20} className="inline" />}
    
  </button>
  
  {/* Bouton Contacter avec deux icônes */}
  <button className="bg-[#30A08B] text-white px-6 py-2 rounded-full text-lg font-semibold flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:bg-opacity-90 hover:scale-105 shadow-md focus:outline-none">
    {/* Icône 1 (message circle) */}
    <MessageCircle size={20} className="inline" />
    <span>Contacter</span>

  </button>
  
</div>

    </div>
  </div>
</div>
</div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-3 mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Colonne Gauche : Informations */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-[#30A08B] mb-4">
                À Propos
              </h2>
              <p className="text-gray-600">{boutiquier.description}</p>
              </div>

            {/* Navigation des Sections */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="flex border-b">
                {['produits', 'infos', 'avis'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`flex-1 py-3 capitalize border-b-2 ${
                      activeSection === section 
                        ? 'border-[#30A08B] text-[#30A08B]'
                        : 'border-transparent text-gray-500'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {/* Contenu des Sections */}
              {activeSection === 'produits' && (
                <div className="p-6 grid md:grid-cols-3 gap-4">
                  {boutiquier.produits.map((produit) => (
                    <div 
                      key={produit.id} 
                      className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-md transition"
                    >
                      <img 
                        src={produit.image} 
                        alt={produit.nom} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold">{produit.nom}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-[#B17236] font-bold">
                            {produit.prix} FCFA
                          </span>
                          <div className="flex">
                            {renderStars(produit.note)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Section Infos */}
              {activeSection === 'infos' && (
                <div className="p-6">
                  {renderInfoSection()}
                </div>
              )}

              {/* Section Avis */}
              {activeSection === 'avis' && (
                <div className="p-6">
                  {renderReviews()}
                </div>
              )}
            </div>
          </div>

          {/* Colonne Droite : Statistiques & Informations */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-[#30A08B] mb-4">
                Informations
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-[#30A08B]" />
                  <span>{boutiquier.adresse}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-[#30A08B]" />
                  <span>{boutiquier.telephone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-[#30A08B]" />
                  <span>Ouvert {boutiquier.heuresOuverture}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <ShoppingBag className="mx-auto mb-2 text-[#30A08B]" />
                  <span className="font-bold block">{boutiquier.totalProduits}</span>
                  <span className="text-sm text-gray-500">Produits</span>
                </div>
                <div>
                  <Heart className="mx-auto mb-2 text-[#B17236]" />
                  <span className="font-bold block">{boutiquier.followers}</span>
                  <span className="text-sm text-gray-500">Suivis</span>
                </div>
                <div>
                  <Star className="mx-auto mb-2 text-yellow-500" />
                  <span className="font-bold block">{boutiquier.note}</span>
                  <span className="text-sm text-gray-500">Note</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 mb-3 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-[#30A08B] mb-4">
                Catégories
              </h2>
              <div className="flex flex-wrap gap-2">
                {boutiquier.categoriesProduits.map((categorie) => (
                  <span 
                    key={categorie}
                    className="bg-[#30A08B]/10 text-[#30A08B] px-3 py-1 rounded-full text-sm"
                  >
                    {categorie}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



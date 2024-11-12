import React, { useState,useRef } from "react";
import { Star, X } from "lucide-react";

const comments = [
  {
    id: 1,
    name: "Acheteur Ihambaobab",
    date: "20 août 2024",
    color: "white",
    size: "45(27.5CM)",
    review:
      "Pour le prix qu'ils ont, un peu plus peut être commandé. Ils sont très légers; Maille, donc ils ne font pas mal et ne transpiration pas; Taille appropriée. Apparemment, ils sont à l'aise. Espérons qu'ils résistent suffisamment.",
    images: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
    ],
  },
  {
    id: 2,
    name: "Acheteur Ihambaobab",
    date: "20 août 2024",
    color: "white",
    size: "45(27.5CM)",
    review:
      "Pour le prix qu'ils ont, un peu plus peut être commandé. Ils sont très légers; Maille, donc ils ne font pas mal et ne transpiration pas; Taille appropriée. Apparemment, ils sont à l'aise. Espérons qu'ils résistent suffisamment.",
    images: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
    ],
  },
  {
    id: 3,
    name: "Acheteur Ihambaobab",
    date: "20 août 2024",
    color: "white",
    size: "45(27.5CM)",
    review:
      "Pour le prix qu'ils ont, un peu plus peut être commandé. Ils sont très légers; Maille, donc ils ne font pas mal et ne transpiration pas; Taille appropriée. Apparemment, ils sont à l'aise. Espérons qu'ils résistent suffisamment.",
    images: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
    ],
  },
  {
    id: 4,
    name: "Acheteur Ihambaobab",
    date: "20 août 2024",
    color: "white",
    size: "45(27.5CM)",
    review:
      "Pour le prix qu'ils ont, un peu plus peut être commandé. Ils sont très légers; Maille, donc ils ne font pas mal et ne transpiration pas; Taille appropriée. Apparemment, ils sont à l'aise. Espérons qu'ils résistent suffisamment.",
    images: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
    ],
  },
  {
    id: 5,
    name: "Acheteur Ihambaobab",
    date: "20 août 2024",
    color: "white",
    size: "45(27.5CM)",
    review:
      "Pour le prix qu'ils ont, un peu plus peut être commandé. Ils sont très légers; Maille, donc ils ne font pas mal et ne transpiration pas; Taille appropriée. Apparemment, ils sont à l'aise. Espérons qu'ils résistent suffisamment.",
    images: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
    ],
  },
];
function CommentaireProduit({coments}) {
  // console.log(coments)
  const [showModal, setShowModal] = useState(false);
  const swiperRef = useRef(null);

  const relatedSearches = [
    "chaussure asics homme blanche",
    "chaussures de marche sportive homme",
    "sneakers blanc homme",
    "chaussure homme sport",
    "chaussures de sport taille 39",
    "basket reebok blanche homme",
    "espadrille homme blanche",
    "chaussure sport homme",
    "chaussure de sport homme running",
    "chaussures sport hommes soldes",
    "sneaker blanche homme",
    "chaussure homme sporti"
  ];

  const keywords = [
    "baskets homme scratch",
    "basquette running femme",
    "chaussure sports femme",
    "shoes running men marque",
    "sneaker scratch homme",
    "verrou coffre fort"
  ];

  const CommentCard = ({ comment }) => (
    <div className="p-2 border rounded-md" ref={swiperRef}>
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-pink-100 rounded-full mr-2"></div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-2">
        Color: {comment.color} | Shoe Size: {comment.size}
      </p>
      <p className="text-gray-800 mb-4">{comment.review}</p>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {comment.images.map((image, index) => (
          <div
            key={index}
            className="bg-gray-200 h-22 border overflow-hidden rounded-md"
          >
            <img src={image} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {comment.name} | {comment.date}
        </span>
        <div className="flex text-nowrap cursor-pointer items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          <span>Serviable (0)</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-3" ref={swiperRef}>
      <div className="border-t border-gray-300 mb-4" />
      <p className="text-2xl font-bold text-[#B17236] my-3">
        Avis des acheteurs ({comments.length})
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4 mx-auto">
        {comments.slice(0, 4).map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
      {comments.length > 4 && (
        <div className="flex items-center justify-center my-4">
          <button
            className="bg-[#96956B] bg-opacity-50 p-2 w-40 rounded-full text-[#399F89]"
            onClick={() => setShowModal(true)}
          >
            Voir plus
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl  font-bold text-[#B17236]">
                Tous les avis
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto flex-grow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}




      <div className="border-t border-gray-300 mb-4" />
      <div className=" mx-auto p-4">
      <h2 className="text-2xl text-[#B17236] font-bold mb-4">Les acheteurs ont aussi recherchés</h2>
      
      <div className="mb-6">
        <h3 className="text-lg text-[#B17236] font-semibold  mb-2">Recherche connexe</h3>
        <div className="flex flex-wrap gap-2 cursor-pointer">
          {relatedSearches.map((search, index) => (
            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
              {search}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg text-[#B17236] font-semibold  mb-2">Mots-clés de classement</h3>
        <div className="flex flex-wrap gap-2 cursor-pointer">
          {keywords.map((keyword, index) => (
            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
              {keyword}
            </span>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-gray-600">
        Cet article est dans la catégorie Accueil
      </p>
    </div>

    </div>
  );
}

export default CommentaireProduit;

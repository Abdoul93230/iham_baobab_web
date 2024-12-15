import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  ChevronLeft,
  Image,
  Package,
  Clock,
  Star,
  Check,
  CheckCheck,
} from "lucide-react";

const MessagerieMain = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showMobileList, setShowMobileList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("recent");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Simuler des données initiales
  const initialConversations = [
    {
      id: 1,
      vendeur: "Shop Electronics",
      image:
        "https://elfsight.com/fr/wp-content/uploads/sites/5/2024/04/how-to-integrate-whatsapp-in-your-website-featured-image-1.png",
      nonLu: 2,
      status: "en_ligne",
      dernierMessage: "D'accord, je vous envoie les photos",
      timestamp: "10:30",
    },
    {
      id: 2,
      vendeur: "Mode Fashion",
      image:
        "https://elfsight.com/fr/wp-content/uploads/sites/5/2024/04/how-to-integrate-whatsapp-in-your-website-featured-image-1.png",
      nonLu: 1,
      status: "hors_ligne",
      dernierMessage: "Le produit sera expédié demain",
      timestamp: "09:15",
    },
    {
      id: 3,
      vendeur: "Tech Solutions",
      image:
        "https://elfsight.com/fr/wp-content/uploads/sites/5/2024/04/how-to-integrate-whatsapp-in-your-website-featured-image-1.png",
      nonLu: 0,
      status: "hors_ligne",
      dernierMessage: "Merci pour votre commande",
      timestamp: "14:45",
    },
  ];

  const [conversations, setConversations] = useState(initialConversations);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simuler la réception d'un message
  const simulateResponse = (chatId) => {
    setTimeout(() => {
      const responses = [
        "Je vous remercie pour votre message. Je peux vous aider avec cela.",
        "Pouvez-vous me donner plus de détails ?",
        "Très bien, je vais vérifier cela pour vous.",
        "Merci pour votre patience.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const newMessage = {
        id: Date.now(),
        text: randomResponse,
        sender: "vendeur",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "read",
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    const trimmedMessage = inputMessage.trim();
    if (trimmedMessage !== "") {
      const newMessage = {
        id: Date.now(),
        text: trimmedMessage,
        sender: "client",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
      setIsTyping(true);
      simulateResponse(selectedChat?.id);
    }
  };

  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Filter and sort conversations
  const filteredConversations = conversations
    .filter((conv) =>
      conv.vendeur.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (activeFilter === "unread") {
        return b.nonLu - a.nonLu;
      }
      // Default to most recent
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowMobileList(false);

    // Reset unread count for selected chat
    const updatedConversations = conversations.map((conv) =>
      conv.id === chat.id ? { ...conv, nonLu: 0 } : conv
    );
    setConversations(updatedConversations);

    // Simulate initial conversation
    setMessages([
      {
        id: 1,
        text: "Bonjour, je suis intéressé par vos produits",
        sender: "client",
        timestamp: "10:25",
        status: "read",
      },
      {
        id: 2,
        text: "Bien sûr, je peux vous aider. Quel produit vous intéresse ?",
        sender: "vendeur",
        timestamp: "10:26",
        status: "read",
      },
    ]);
  };

  const MessageStatus = ({ status }) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-[#30A08B]" />;
      default:
        return null;
    }
  };

  const ChatList = () => (
    <div
      className={`w-full md:w-96 border-r border-gray-200 bg-white h-full ${
        !showMobileList ? "hidden md:block" : ""
      }`}
    >
      <div className="sticky top-0 z-10">
        <div className="p-4 bg-[#30A08B] text-white">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2905F]"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex overflow-x-auto p-2 bg-white border-b border-gray-200">
          <button
            onClick={() => setActiveFilter("recent")}
            className={`flex items-center px-4 py-2 rounded-full text-sm whitespace-nowrap mr-2 ${
              activeFilter === "recent"
                ? "bg-[#30A08B] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            Récents
          </button>
          <button
            onClick={() => setActiveFilter("unread")}
            className={`flex items-center px-4 py-2 rounded-full text-sm whitespace-nowrap mr-2 ${
              activeFilter === "unread"
                ? "bg-[#B2905F] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Star className="w-4 h-4 mr-2" />
            Non lus
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-180px)]">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => handleChatSelect(conv)}
            className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors duration-200 ${
              selectedChat?.id === conv.id ? "bg-[#30A08B]/10" : ""
            }`}
          >
            <div className="relative">
              <img
                src={conv.image}
                alt={conv.vendeur}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#B2905F]"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                  conv.status === "en_ligne" ? "bg-[#30A08B]" : "bg-gray-300"
                } border-2 border-white`}
              ></span>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">{conv.vendeur}</h3>
                <span className="text-xs text-gray-500">{conv.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {conv.dernierMessage}
              </p>
            </div>
            {conv.nonLu > 0 && (
              <span className="ml-2 bg-[#30A08B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {conv.nonLu}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const ChatWindow = () => {
    if (!selectedChat) {
      return (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#30A08B] rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Bienvenue dans votre messagerie
            </h2>
            <p className="text-gray-500">
              Sélectionnez une conversation pour commencer
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`flex-1 flex flex-col h-full ${
          showMobileList ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="flex items-center p-4 bg-[#30A08B] text-white">
          <button
            onClick={() => setShowMobileList(true)}
            className="md:hidden mr-2 hover:bg-white/10 rounded-full p-1"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={selectedChat.image}
            alt={selectedChat.vendeur}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="ml-4 flex-1">
            <h3 className="font-semibold">{selectedChat.vendeur}</h3>
            <p className="text-sm opacity-90">
              {selectedChat.status === "en_ligne" ? "En ligne" : "Hors ligne"}
            </p>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#f0f2f5] p-4">
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "client" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-[75%] ${
                    message.sender === "client"
                      ? "bg-[#30A08B] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                      : "bg-white text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                  } p-3 shadow-sm`}
                >
                  <p className="text-[15px] whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className="text-xs opacity-70">
                      {message.timestamp}
                    </span>
                    {message.sender === "client" && (
                      <MessageStatus status={message.status} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 rounded-lg p-3 shadow-sm">
                  <p className="text-gray-500 text-sm">En train d'écrire...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <button className="p-2 hover:bg-gray-100 rounded-full text-[#B2905F] transition-colors">
              <Package className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-[#B2905F] transition-colors">
              <Image className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-[#B2905F] transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.target.value);
                }}
                onKeyPress={handleKeyPress} 
                placeholder="Écrivez votre message..."
                className="w-full py-2 px-4 rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#30A08B] max-h-32 resize-none"
                rows="1" 
                style={{ minHeight: "40px", overflow: "hidden" }} 
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`p-2 rounded-full ${
                inputMessage.trim()
                  ? "bg-[#30A08B] hover:bg-[#30A08B]/90"
                  : "bg-gray-200"
              } transition-colors`}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen p-0 m-0 bg-white">
      <ChatList />
      <ChatWindow />
    </div>
  );
};

export default MessagerieMain;

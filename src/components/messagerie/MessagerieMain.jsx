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
import axios from "axios";
import io from "socket.io-client";

import img from "../../Images/logo.png";

const BackendUrl = process.env.REACT_APP_Backend_Url;

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
  const socket = io(BackendUrl);
  const userE = JSON.parse(localStorage.getItem("userEcomme"));

  // Simuler des données initiales
  const initialConversations = [
    {
      id: 1,
      vendeur: "IHAM BAOBAB's Store",
      image: img,
      nonLu: 0,
      status: "en_ligne",
      dernierMessage: "Bienvenue dans notre boutique !",
      timestamp: "10:30",
    },
  ];

  const [conversations, setConversations] = useState(initialConversations);

  useEffect(() => {
    if (userE?.id) {
      // Charger les messages de l'utilisateur
      axios
        .get(`${BackendUrl}/getUserMessagesByClefUser/${userE.id}`)
        .then((res) => {
          setMessages(res.data);
          // Mettre à jour le nombre de messages non lus
          const unreadCount = res.data.filter(
            (item) => item.lusUser === false && item.provenance === false
          )?.length;
          setConversations((prevConv) =>
            prevConv.map((conv) => ({
              ...conv,
              nonLu: unreadCount,
              dernierMessage:
                res.data[res.data.length - 1]?.message || conv.dernierMessage,
              timestamp: res.data[res.data.length - 1]
                ? formatDate(res.data[res.data.length - 1].date)
                : conv.timestamp,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });

      // Marquer les messages comme lus
      // axios
      //   .put(`${BackendUrl}/lecturUserMessage`, { userKey: userE.id })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }, [userE?.id]);

  useEffect(() => {
    socket.on("new_message_user", (message) => {
      if (message.data.clefUser === userE?.id) {
        refreshMessages();
      }
    });

    socket.on("delete_message", (data) => {
      if (data) {
        refreshMessages();
      }
    });

    return () => {
      socket.off("new_message_user");
      socket.off("delete_message");
    };
  }, [socket, userE?.id]);

  const refreshMessages = () => {
    if (userE?.id) {
      axios
        .get(`${BackendUrl}/getUserMessagesByClefUser/${userE.id}`)
        .then((res) => {
          setMessages(res.data);
          // Mettre à jour le nombre de messages non lus
          const unreadCount = res.data.filter(
            (item) => item.lusUser === false && item.provenance === false
          )?.length;
          setConversations((prevConv) =>
            prevConv.map((conv) => ({
              ...conv,
              nonLu: unreadCount,
              dernierMessage:
                res.data[res.data.length - 1]?.message || conv.dernierMessage,
              timestamp: res.data[res.data.length - 1]
                ? formatDate(res.data[res.data.length - 1].date)
                : conv.timestamp,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = inputMessage.trim();
    if (trimmedMessage === "") return;

    const messageData = {
      message: trimmedMessage,
      clefUser: userE.id,
      provenance: true,
    };

    axios
      .post(`${BackendUrl}/createUserMessage`, messageData)
      .then(() => {
        socket.emit("new_message_u", { data: messageData });
        setInputMessage("");
        if (inputRef.current) {
          inputRef.current.style.height = "40px"; // Reset textarea height
        }
        refreshMessages();
      })
      .catch((error) => console.log(error));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDeleteMessage = (messageId) => {
    axios
      .put(`${BackendUrl}/updateUserMessageAttributeById/${messageId}`, {
        use: false,
      })
      .then(() => {
        refreshMessages();
      })
      .catch((error) => console.log(error));
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

    axios
      .put(`${BackendUrl}/lecturUserMessage`, { userKey: userE.id })
      .then((resp) => {
        console.log(resp);
      })
      .catch((erro) => {
        console.log(erro);
      });

    // Reset unread count for selected chat
    const updatedConversations = conversations.map((conv) =>
      conv.id === chat.id ? { ...conv, nonLu: 0 } : conv
    );
    setConversations(updatedConversations);
    console.log(updatedConversations);
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

  const formatDate = (date) => {
    const options = { weekday: "long", hour: "numeric", minute: "numeric" };
    return new Date(date).toLocaleString("en-US", options);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]); // Se déclenche à chaque fois que messages change

  // Function to adjust textarea height
  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "40px"; // Reset height
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.min(scrollHeight, 128) + "px"; // Max height: 128px (32 * 4)
    }
  };

  return (
    <div className="flex h-screen p-0 m-0 bg-white">
      {
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
                      conv.status === "en_ligne"
                        ? "bg-[#30A08B]"
                        : "bg-gray-300"
                    } border-2 border-white`}
                  ></span>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">
                      {conv.vendeur}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-600 truncate"
                    dangerouslySetInnerHTML={{
                      __html: `${conv?.dernierMessage.slice(0, 10)} ...`,
                    }}
                  >
                    {/* {conv.dernierMessage} */}
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
      }
      {!selectedChat ? (
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
      ) : (
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
              {messages.map((message, index) => {
                if (!message.use) return null;
                return (
                  <div
                    key={index}
                    className={`flex ${
                      message.provenance ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`max-w-[75%] ${
                        message.provenance
                          ? "bg-[#30A08B] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                          : "bg-white text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                      } p-3 shadow-sm`}
                    >
                      <div
                        className="text-[15px] whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: message?.message }}
                      >
                        {/* {message.message} */}
                      </div>
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className="text-xs opacity-70">
                          {formatDate(message.date)}
                        </span>
                        {message.provenance && (
                          <button
                            onClick={() => handleDeleteMessage(message._id)}
                            className="text-xs opacity-70 hover:opacity-100"
                          >
                            Supprimer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white text-gray-800 rounded-lg p-3 shadow-sm">
                    <p className="text-gray-500 text-sm">
                      En train d'écrire...
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2 max-w-3xl mx-auto">
              {/* <button className="p-2 hover:bg-gray-100 rounded-full text-[#B2905F] transition-colors">
                <Package className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full text-[#B2905F] transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full text-[#B2905F] transition-colors">
                <Paperclip className="w-5 h-5" />
              </button> */}
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Écrivez votre message..."
                  className="w-full py-2 px-4 rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#30A08B] resize-none"
                  style={{ minHeight: "40px", maxHeight: "128px" }}
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
      )}
    </div>
  );
};

export default MessagerieMain;

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const Alert = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: <XCircle className="h-5 w-5 text-red-400" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
      icon: <AlertCircle className="h-5 w-5 text-yellow-400" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-400" />,
    },
  };

  const currentStyle = alertStyles[type];

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className={`${currentStyle.bg} border-l-4 ${currentStyle.border} p-4 rounded-lg shadow-lg max-w-md`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {currentStyle.icon}
          </div>
          <div className={`ml-3 ${currentStyle.text}`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={() => {
                  setIsVisible(false);
                  onClose && onClose();
                }}
                className={`inline-flex rounded-md p-1.5 ${currentStyle.text} hover:${currentStyle.bg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${currentStyle.bg} focus:ring-${currentStyle.border}`}
              >
                <span className="sr-only">Fermer</span>
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;

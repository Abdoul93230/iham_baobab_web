import React, { useEffect } from "react";

const LoadingSpinner = ({ size = "default" }) => {
  const sizeClasses = {
    small: "h-6 w-6",
    default: "h-10 w-10",
    large: "h-14 w-14",
  };

  const innerSizeClasses = {
    small: "h-4 w-4",
    default: "h-8 w-8",
    large: "h-12 w-12",
  };

  const dotSizeClasses = {
    small: "h-2 w-2",
    default: "h-4 w-4",
    large: "h-6 w-6",
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes ping {
        75%, 100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Cercle externe - teal clair pour la bordure, teal principal pour l'accent */}
        <div
          className="absolute inset-0 rounded-full border-4"
          style={{
            borderColor: "rgba(48, 160, 139, 0.2)",
            borderTopColor: "#30A08B",
            animation: "spin 1s linear infinite",
          }}
        />
        {/* Cercle interne - brown pour l'effet de ping */}
        <div
          className={`absolute left-1/2 top-1/2 ${innerSizeClasses[size]} -translate-x-1/2 -translate-y-1/2 rounded-full`}
          style={{
            backgroundColor: "#B2905F",
            animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
        />
        {/* Point central - dark brown */}
        <div
          className={`absolute left-1/2 top-1/2 ${dotSizeClasses[size]} -translate-x-1/2 -translate-y-1/2 rounded-full`}
          style={{ backgroundColor: "#B17236" }}
        />
      </div>
    </div>
  );
};

const LoadingIndicator = ({
  children,
  loading,
  className = "",
  spinnerSize = "default",
}) => {
  if (loading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ backgroundColor: "rgba(48, 160, 139, 0.05)" }}
      >
        <LoadingSpinner size={spinnerSize} />
      </div>
    );
  }

  return children;
};

export default LoadingIndicator;

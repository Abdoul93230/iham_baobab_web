// Alert.js
import React from "react";

const Alert = ({ type = "success", message, onClose }) => {
  const baseStyle = "fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg";
  const styles = {
    success: `${baseStyle} bg-green-100 text-green-700 border-l-4 border-green-500`,
    warn: `${baseStyle} bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500`,
  };

  return (
    <div className={styles[type]} role="alert">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-lg font-semibold text-gray-500 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;

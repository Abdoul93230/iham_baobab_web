import React from 'react';
import { Loader2 } from 'lucide-react';

const ButtonLoader = ({ children, isLoading, onClick, className, type = "button", disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`relative flex items-center justify-center ${className} ${
        isLoading ? 'cursor-not-allowed opacity-70' : ''
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          Chargement...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonLoader;

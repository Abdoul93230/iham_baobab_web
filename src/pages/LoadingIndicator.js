import React from "react";
import { PropagateLoader } from "react-spinners";

import "./style.css";

const LoadingIndicator = (props) => {
  return (
    <div>
      {props.loading ? (
        <div className="loading-indicator">
          <PropagateLoader color="#30A08B" size={15} />
        </div>
      ) : (
        <>{props.children}</>
      )}
    </div>
  );
};

export default LoadingIndicator;

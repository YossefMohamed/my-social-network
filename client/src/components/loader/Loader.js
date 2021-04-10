import React from "react";
import Loader from "react-loader-spinner";

function LoaderComponent() {
  return (
    <div className="loader">
      <Loader type="Oval" color="black" height={100} width={100} />
    </div>
  );
}

export default LoaderComponent;

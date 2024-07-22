import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="position-absolute">
      <p className="text-danger fst-italic m-0">{message}</p>
    </div>
  );
};

export default ErrorMessage;

import React from "react";

const CreateOrderButton = ({ isDisabled, createOrderHandler }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={createOrderHandler}
      className="btn btn-outline-success"
    >
      Create Order
    </button>
  );
};

export default CreateOrderButton;

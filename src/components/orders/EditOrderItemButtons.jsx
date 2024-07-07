import React from "react";

const EditOrderItemButtons = ({ item, addItemHandler, deleteItemHandler }) => {
  return (
    <button
      className="btn btn-danger mx-2"
      onClick={() => deleteItemHandler(item.id)}
    >
      Delete
    </button>
  );
};

export default EditOrderItemButtons;

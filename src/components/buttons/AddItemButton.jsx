import React from "react";

const AddItemButton = ({ isDisabled, addItemHandler }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={addItemHandler}
      className="btn btn-outline-success"
    >
      + Add item
    </button>
  );
};

export default AddItemButton;

import React from "react";

const AddOrderItemButtons = ({ item, changeEditState, deleteItemHandler }) => {
  return (
    <>
      {item.isEditable ? (
        <button
          disabled={item.quantity === 0 || !item.isValidQuantity}
          className="btn btn-success mx-2"
          onClick={() => changeEditState(item.id)}
        >
          Finish
        </button>
      ) : (
        <button
          className="btn btn-primary mx-2"
          onClick={() => changeEditState(item.id)}
        >
          Edit
        </button>
      )}
      <button
        className="btn btn-danger mx-2"
        onClick={() => deleteItemHandler(item.id)}
      >
        Delete
      </button>
    </>
  );
};

export default AddOrderItemButtons;

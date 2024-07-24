import React from "react";
import ErrorMessage from "./ErrorMessage";

const ItemQuantityTableCell = ({ item, onChangeItemQuantityHandler }) => {
  if (!onChangeItemQuantityHandler) {
    return <td>{item.quantity}</td>;
  }
  return (
    <td>
      <input
        id={item.id}
        value={item.quantity}
        readOnly={!item.isEditable}
        onChange={(e) => onChangeItemQuantityHandler(e)}
        type="number"
        name="quantity"
        className={
          item.isValidQuantity
            ? "form-control"
            : "form-control custom-error-form-validation"
        }
      />

      {item.isValidQuantity ? null : (
        <ErrorMessage message={"The quantity value is incorrect!"} />
      )}
    </td>
  );
};

export default ItemQuantityTableCell;

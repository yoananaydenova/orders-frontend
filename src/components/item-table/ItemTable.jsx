import React from "react";

const ItemTable = ({ items, onChangeItemQuantityHandler, buttons }) => {
  if (items.length == 0) {
    return (
      <p className="text-center fst-italic">
        The items list is empty!
      </p>
    );
  }

  return (
    <>
      <table className="table border shadow caption-top table-hover">
        <caption>List of items</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ITEM NAME</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">PRICE</th>
            <th scope="col" className="col-md-3 offset-md-3">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider align-middle">
          {items.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
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
              </td>
              <td>{item.price}</td>
              <td className="btn-group-sm">{buttons(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ItemTable;

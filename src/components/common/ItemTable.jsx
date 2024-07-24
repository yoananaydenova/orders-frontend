import React from "react";
import ItemQuantityTableCell from "./ItemQuantityTableCell";

const ItemTable = ({ items, onChangeItemQuantityHandler, buttons }) => {
  if (items.length == 0) {
    return <p className="text-center fst-italic">The items list is empty!</p>;
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
          {items.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>

              <ItemQuantityTableCell
                item={item}
                onChangeItemQuantityHandler={onChangeItemQuantityHandler}
              />
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

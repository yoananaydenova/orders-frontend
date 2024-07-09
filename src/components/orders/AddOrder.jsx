import React, { useState, useEffect } from "react";
import ItemTable from "../items/ItemTable";
import AddOrderItemButtons from "./AddOrderItemButtons";
import AddItemOrder from "./AddItemOrder";

const AddOrder = () => {
  const [requestItems, setRequestItems] = useState([]);

  const [order, setOrder] = useState({ items: [] });

  const changeEditState = (id) => {
    const orderItems = order.items;
    const currentOrderItem = orderItems.find((item) => item.id === id);
    currentOrderItem.isEditable = !currentOrderItem.isEditable;

    setOrder((prevState) => ({ ...prevState, items: orderItems }));
  };

  const onChangeItemQuantityHandler = (e) => {
    const value = e.target.value ? Number(e.target.value) : "";
    const itemId = Number(e.target.id);

    const currentRequestedItem = requestItems.find(
      (item) => item.id === itemId
    );

    const orderItems = order.items;
    const currentOrderItem = orderItems.find((item) => item.id === itemId);

    currentRequestedItem.quantity += currentOrderItem.quantity;
    currentOrderItem.isValidQuantity =
      value >= 1 && value <= currentRequestedItem.quantity;
    currentRequestedItem.quantity -= value;

    currentOrderItem.quantity = value;

    setOrder({
      totalAmount: sumTotal(orderItems),
      items: orderItems,
    });
  };

  const sumTotal = (arr) =>
    arr.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  const deleteItemHandler = (id) => {
    const orderItems = order.items;
    const currentItem = orderItems.find((item) => item.id === id);

    const currentRequestedItem = requestItems.find((item) => item.id === id);
    currentRequestedItem.quantity += currentItem.quantity;
    orderItems.splice(currentItem, 1);

    const currentItemTotalAmount = currentItem.quantity * currentItem.price;
    setOrder((prevState) => ({
      totalAmount: (prevState.totalAmount -= currentItemTotalAmount),
      items: orderItems,
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Create order</h2>

          <AddItemOrder
            order={order}
            setOrder={setOrder}
            requestItems={requestItems}
            setRequestItems={setRequestItems}
          />

          <div className="d-flex justify-content-between mb-3">
            <h6>Total amount:</h6>
            <span>{order.totalAmount}</span>
          </div>

          <ItemTable
            items={order.items}
            onChangeItemQuantityHandler={onChangeItemQuantityHandler}
            buttons={(item) => (
              <AddOrderItemButtons
                item={item}
                changeEditState={changeEditState}
                deleteItemHandler={deleteItemHandler}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AddOrder;

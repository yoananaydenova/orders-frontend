import React, { useState, useRef } from "react";
import ItemTable from "../item-table/ItemTable";
import AddItemOrder from "./AddItemOrder";

import {
  DeleteButton,
  EditButton,
  FinishButton,
  CreateOrderButton,
  AddItemButton,
} from "../buttons/SimpleButton";
import { CancelButton } from "../buttons/LinkButton";

const CreateOrder = () => {
  const addItemOrderRef = useRef();

  const [requestItems, setRequestItems] = useState([]);

  const [order, setOrder] = useState({ items: [] });

  const changeEditState = (id) => {
    const orderItems = order.items;
    const currentOrderItem = orderItems.find((item) => item.id === id);
    currentOrderItem.isEditable = !currentOrderItem.isEditable;

    setOrder((prevState) => ({ ...prevState, items: orderItems }));
  };

  const finishEditItem = (id) => {
    changeEditState(id);

    const currentRequestedItem = requestItems.find((item) => item.id === id);

    if (!currentRequestedItem || currentRequestedItem.quantity < 0) {
      console.log("first");
      return;
    }

    if (currentRequestedItem.quantity == 0) {
      addItemOrderRef.current.removeOption(id);
      addItemOrderRef.current.setDefaultOption();
    } else {
      addItemOrderRef.current.addOption({
        name: currentRequestedItem.name,
        id: currentRequestedItem.id,
      });
    }
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

    if (currentRequestedItem.quantity == 0) {
      addItemOrderRef.current.addOption({
        name: currentItem.name,
        id: currentItem.id,
      });
    }
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
            ref={addItemOrderRef}
            order={order}
            setOrder={setOrder}
            requestItems={requestItems}
            setRequestItems={setRequestItems}
            buttons={(
              selectedItem,
              isCurrentValidQuantity,
              addItemHandler,
              createOrderHandler
            ) => (
              <>
                <AddItemButton
                  onClick={addItemHandler}
                  disabled={
                    selectedItem.quantity === 0 || !isCurrentValidQuantity
                  }
                />
                <CreateOrderButton
                  name="Create Order"
                  onClick={createOrderHandler}
                  disabled={order.items.length == 0}
                />

                <CancelButton to="/orders" />
              </>
            )}
          />

          <div className="d-flex justify-content-between mb-3">
            <h6>Total amount:</h6>
            <span>{order.totalAmount}</span>
          </div>

          <ItemTable
            items={order.items}
            onChangeItemQuantityHandler={onChangeItemQuantityHandler}
            buttons={(item) => (
              <>
                {item.isEditable ? (
                  <FinishButton
                    onClick={() => finishEditItem(item.id)}
                    disabled={item.quantity === 0 || !item.isValidQuantity}
                  />
                ) : (
                  <EditButton onClick={() => changeEditState(item.id)} />
                )}

                <DeleteButton onClick={() => deleteItemHandler(item.id)} />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;

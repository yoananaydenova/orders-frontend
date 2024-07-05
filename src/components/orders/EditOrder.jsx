import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ItemTable from "../items/ItemTable";
import EditOrderItemButtons from "./EditOrderItemButtons";

const EditOrder = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [order, setOrder] = useState({
    orderId: "",
    createdOn: "",
    updatedOn: null,
    totalAmount: 0,
    items: [],
    failedAddedItems: [],
  });

  const { orderId, createdOn, updatedOn, totalAmount, items, failedAddedItem } =
    order;

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const result = await axios.get(`http://localhost:8080/order/${id}`);

    result.data.items.map((item) => setAdditionalProperties(item));

    setOrder(result.data);
  };

  const setAdditionalProperties = (item) => {
    item.isEditable = true;
    item.isValidQuantity = true;
  };

  const saveHandler = async (e) => {
    const itemId = Number(e.target.id);
    await axios.put(`http://localhost:8080/order/${id}`, itemId, order);
    navigate("/orders");
  };

  const onChangeItemQuantityHandler = async (e) => {
    const value = e.target.value ? Number(e.target.value) : "";
    const itemId = Number(e.target.id);

    const currentRequestedItemResult = await axios.get(
      `http://localhost:8080/item/${itemId}`
    );

    const orderItems = order.items;
    const currentOrderItem = orderItems.find((item) => item.id === itemId);

    const currentRequestedItem = currentRequestedItemResult.data;

    currentRequestedItem.quantity += currentOrderItem.quantity;

    currentOrderItem.isValidQuantity =
      value >= 1 && value <= currentRequestedItem.quantity;
    currentRequestedItem.quantity -= value;

    await axios.put(
      `http://localhost:8080/item/${itemId}`,
      currentRequestedItem
    );

    currentOrderItem.quantity = value;

    setOrder((prevState) => ({ ...prevState, items: orderItems }));
  };

  const deleteItemHandler = (id) => {
    const orderItems = order.items;
    const currentItem = orderItems.find((item) => item.id === id);

    orderItems.splice(currentItem, 1);

    setOrder({ items: orderItems });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Order</h2>
          <div>
            <div className="d-flex justify-content-between mb-3">
              <h6>Order id:</h6>
              <span>{orderId}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h6>Created on:</h6>
              <span>{createdOn}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h6>Updated on:</h6>
              <span>{updatedOn}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h6>Total amount:</h6>
              <span>{totalAmount}</span>
            </div>

            <div className="d-flex justify-content-evenly mt-5 mb-4">
              <button onClick={saveHandler} className="btn btn-outline-success">
                Save
              </button>

              <Link to="/orders" className="btn btn-outline-danger">
                Cancel
              </Link>
            </div>

            <ItemTable
              items={order.items}
              onChangeItemQuantityHandler={onChangeItemQuantityHandler}
              buttons={(item) => (
                <EditOrderItemButtons
                  item={item}
                  deleteItemHandler={deleteItemHandler}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;

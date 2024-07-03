import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ItemTable from "../items/ItemTable";

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
    setOrder(result.data);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setOrder((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/order/${id}`, order);
    navigate("/orders");
  };

  const changeEditState = (id) => {
    const orderItems = order.items;
    const currentOrderItem = orderItems.find((item) => item.id === id);
    currentOrderItem.isEditable = !currentOrderItem.isEditable;

    setOrder({ items: orderItems });
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

    setOrder({ items: orderItems });
  };

  const deleteItemHandler = (id) => {
    const orderItems = order.items;
    const currentItem = orderItems.find((item) => item.id === id);

    const currentRequestedItem = requestItems.find((item) => item.id === id);
    currentRequestedItem.quantity += currentItem.quantity;

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
              <button type="submit" className="btn btn-outline-success">
                Save
              </button>

              <Link to="/orders" className="btn btn-outline-danger">
                Cancel
              </Link>
            </div>

            <ItemTable
              items={order.items}
              changeEditState={changeEditState}
              onChangeItemQuantityHandler={onChangeItemQuantityHandler}
              deleteItemHandler={deleteItemHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;

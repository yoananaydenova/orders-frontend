import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ItemTable from "../items/ItemTable";
import EditOrderItemButtons from "./EditOrderItemButtons";
import AddItemOrder from "./AddItemOrder";
import moment from "moment";

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

  const [requestItems, setRequestItems] = useState([]);

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
    await axios.put(`http://localhost:8080/order/${order.orderId}`, order);
    navigate("/orders");
  };

  const onChangeItemQuantityHandler = async (e) => {
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

  const addItemHandler = () => {
    console.log("hello");
  };

  const deleteItemHandler = (id) => {
    const orderItems = order.items;
    const currentItem = orderItems.find((item) => item.id === id);

    const currentItemTotalAmount =
      order.totalAmount - currentItem.quantity * currentItem.price;

    orderItems.splice(currentItem, 1);

    setOrder((prevState) => ({
      ...prevState,
      totalAmount: currentItemTotalAmount,
      items: orderItems,
    }));
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
              <span>{moment(createdOn).format("DD/MM/YYYY HH:mm:ss")}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h6>Updated on:</h6>
              <span>
                {updatedOn
                  ? moment(updatedOn).format("DD/MM/YYYY HH:mm:ss")
                  : "-"}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h6>Total amount:</h6>
              <span>{totalAmount}</span>
            </div>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Add item menu
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <AddItemOrder
                      order={order}
                      setOrder={setOrder}
                      requestItems={requestItems}
                      setRequestItems={setRequestItems}
                    />
                  </div>
                </div>
              </div>
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

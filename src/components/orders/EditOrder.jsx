import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ItemTable from "../item-table/ItemTable";
import AddItemOrder from "./AddItemOrder";
import moment from "moment";
import { DeleteButton, SaveButton } from "../buttons/SimpleButton";
import { CancelButton } from "../buttons/LinkButton";
import { deleteObjectFromArray } from "../../Util";
import toast from "react-hot-toast";

const EditOrder = () => {
  const addItemOrderRef = useRef();
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
    item.isValidQuantity = true;
    item.isEditable = true;
  };

  const saveHandler = async (e) => {
    await axios.put(`http://localhost:8080/order/${order.orderId}`, order);
    toast.success("The order is successfully edited!");
    navigate("/orders");
  };

  const onChangeItemQuantityHandler = async (e) => {
    addItemOrderRef.current.setDefaultOption();

    const value = e.target.value ? Number(e.target.value) : "";
    const itemId = Number(e.target.id);

    const orderItems = order.items;
    const currentOrderItem = orderItems.find((item) => item.id === itemId);

    let currentRequestedItem = requestItems.find((item) => item.id === itemId);

    if (!currentRequestedItem) {
      currentRequestedItem = {
        id: currentOrderItem.id,
        isEditable: true,
        isValidQuantity: true,
        name: currentOrderItem.name,
        price: currentOrderItem.price,
        quantity: 0,
      };
      setRequestItems((prevState) => [...prevState, currentRequestedItem]);
    }

    const allAvailableQuantity =
      currentRequestedItem.quantity + currentOrderItem.quantity;

    const isValidQuantity = value >= 1 && value <= allAvailableQuantity;

    currentOrderItem.isValidQuantity = isValidQuantity;
    currentOrderItem.quantity = value;

    currentRequestedItem.quantity = allAvailableQuantity - value;

    if (currentRequestedItem.quantity === 0) {
      addItemOrderRef.current.removeOption(currentRequestedItem.id);
    } else {
      addItemOrderRef.current.addOption({
        id: currentRequestedItem.id,
        name: currentRequestedItem.name,
      });
    }

    setOrder((prevState) => ({
      ...prevState,
      totalAmount: sumTotal(orderItems),
      items: orderItems,
    }));
  };

  const sumTotal = (arr) =>
    arr.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  const deleteItemHandler = (id) => {
    const orderItems = order.items;
    const currentItem = orderItems.find((item) => item.id === id);

    let currentRequestedItem = requestItems.find((item) => item.id === id);

    if (!currentRequestedItem) {
      currentRequestedItem = {
        id: id,
        name: currentItem.name,
        price: currentItem.price,
        quantity: currentItem.quantity,
      };
      requestItems.push(currentRequestedItem);

      addItemOrderRef.current.addOption({
        name: currentItem.name,
        id: currentItem.id,
      });
    } else {
      currentRequestedItem.quantity += currentItem.quantity;
    }

    if (currentRequestedItem.quantity == 0) {
      addItemOrderRef.current.addOption({
        name: currentItem.name,
        id: currentItem.id,
      });
    }

    deleteObjectFromArray(orderItems, currentItem);

    const currentItemTotalAmount = currentItem.quantity * currentItem.price;

    setOrder((prevState) => ({
      ...prevState,
      totalAmount: (prevState.totalAmount -= currentItemTotalAmount),
      items: orderItems,
    }));
    toast.success("The item is successfully deleted from the order!");
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
                      ref={addItemOrderRef}
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
              <SaveButton onClick={saveHandler} disabled={false} />

              <CancelButton to="/orders" />
            </div>

            <ItemTable
              items={order.items}
              onChangeItemQuantityHandler={onChangeItemQuantityHandler}
              buttons={(item) => (
                <DeleteButton onClick={() => deleteItemHandler(item.id)} />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;

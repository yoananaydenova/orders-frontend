import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddItemOrder = ({ order, setOrder, requestItems, setRequestItems }) => {
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);

  const [optionsState, setOptionsState] = useState("-1");

  const defaultItem = {
    id: "-1",
    name: "",
    quantity: 0,
    price: "",
    isEditable: false,
    isValidQuantity: true,
  };

  const [selectedItem, setSelectedItem] = useState(defaultItem);

  const [isCurrentValidQuantity, setIsCurrentValidQuantity] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8080/items");

    setRequestItems([...result.data]);

    const resultOtionItems = result.data.map((item) => ({
      name: item.name,
      id: item.id,
    }));

    setOptions(resultOtionItems);
  };

  const onChangeQuantityHandler = (e) => {
    const value = e.target.value ? Number(e.target.value) : "";
    const itemId = Number(e.target.id);

    const currentRequestedItem = requestItems.find(
      (item) => item.id === itemId
    );

    setIsCurrentValidQuantity(
      value >= 1 && value <= currentRequestedItem.quantity
    );
    setSelectedItem((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const createOrderHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/order", order);
    navigate("/orders");
  };

  const handleSelectChange = (e) => {
    let currentItem;

    if (e.target.value === "-1") {
      currentItem = defaultItem;
    } else {
      currentItem = requestItems.find((i) => i.id == e.target.value);
    }
    currentItem.isEditable = false;
    currentItem.isValidQuantity = currentItem.quantity > 0;

    setIsCurrentValidQuantity(currentItem.quantity > 0);

    setOptionsState(e.target.value);
    setSelectedItem(currentItem);
  };

  const addItemHandler = () => {
    if (selectedItem.id === "-1") {
      return;
    }

    if (!isCurrentValidQuantity) {
      return;
    }

    const orderItems = order.items;
    const currentItem = orderItems.find((item) => item.id === selectedItem.id);

    if (currentItem) {
      currentItem.quantity += selectedItem.quantity;
    } else {
      orderItems.push({ ...selectedItem });
    }
    const currentRequestedItem = requestItems.find(
      (item) => item.id === selectedItem.id
    );
    currentRequestedItem.quantity -= selectedItem.quantity;

    setOrder((prevState) => ({
      ...prevState,
      totalAmount: sumTotal(orderItems),
      items: orderItems,
    }));

    setOptionsState("-1");
    setSelectedItem(defaultItem);
  };

  const sumTotal = (arr) =>
    arr.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  return (
    <div>
      <div className="mb-3">
        <label className="form-label w-100">Item name</label>

        <select
          onChange={handleSelectChange}
          value={optionsState}
          className="form-select"
        >
          <option key="-1" value="-1" disabled>
            Choose an option
          </option>
          {options.map((option, index) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label w-100">
          Price
          <input
            defaultValue={selectedItem.price}
            readOnly
            type="text"
            name="price"
            className="form-control"
          />
        </label>
      </div>

      <div className="mb-3">
        <label className="form-label w-100">
          Quantity
          <input
            id={selectedItem.id}
            value={selectedItem.quantity}
            onChange={(e) => onChangeQuantityHandler(e)}
            readOnly={selectedItem.id === "-1"}
            type="number"
            name="quantity"
            className={
              isCurrentValidQuantity
                ? "form-control"
                : "form-control custom-error-form-validation"
            }
          />
        </label>
      </div>

      <div className="d-flex justify-content-evenly mt-5 mb-4">
        <button
          disabled={selectedItem.quantity === 0 || !isCurrentValidQuantity}
          onClick={addItemHandler}
          className="btn btn-outline-success"
        >
          + Add item
        </button>
        <button
          onClick={createOrderHandler}
          className="btn btn-outline-success"
        >
          Create
        </button>

        <Link to="/orders" className="btn btn-outline-danger">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default AddItemOrder;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemTable from "../items/ItemTable";

const AddOrder = () => {
  const navigate = useNavigate();

  const [requestItems, setRequestItems] = useState([]);

  const [order, setOrder] = useState({ items: [] });

  const [options, setOptions] = useState([]);

  const [optionsState, setOptionsState] = useState("-1");

  const defaultItem = {
    id: "-1",
    name: "",
    quantity: 0,
    price: "",
  };

  const [selectedItem, setSelectedItem] = useState(defaultItem);

  const [isValidQuantity, setIsValidQuantity] = useState(true);

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
    const name = e.target.name;
    const value = e.target.value ? Number(e.target.value) : "";
    const currentRequestedItem = requestItems.find(
      (item) => item.id === selectedItem.id
    );
    console.log("currentRequestedItem", currentRequestedItem);
    setIsValidQuantity(value >= 1 && value <= currentRequestedItem.quantity);

    setSelectedItem((prevState) => ({ ...prevState, [name]: value }));
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

    setIsValidQuantity(currentItem.quantity > 0);

    setOptionsState(e.target.value);
    setSelectedItem(currentItem);
  };

  const addItemHandler = () => {
    if (selectedItem.id === "-1") {
      return;
    }

    if (!isValidQuantity) {
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

    setOrder({ items: orderItems });

    setOptionsState("-1");
    setSelectedItem(defaultItem);
  };

  const deleteItemHandler = (id) => {
    const orderItems = order.items;
    const currentItem = orderItems.find((item) => item.id === id);

    const currentRequestedItem = requestItems.find((item) => item.id === id);
    currentRequestedItem.quantity += currentItem.quantity;

    orderItems.splice(currentItem, 1);
    console.log(orderItems);
    setOrder({ items: orderItems });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Create order</h2>
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
                  value={selectedItem.quantity}
                  onChange={(e) => onChangeQuantityHandler(e)}
                  type="number"
                  name="quantity"
                  className={
                    isValidQuantity
                      ? "form-control"
                      : "form-control custom-error-form-validation"
                  }
                />
              </label>
            </div>

            <div className="d-flex justify-content-evenly mt-5 mb-4">
              <button
                disabled={selectedItem.quantity === 0 || !isValidQuantity}
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

          <ItemTable
            items={order.items}
            deleteItemHandler={deleteItemHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default AddOrder;

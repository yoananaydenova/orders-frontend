import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddOrder = () => {
  const navigate = useNavigate();

  const [requestItems, setRequestItems] = useState([]);
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8080/items");
    setRequestItems(result.data);
  };

  const [order, setOrder] = useState({ items: [] });

  const [selectedItem, setSelectedItem] = useState({
    itemId: "",
    name: "",
    availableQuantity: "",
    currentPrice: "",
  });

  const onChangeQuantityHandler = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const createOrderHandler = async (e) => {
    e.preventDefault();

    console.log("order " + JSON.stringify(order));
    await axios.post("http://localhost:8080/order", order);
    navigate("/orders");
  };

  const handleSelectChange = (e) => {
    let currentItem;

    if (e.target.value === "-1") {
      currentItem = {
        itemId: "",
        name: "",
        availableQuantity: "",
        currentPrice: "",
      };
    } else {
      currentItem = requestItems.find((i) => i.itemId == e.target.value);
    }

    setSelectedItem(currentItem);
  };

  const addItemHandler = () => {
    const newItem = {
      itemId: selectedItem.itemId,
      itemName: selectedItem.name,
      quantity: selectedItem.availableQuantity,
      currentPrice: selectedItem.currentPrice,
    };

    setOrder((prevState) => ({
      items: [...prevState.items, newItem],
    }));

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
                className="form-select"
                aria-label="Default select example"
              >
                <option value="-1">Choose item</option>
                {requestItems.map((item, index) => (
                  <option key={item.itemId} value={item.itemId}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label w-100">
                Price
                <input
                  defaultValue={selectedItem.currentPrice}
                  readOnly
                  type="text"
                  name="currentPrice"
                  className="form-control"
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label w-100">
                Quantity
                <input
                  defaultValue={selectedItem.availableQuantity}
                  onChange={(e) => onChangeQuantityHandler(e)}
                  type="text"
                  name="availableQuantity"
                  className="form-control"
                />
              </label>
            </div>

            <div className="d-flex justify-content-evenly mt-5 mb-4">
              <button
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
          <div>
            {/* TODO add table as component */}
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
                {order.items.map((item, index) => (
                  <tr key={item.itemId}>
                    <th scope="row">{item.itemId}</th>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.currentPrice}</td>
                    <td className="btn-group-sm">
                      {/* <ViewButton to={`/view-item/${item.itemId}`} />
                      <EditButton to={`/edit-item/${item.itemId}`} />
                      <DeleteButton
                        deleteHandler={() => deleteItem(item.itemId)}
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;

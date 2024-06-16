import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddOrder = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8080/items");
    setItems(result.data);
  };

  const [order, setOrder] = useState({ items: [] });

  const { itemName, quantity } = order;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setOrder((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/order", order);
    navigate("/orders");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Create order</h2>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label className="form-label w-100">Item name</label>

              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown button
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a cclassName="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label w-100">
                Price
                <input
                  value={quantity}
                  type="text"
                  name="quantity"
                  className="form-control"
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label w-100">
                Quantity
                <input
                  value={quantity}
                  onChange={onChangeHandler}
                  type="text"
                  name="quantity"
                  className="form-control"
                />
              </label>
            </div>

            <div className="d-flex justify-content-evenly mt-5 mb-4">
              <button type="submit" className="btn btn-outline-success">
                + Add item
              </button>
              <button type="submit" className="btn btn-outline-success">
                Create
              </button>

              <Link to="/orders" className="btn btn-outline-danger">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;

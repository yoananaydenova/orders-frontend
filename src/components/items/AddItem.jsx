import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();

  const [item, setItem] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const { name, quantity, price } = item;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/item", item);
    navigate("/items");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Create Item</h2>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label className="form-label w-100">
                Item name
                <input
                  value={name}
                  onChange={onChangeHandler}
                  type="text"
                  name="name"
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
            <div className="mb-3">
              <label className="form-label w-100">
                Price
                <input
                  value={price}
                  onChange={onChangeHandler}
                  type="text"
                  name="price"
                  className="form-control"
                />
              </label>
            </div>
            <div className="d-flex justify-content-evenly mt-5 mb-4">
              <button type="submit" className="btn btn-outline-success">
                Create
              </button>

              <Link to="/items" className="btn btn-outline-danger">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;

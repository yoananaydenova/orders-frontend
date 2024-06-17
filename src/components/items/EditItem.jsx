import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditItem = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [item, setItem] = useState({
    name: "",
    availableQuantity: "",
    currentPrice: "",
  });

  const { name, availableQuantity, currentPrice } = item;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    loadItem();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/item/${id}`, item);
    navigate("/items");
  };

  const loadItem = async () => {
    const result = await axios.get(`http://localhost:8080/item/${id}`);
    setItem(result.data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Item</h2>
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
                  value={availableQuantity}
                  onChange={onChangeHandler}
                  type="text"
                  name="availableQuantity"
                  className="form-control"
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label w-100">
                Price
                <input
                  value={currentPrice}
                  onChange={onChangeHandler}
                  type="text"
                  name="currentPrice"
                  className="form-control"
                />
              </label>
            </div>
            <div className="d-flex justify-content-evenly mt-5 mb-4">
              <button type="submit" className="btn btn-outline-success">
                Edit
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

export default EditItem;

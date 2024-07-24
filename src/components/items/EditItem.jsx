import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CancelButton } from "../buttons/LinkButton";
import { SubmitButton } from "../buttons/SimpleButton";
import toast from "react-hot-toast";

const EditItem = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [item, setItem] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const { name, quantity, price } = item;

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    const result = await axios.get(`http://localhost:8080/item/${id}`);
    setItem(result.data);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/item/${id}`, item);
    navigate("/items");
    toast.success("The item is successfully edited!");
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
              <SubmitButton
                name="Save"
                disabled={!(name && price && quantity)}
              />

              <CancelButton to="/items" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItem;

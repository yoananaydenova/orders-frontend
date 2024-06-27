import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewOrder = () => {
  const [order, setOrder] = useState({
    orderId: "",
    createdOn: "",
    updatedOn: "",
    totalAmount: "",
    items: [],
  });

  const { id } = useParams();

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const result = await axios.get(`http://localhost:8080/order/${id}`);
    setOrder(result.data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Order Details</h2>

          <div className="card">
            <div className="card-header">
              <h5>Details of order id: {order.orderId} </h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Created on:</b>
                  <span className="mx-2"> {order.createdOn}</span>
                </li>

                <li className="list-group-item">
                  <b>Updated on:</b>
                  <span className="mx-2"> {order.updatedOn}</span>
                </li>

                <li className="list-group-item">
                  <b>Total amount:</b>
                  <span className="mx-2">{order.totalAmount}</span>
                </li>
              </ul>

              <div>
                <h6>Items:</h6>
                <ul className="list-group list-group-flush">
                  {order.items.map((item, index) => (
                    <li className="list-group-item">
                      <div>
                        <b>Item name:</b>
                        <span className="mx-2"> {item.name}</span>
                      </div>
                      <div>
                        <b>Item price:</b>
                        <span className="mx-2">{item.price}</span>
                      </div>
                      <div>
                        <b>Item quantity:</b>
                        <span className="mx-2"> {item.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Link to="/orders" className="btn btn-primary my-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewItem = () => {
  const [item, setItem] = useState({
    itemId: "",
    name: "",
    availableQuantity: "",
    currentPrice: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    const result = await axios.get(`http://localhost:8080/item/${id}`);
    setItem(result.data);

    console.log(result.data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Item Details</h2>

          <div className="card">
            <div className="card-header">
             <h5>Details of item id: {item.itemId} </h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  <span className="mx-2"> {item.name}</span>
                </li>

                <li className="list-group-item">
                  <b>Quantity:</b>
                  <span className="mx-2">{item.availableQuantity}</span>
                </li>

                <li className="list-group-item">
                  <b>Price:</b>
                  <span className="mx-2">{item.currentPrice}</span>
                </li>
              </ul>
            </div>
          </div>
          <Link to="/items" className="btn btn-primary my-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;

import React, { useEffect, useState } from "react";
import axios from "axios";
import EditButton from "../components/buttons/EditButton";
import ViewButton from "../components/buttons/ViewButton";
import DeleteButton from "../components/buttons/DeleteButton";
import AddButton from "../components/buttons/AddButton";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const result = await axios.get("http://localhost:8080/orders");
    setOrders(result.data);
  };

  return (
    <div className="container">
      <AddButton name="Add order" to="/add-order" />
      <div className="py-3">
        <table className="table border shadow caption-top table-hover">
          <caption>List of orders</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">ICREATED ON</th>
              <th scope="col">UPDATED ON</th>
              <th scope="col">TOTAL AMOUNT</th>
              <th scope="col" className="col-md-3 offset-md-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider align-middle">
            {orders.map((order, index) => (
              <tr key={order.orderId}>
                <th scope="row">{order.orderId}</th>
                <td>{order.createdOn}</td>
                <td>{order.updatedOn}</td>
                <td>{order.totalAmount}</td>
                <td className="btn-group-sm">
                  <ViewButton />
                  <EditButton />
                  <DeleteButton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

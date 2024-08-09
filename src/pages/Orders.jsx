import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DeleteButton } from "../components/buttons/SimpleButton";
import {
  AddButton,
  EditButton,
  ViewButton,
} from "../components/buttons/LinkButton";
import moment from "moment";
import toast from "react-hot-toast";
import ItemTable from "../components/common/ItemTable";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const result = await axios.get("http://localhost:8080/all-orders");
    setOrders(result.data);
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:8080/order/${id}`);
    loadOrders();
    toast.success("The order is successfully deleted!");
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
              <th scope="col">CREATED ON</th>
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
                <td>{moment(order.createdOn).format("DD/MM/YYYY HH:mm:ss")}</td>
                <td>
                  {order.updatedOn
                    ? moment(order.updatedOn).format("DD/MM/YYYY HH:mm:ss")
                    : "-"}
                </td>
                <td>{order.totalAmount}</td>
                <td className="btn-group-sm">
                  <ViewButton to={`/view-order/${order.orderId}`} />
                  <EditButton to={`/edit-order/${order.orderId}`} />
                  <DeleteButton onClick={() => deleteOrder(order.orderId)} />
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

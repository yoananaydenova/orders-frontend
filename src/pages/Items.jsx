import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DeleteButton } from "../components/buttons/SimpleButton";
import {
  AddButton,
  EditButton,
  ViewButton,
} from "../components/buttons/LinkButton";

const Items = () => {
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8080/all-items");
    setItems(result.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8080/item/${id}`);
    loadItems();
  };

  // TODO replace with ItemTable Component
  return (
    <div className="container">
      <AddButton name="Add item" to="/add-item" />
      <div className="py-3">
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
            {items.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td className="btn-group-sm">
                  <ViewButton to={`/view-item/${item.id}`} />
                  <EditButton to={`/edit-item/${item.id}`} />
                  <DeleteButton onClick={() => deleteItem(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Items;

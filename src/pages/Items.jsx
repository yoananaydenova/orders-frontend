import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditButton from "../components/buttons/EditButton";
import ViewButton from "../components/buttons/ViewButton";
import DeleteButton from "../components/buttons/DeleteButton";
import AddButton from "../components/buttons/AddButton";

const Items = () => {
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8080/items");
    setItems(result.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8080/item/${id}`);
    loadItems();
  };

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
              <tr key={item.itemId}>
                <th scope="row">{item.itemId}</th>
                <td>{item.name}</td>
                <td>{item.availableQuantity}</td>
                <td>{item.currentPrice}</td>
                <td className="btn-group-sm">
                  <ViewButton to={`/view-item/${item.itemId}`}/>
                  <EditButton to={`/edit-item/${item.itemId}`} />
                  <DeleteButton deleteHandler={()=>deleteItem(item.itemId)} />
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

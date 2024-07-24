import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DeleteButton } from "../components/buttons/SimpleButton";
import {
  AddButton,
  EditButton,
  ViewButton,
} from "../components/buttons/LinkButton";
import toast from "react-hot-toast";
import ItemTable from "../components/common/ItemTable";

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
    toast.success("The item is successfully deleted!");
  };

  return (
    <div className="container">
      <AddButton name="Add item" to="/add-item" />
      <div className="py-3">
        <ItemTable
          items={items}
          buttons={(item) => (
            <>
              <ViewButton to={`/view-item/${item.id}`} />
              <EditButton to={`/edit-item/${item.id}`} />
              <DeleteButton onClick={() => deleteItem(item.id)} />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default Items;

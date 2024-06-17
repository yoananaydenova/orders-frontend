import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Items from "./pages/Items.jsx";
import Orders from "./pages/Orders.jsx";
import AddItem from "./components/items/AddItem.jsx";
import EditItem from "./components/items/EditItem.jsx";
import ViewItem from "./components/items/ViewItem.jsx";
import AddOrder from "./components/orders/AddOrder.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Items />} path="/items" />
        <Route element={<AddItem />} path="/add-item" />
        <Route element={<EditItem />} path="/edit-item/:id" />
        <Route element={<ViewItem />} path="/view-item/:id" />

        <Route element={<Orders />} path="/orders" />
        <Route element={<AddOrder />} path="/add-order" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

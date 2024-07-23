import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Orders from "./pages/Orders";
import CreateItem from "./components/items/CreateItem";
import EditItem from "./components/items/EditItem";
import ViewItem from "./components/items/ViewItem";
import CreateOrder from "./components/orders/CreateOrder";
import EditOrder from "./components/orders/EditOrder";
import ViewOrder from "./components/orders/ViewOrder";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <Routes>
        <Route element={<Home />} path="/" />

        <Route element={<Items />} path="/items" />
        <Route element={<CreateItem />} path="/add-item" />
        <Route element={<EditItem />} path="/edit-item/:id" />
        <Route element={<ViewItem />} path="/view-item/:id" />

        <Route element={<Orders />} path="/orders" />
        <Route element={<CreateOrder />} path="/add-order" />
        <Route element={<EditOrder />} path="/edit-order/:id" />
        <Route element={<ViewOrder />} path="/view-order/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

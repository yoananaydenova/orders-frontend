import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Orders from "./pages/Orders";
import AddItem from "./components/items/AddItem";
import EditItem from "./components/items/EditItem";
import ViewItem from "./components/items/ViewItem";
import AddOrder from "./components/orders/AddOrder";
import EditOrder from './components/orders/EditOrder';
import ViewOrder from './components/orders/ViewOrder';

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
        <Route element={<EditOrder />} path="/edit-order/:id"/>
        <Route element={<ViewOrder />} path="/view-order/:id"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

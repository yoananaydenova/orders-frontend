import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div >
      <Navbar />
      <Home />
    </div>
  );
}

export default App;

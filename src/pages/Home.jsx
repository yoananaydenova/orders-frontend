import React from "react";
import image from "../assets/bg-desk.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="position-relative mh-100">
      <img
        src={image}
        className="img-fluid object-fit-cover"
        alt="Home page with instructions"
      ></img>

      <div className="card position-absolute top-0 start-50 translate-middle-x mt-5">
        <div className="card-body">
          <h5 className="card-title">What you can do here?</h5>
          <p className="card-text">
            <ul>
              <li>
                In the Items page, we can add items, view already created ones,
                or delete them.
              </li>
              <li>
                In the Orders page, we can create orders with already created
                items, view existing orders and delete them.
              </li>
            </ul>
          </p>
          <Link to="/add-item" className="btn btn-primary">
            Start creating items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import image from "../assets/bg-desk.jpg";

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
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;

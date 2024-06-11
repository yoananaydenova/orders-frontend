import React from "react";

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-secondary pb-0 px-5">
        <h5 className="text-light px-5">Fullstack Orders App</h5>
        <div className="d-inline-flex gap-3">
          <button type="button" className="navbtn">
            Items
          </button>
          <button type="button" className="navbtn">
            Orders
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

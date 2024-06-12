import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary pb-0 px-5">
        <h5 className="text-light px-5">Fullstack Orders App</h5>
        <div className="d-inline-flex gap-3">
          <button type="button" className="btn-nav btn-home">
            Home
          </button>
          <button type="button" className="btn-nav">
            Items
          </button>
          <button type="button" className="btn-nav">
            Orders
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

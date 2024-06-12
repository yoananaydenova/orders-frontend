import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary pb-0 px-5">
        <NavLink to="/" className="fs-4 fw-bold text-light px-5">
          Fullstack Orders App
        </NavLink>
        <div className="d-inline-flex gap-3">
          <NavLink to="/" className="btn-nav btn-home">
            Home
          </NavLink>
          <NavLink to="/items" className="btn-nav">
            Items
          </NavLink>
          <NavLink to="/orders" className="btn-nav">
            Orders
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

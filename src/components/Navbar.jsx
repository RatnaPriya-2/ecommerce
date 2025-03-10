import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { useGlobalContext } from "./Context";

const Navbar = () => {
  const { cartItems } = useGlobalContext();
  return (
    <nav className="navbar">
      <div className="logo">
        {" "}
        <NavLink to="/">Ecommerce</NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Products
          </NavLink>
        </li>
        <li className="cart">
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img className="cart-img" src="/cart.png" alt="cart" />
          </NavLink>
          <span className="cart-badge" id="cart-count">
            {cartItems.length}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

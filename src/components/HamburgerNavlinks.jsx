import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "./Context";

const HamburgerNavlinks = () => {
  const {
    cartItems,
    user,
    handleDropdown,
    showHamDropdown,
    closeHamDropdown,
    ulContainer,
  } = useGlobalContext();

  return (
    <ul
      ref={ulContainer}
      className={`ham-nav-links ${showHamDropdown ? "show-links" : ""} `}
      onClick={(e) => e.stopPropagation()}
    >
      <li onClick={closeHamDropdown}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      </li>
      <li onClick={closeHamDropdown}>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
      </li>
      <li onClick={closeHamDropdown}>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
      </li>
      <li onClick={closeHamDropdown}>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Products
        </NavLink>
      </li>
      <li className="user" onClick={handleDropdown}>
        <NavLink
          to="#"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img className="user-img" src="/user.png" alt="user" />
        </NavLink>
        {user && (
          <span className="login-greeting">{`Hello, ${user.fname}`}</span>
        )}
      </li>
      <li className="cart" onClick={closeHamDropdown}>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img className="cart-img" src="/cart.png" alt="cart" />
          <span className="cart-badge" id="cart-count">
            {user ? cartItems.length : 0}
          </span>
        </NavLink>
      </li>
    </ul>
  );
};

export default HamburgerNavlinks;

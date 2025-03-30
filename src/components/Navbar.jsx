import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { useGlobalContext } from "./Context";
import NavbarLinks from "./NavbarLinks";
import HamburgerNavlinks from "./HamburgerNavlinks";

const Navbar = () => {
  const {
    user,
    showDropdown,
    handleLogout,
    closeDropdown,
    refContainer,
    isMobile,
    handleHamburger,
  } = useGlobalContext();

  return (
    <>
      <div
        className={`dropdown ${showDropdown ? "show" : ""}`}
        ref={refContainer}
        onClick={closeDropdown}
      >
        <ul>
          <Link to={user ? "/profile" : "/register"}>
            <li>{user ? "Profile" : "Register"}</li>
          </Link>

          <Link
            to={user ? "/" : "/login"}
            onClick={user ? handleLogout : undefined}
          >
            <li>{user ? "Logout" : "Login"}</li>
          </Link>
        </ul>
      </div>
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/">TrendiKart</NavLink>
        </div>
        <NavbarLinks />
        <div
          className={`hamburger-icon ${isMobile ? "show-icon" : ""}`}
          onClick={handleHamburger}
        >
          <img src="/hamburger.png" alt="hamburgericon" />
        </div>
        {isMobile && <HamburgerNavlinks />}
      </nav>
    </>
  );
};

export default Navbar;

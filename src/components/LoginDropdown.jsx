import React from "react";
import { Link } from "react-router-dom";

const LoginDropdown = () => {
  return (
    <div className="dropdown-container">
      <Link to="/login">Login</Link>
    </div>
  );
};

export default LoginDropdown;

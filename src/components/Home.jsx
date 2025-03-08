import React from "react";
import "../css/Styles.css";
import pic from "../assets/1234.png"
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home">
          <h1>Welcome to Ecommerce</h1>
          <p>Your one-stop destination for trendy and affordable fashion.</p>
          <p>
            Shop the latest styles, get amazing deals, and enjoy a seamless
            shopping experience.
          </p>
          <button className="explore-btn">
            <NavLink to="/products">Explore Products</NavLink>
          </button>
        </div>
        <div className="home-img">
          <img src={pic} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;

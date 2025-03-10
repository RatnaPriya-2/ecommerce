import React from "react";
import "../css/ProductCard.css";
import ratings from "../components/Data";
import { useGlobalContext } from "./Context";

const ProductCard = ({ product }) => {
  const { addItem } = useGlobalContext();
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-details">
        <p className="product-category">
          {product.category
            .split("")
            .map((char, index) => (index === 0 ? char.toUpperCase() : char))
            .join("")}
        </p>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">
          <sup>$</sup>
          {product.price}
        </p>
        <div className="product-ratings">
          <span className="stars">
            {ratings.find(
              (item) => item.rating === Math.floor(product.rating.rate)
            )?.stars || ""}
          </span>
        </div>

        <button className="add-to-cart-btn" onClick={() => addItem(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

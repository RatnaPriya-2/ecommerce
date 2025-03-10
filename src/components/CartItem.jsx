import React, { useState } from "react";
import { useGlobalContext } from "./Context";

const CartItem = ({ item }) => {
  const { removeItem, handleQuantity } = useGlobalContext();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="item-details">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-price">
          <sup>$</sup>
          {item.price}
        </p>
        <div className="quantity-controls">
          <button
            className="quantity-button"
            id="decrease"
            onClick={() => {
              handleQuantity(item.id, -1);
            }}
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            className="quantity-button"
            id="increase"
            onClick={() => {
              handleQuantity(item.id, 1);
            }}
          >
            +
          </button>
        </div>
        <button className="remove-button" onClick={() => removeItem(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

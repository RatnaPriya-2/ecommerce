import React from "react";
import CartItem from "./CartItem";
import { useGlobalContext } from "./Context";
import "../css/Cart.css";

const Cart = () => {
  const { cartItems, total } = useGlobalContext();
  return (
    <>
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p>No items in cart...</p>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <p>
              Subtotal:{" "}
              <span className="subtotal">
                <sup>$</sup>
                {total}
              </span>
            </p>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

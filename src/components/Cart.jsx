import React from "react";
import CartItem from "./CartItem";
import { useGlobalContext } from "./Context";
import "../css/Cart.css";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems, total, user } = useGlobalContext();

  const navigate = useNavigate();

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const isLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_0qp2KdFnELV7iU",
      amount: total * 100, // Amount in paise (50000 paise = ₹500)
      currency: "INR",
      name: "Demo Payment",
      description: "Test Transaction",
      image: "https://your-logo-url.com", // Your logo URL
      handler: function (response) {
        alert(
          "Payment Successful! Payment ID: " + response.razorpay_payment_id
        );
        setCartItems([]);
        navigate("/");
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9505931088",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          alert("Payment process canceled or failed!");
        },
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", (response) => {
      alert("Payment Failed! Error: " + response.error.description);
    });

    paymentObject.open();
  };

  return (
    <>
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <div className="cart-items">
          {cartItems.length > 0 && user ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <>
              <p>No items in cart...</p>
              <button className="continue-shopping-btn">
                <Link to="/products">Continue shopping...</Link>
              </button>
            </>
          )}
        </div>
        {user && cartItems.length > 0 && (
          <div className="cart-summary">
            <p>
              Subtotal:{" "}
              <span className="subtotal">
                <sup>$</sup>
                {total}
              </span>
            </p>
            <button className="checkout-button" onClick={displayRazorpay}>
              Proceed to checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

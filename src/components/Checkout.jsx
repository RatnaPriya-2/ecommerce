import React from "react";
import { useGlobalContext } from "./Context";

const Checkout = () => {
  const { total } = useGlobalContext();
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
      `https://checkout.razorpay.com/v1/checkout.js?v=${Date.now()}`
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
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <h2>Razorpay Payment</h2>
      <button onClick={displayRazorpay}>Pay Now</button>
    </div>
  );
};

export default Checkout;

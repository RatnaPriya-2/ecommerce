import React, { useEffect, useState } from "react";

const useCart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("ecommerce")) || []
  );

  const [total, setTotal] = useState("");
  const [visible, setVisible] = useState(false);
  const addItem = (product) => {
    setVisible(true);
    const alreadyAdded = cartItems.find((item) => item.title === product.title);
    if (alreadyAdded) {
      setCartItems((prev) =>
        prev.map((item) =>
          item === alreadyAdded
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    let id = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(id);
  }, [visible]);

  const removeItem = (id) => {
    let modifiedList = cartItems.filter((item) => item.id !== id);
    setCartItems(modifiedList);
  };

  const handleQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                change === -1 && item.quantity === 1
                  ? 1
                  : item.quantity + change,
            }
          : item
      )
    );
  };
  useEffect(() => {
    let finalTotal = cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
    setTotal(finalTotal);
    localStorage.setItem("ecommerce", JSON.stringify(cartItems));
  }, [cartItems]);

  return { addItem, removeItem, handleQuantity, visible, total ,cartItems};
};

export default useCart;

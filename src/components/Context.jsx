import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("ecommerce")) || []
  );
  const [itemQuantity, setItemQuantity] = useState(1);
  const [total, setTotal] = useState("");

  const [pageProducts, setPageProducts] = useState([]);

  const [buttonList, setButtonList] = useState([]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleCategory = (e) => {
    let category = e.target.value;
    let checked = e.target.checked;
    if (checked) {
      let filteredList = allProducts.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filteredList);
    } else {
      setFilteredProducts(allProducts);
    }
  };

  const handlePrice = (e) => {
    let highestPrice = e.target.value;
    let checked = e.target.checked;
    let priceRange = 250;
    let lowestPrice = 0;

    if (highestPrice === 250) {
      lowestPrice = highestPrice - lowestPrice;
    } else {
      lowestPrice = highestPrice - priceRange + 1;
    }
    if (checked) {
      let filteredList = allProducts.filter(
        (item) => item.price >= lowestPrice && item.price <= highestPrice
      );

      setFilteredProducts(filteredList);
    } else {
      setFilteredProducts(allProducts);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      let filteredList = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredList);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchTerm, allProducts]);

  const showProducts = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(inputValue);
    }
  };
  useEffect(() => {
    if (filteredProducts.length > 0) {
      // let totalPages;
      // if (filteredProducts.length > 10) {
      //   totalPages = Math.ceil(filteredProducts.length / 10);
      // } else {
      //   totalPages = 0;
      // }
      // let buttonArray = [];
      // for (let i = 1; i <= totalPages; i++) {
      //   buttonArray.push(i);
      // }
      // setButtonList(buttonArray);
      let totalPages = Math.ceil(filteredProducts.length / 10);
      let buttonsArray = totalPages > 1 ? [...Array(totalPages)].map((_, i) => i + 1) : [];

      setButtonList(buttonsArray);
    } else {
      setButtonList([]);

      let totalPages = Math.ceil(filteredProducts.legnth / 10);
      let buttonsArray = Array.from({ length: totalPages }).map(
        (_, i) => i + 1
      );

      setButtonList(buttonsArray);
    }
    filteredProducts.length > 0
      ? setPageProducts(filteredProducts.slice(0, 10))
      : setPageProducts([]);
  }, [filteredProducts]);

  const displayPage = (number) => {
    let startIndex = (number - 1) * 10;
    let endIndex = number * 10;
    setPageProducts(filteredProducts.slice(startIndex, endIndex));
    // if (number === 1) {
    //   setPageProducts(filteredProducts.slice(0, number * 10));
    // } else {
    //   if (number === buttonList.length) {
    //     setPageProducts(filteredProducts.slice(number * 10 - 9));
    //   } else {
    //     setPageProducts(
    //       filteredProducts.slice(number * 10 - 9, number * 10 + 1)
    //     );
    //   }
    // }
  };

  const addItem = (product) => {
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
  };

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

  const clearInput = () => {
    setInputValue("");
  };

  useEffect(() => {
    let finalTotal = cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
    setTotal(finalTotal);
    localStorage.setItem("ecommerce", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://fakestoreapi.com/products";
        let response = await fetch(url);
        let data = await response.json();
        let dupData = data.map((product) => ({
          ...product,
          id: crypto.randomUUID(),
        }));
        let finalData = data.concat(dupData);
        setAllProducts(finalData);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          allProducts,
          handleInput,
          inputValue,
          clearInput,
          filteredProducts,
          buttonList,
          displayPage,
          pageProducts,
          showProducts,
          handleCategory,
          handlePrice,
          addItem,
          cartItems,
          total,
          removeItem,
          handleQuantity,
          itemQuantity,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };

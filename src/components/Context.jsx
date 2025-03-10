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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleCategory = (e) => {
    const category = e.target.value.toLowerCase();
    const checked = e.target.checked;

    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    }
  };

  const handlePrice = (e) => {
    const { value, checked } = e.target;
    let max = parseInt(value);
    let min = max - 249;

    if (checked) {
      setSelectedPrices((prev) => [...prev, { min, max }]);
    } else {
      setSelectedPrices((prev) =>
        prev.filter((range) => !range.min === min && range.max === max)
      );
    }
  };

  useEffect(() => {
    let filtered = [...allProducts];
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category.toLowerCase())
      );
    }

    if (selectedPrices.length > 0) {
      filtered = filtered.filter((item) =>
        selectedPrices.some(
          (range) => item.price >= range.min && item.price <= range.max
        )
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, allProducts, searchTerm, selectedCategories, selectedPrices]);

  const showProducts = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(inputValue);
    }
    if (e.type === "click") {
      setSearchTerm(inputValue);
    }
  };

  useEffect(() => {
    if (filteredProducts.length > 0) {
      let totalPages = Math.ceil(filteredProducts.length / 10);
      let buttonsArray =
        totalPages > 1 ? [...Array(totalPages)].map((_, i) => i + 1) : [];

      setButtonList(buttonsArray);
    } else {
      setButtonList([]);

      let totalPages = Math.ceil(filteredProducts.length / 10);
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
  };

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

  const clearInput = () => {
    setInputValue("");
  };

  useEffect(() => {
    setSearchTerm(inputValue);
  }, [inputValue]);

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
          visible,
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

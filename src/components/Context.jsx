import { createContext, useContext, useEffect, useState } from "react";
import usePaginationButtons from "./hooks/usePaginationButtons";
import useCart from "./hooks/useCart";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const { pageProducts, buttonList, displayPage } =
    usePaginationButtons(filteredProducts);

  const { addItem, removeItem, handleQuantity, visible, total, cartItems } =
    useCart();

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

  const clearInput = () => {
    setInputValue("");
  };

  useEffect(() => {
    setSearchTerm(inputValue);
  }, [inputValue]);

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

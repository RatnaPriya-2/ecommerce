import { createContext, useContext, useEffect, useRef, useState } from "react";
import usePaginationButtons from "./hooks/usePaginationButtons";
import useCart from "./hooks/useCart";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const refContainer = useRef(null);
  const ulContainer = useRef(null);
  const [showHamDropdown, setShowHamDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { pageProducts, buttonList, displayPage, activeIndex } =
    usePaginationButtons(filteredProducts);

  const {
    addItem,
    removeItem,
    handleQuantity,
    visible,
    total,
    cartItems,
    setCartItems,
  } = useCart(user);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleHamburger = () => {
    isMobile && setShowHamDropdown(!showHamDropdown);
  };
  const hideHamburger = () => {
    setShowHamDropdown(false);
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
  }, [searchTerm, allProducts, selectedCategories, selectedPrices]);

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const details = await getDoc(doc(db, "Users", user.uid));
          if (details.exists()) {
            setUser(details.data());
            setLoggedIn(true);
          } else {
            console.log("No user data found.");
          }
        } catch (error) {
          console.log("Error fetching user data:", error.message);
        }
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleDropdown = (e) => {
    e.stopPropagation();
    let temp = e.currentTarget.getBoundingClientRect();

    if (e.currentTarget.closest("UL").classList.contains("ham-nav-links")) {
      refContainer.current.style.top = `${temp.top + temp.height / 2 - 30}px`;
      refContainer.current.style.left = `${
        temp.left - isMobile ? 150 : 200
      }}px`;
    } else {
      refContainer.current.style.top = `${temp.bottom + 20}px`;
      refContainer.current.style.left = `${temp.left + temp.width / 2 - 100}px`;
    }

    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };
  const closeHamDropdown = () => {
    setShowHamDropdown(false);
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("User successfully loggedout!", { position: "top-center" });
      window.location.href = "/";
    } catch (error) {
      toast.error(error.message, { position: "bottom:center" });
    }
  };

  useEffect(() => {
    const hideDropdown = (e) => {
      if (
        ulContainer.current &&
        !ulContainer.current.contains(e.target) &&
        !e.target.closest(".hamburger-icon")
      ) {
        setShowHamDropdown(false);
      }
      if (refContainer.current && !refContainer.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", hideDropdown);

    return () => {
      document.removeEventListener("click", hideDropdown);
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
          activeIndex,
          pageProducts,
          showProducts,
          handleCategory,
          handlePrice,
          addItem,
          cartItems,
          setCartItems,
          total,
          removeItem,
          handleQuantity,
          visible,
          user,
          loggedIn,
          setLoggedIn,
          showDropdown,
          handleLogout,
          closeDropdown,
          handleDropdown,
          refContainer,
          hideHamburger,
          handleHamburger,
          showHamDropdown,
          isMobile,
          closeHamDropdown,
          ulContainer,
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

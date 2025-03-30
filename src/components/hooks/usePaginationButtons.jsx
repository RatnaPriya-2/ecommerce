import React, { useEffect, useState } from "react";

const usePaginationButtons = (filteredProducts) => {
  const [pageProducts, setPageProducts] = useState([]);
  const [buttonList, setButtonList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      let totalPages = Math.ceil(filteredProducts.length / 8);
      let buttonsArray =
        totalPages > 1 ? [...Array(totalPages)].map((_, i) => i + 1) : [];

      setButtonList(buttonsArray);
      setPageProducts(filteredProducts.slice(0, 8));
      setActiveIndex(0);
    } else {
      setButtonList([]);
      setPageProducts([]);
    }
  }, [filteredProducts]);

  const displayPage = (index, number) => {
    setActiveIndex(activeIndex === index ? null : index);
    let startIndex = (number - 1) * 8;
    let endIndex = number * 8;
    setPageProducts(filteredProducts.slice(startIndex, endIndex));
  };

  return { pageProducts, buttonList, displayPage, activeIndex };
};

export default usePaginationButtons;

import React, { useEffect, useState } from "react";

const usePaginationButtons = (filteredProducts) => {
  const [pageProducts, setPageProducts] = useState([]);
  const [buttonList, setButtonList] = useState([]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      let totalPages = Math.ceil(filteredProducts.length / 10);
      let buttonsArray =
        totalPages > 1 ? [...Array(totalPages)].map((_, i) => i + 1) : [];

      setButtonList(buttonsArray);
      setPageProducts(filteredProducts.slice(0, 10));
    } else {
      setButtonList([]);
      setPageProducts([]);
    }
  }, [filteredProducts]);

  const displayPage = (number) => {
    let startIndex = (number - 1) * 10;
    let endIndex = number * 10;
    setPageProducts(filteredProducts.slice(startIndex, endIndex));
  };

  return { pageProducts, buttonList, displayPage };
};

export default usePaginationButtons;

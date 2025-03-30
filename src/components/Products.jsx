import React, { useState } from "react";
import "../css/Products.css";
import FilterProducts from "./FilterProducts";
import SearchProducts from "./SearchProducts";
import { useGlobalContext } from "./Context";

const Products = () => {
  const { isMobile } = useGlobalContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="products-page-container">
      {isMobile && (
        <button
          className="filter-toggle-btn"
          onClick={() => setIsFilterOpen(true)}
        >
          Open Filters
        </button>
      )}
      <div
        className={`filter-products-container ${
          isFilterOpen ? "filter-open" : ""
        }`}
      >
        {isMobile && (
          <button className="close-btn" onClick={() => setIsFilterOpen(false)}>
            ✖
          </button>
        )}
        <FilterProducts />
      </div>
      <SearchProducts />
    </div>
  );
};

export default Products;

import React from "react";
import "../css/Products.css";
import FilterProducts from "./FilterProducts";
import SearchProducts from "./SearchProducts";

const Products = () => {
  return (
    <div className="products-page-container">
      <FilterProducts />
      <SearchProducts />
    </div>
  );
};

export default Products;

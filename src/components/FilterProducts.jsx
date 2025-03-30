import React from "react";
import { useGlobalContext } from "./Context";

const FilterProducts = () => {
  const { handleCategory, handlePrice } = useGlobalContext();
  return (
    <>
      <div className="filter-by-category-container">
        <span>Filter by Category</span>
        <div className="checkbox-block">
          <input
            type="checkbox"
            name="category"
            value="Men's Clothing"
            id="mens-clothing"
            onChange={handleCategory}
          />
          <label htmlFor="mens-clothing">Men's Clothing</label>
        </div>
        <div className="checkbox-block">
          <input
            type="checkbox"
            name="category"
            id="womens-clothing"
            value="Women's Clothing"
            onChange={handleCategory}
          />
          <label htmlFor="womens-clothing">Women's Clothing</label>
        </div>
        <div className="checkbox-block">
          <input
            type="checkbox"
            name="category"
            value="jewelery"
            id="jewelery"
            onChange={handleCategory}
          />
          <label htmlFor="jewelery">Jewelery</label>
        </div>
        <div className="checkbox-block">
          <input
            type="checkbox"
            name="category"
            id="electronics"
            value="electronics"
            onChange={handleCategory}
          />
          <label htmlFor="electronics">Electronics</label>
        </div>
      </div>
      <div className="filter-by-price-container">
        <span>Filter By Price</span>
        <div className="checkbox-block">
          <input
            type="checkbox"
            name="price"
            id="250"
            value="250"
            onChange={handlePrice}
          />
          <label htmlFor="250">$0 - $250</label>
        </div>
        <div className="checkbox-block">
          <input
            type="checkbox"
            name="price"
            id="500"
            value="500"
            onChange={handlePrice}
          />
          <label htmlFor="500">$251 - $500</label>
        </div>
        <div className="checkbox-block">
          <input
            type="checkbox"
            name="price"
            id="750"
            value="750"
            onChange={handlePrice}
          />
          <label htmlFor="750">$501 - $750</label>
        </div>
        <div className="checkbox-block">
          <input
            type="checkbox"
            name="price"
            id="1000"
            value="1000"
            onChange={handlePrice}
          />
          <label htmlFor="1000">$751 - $1000</label>
        </div>
      </div>
    </>
  );
};

export default FilterProducts;

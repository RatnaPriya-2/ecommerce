import React from "react";
import pic from "../assets/search.png";
import cross from "../assets/cross.png";
import ProductCard from "./ProductCard";
import { useGlobalContext } from "./Context";

const SearchProducts = () => {
  const {
    allProducts,
    handleInput,
    inputValue,
    clearInput,
    filteredProducts,
    buttonList,
    displayPage,
    pageProducts,
    showProducts,
  } = useGlobalContext();
  console.log(filteredProducts, pageProducts,buttonList);

  return (
    <div className="search-products-container">
      <div className="search-block">
        <label htmlFor="search">Search for products</label>
        <div className="search-cluster">
          <input
            type="text"
            name="search"
            id="search"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={showProducts}
          />
          {inputValue && (
            <img
              className="cross-img"
              src={cross}
              alt=""
              onClick={clearInput}
            />
          )}
          <img src={pic} alt="" />
        </div>
      </div>
      <div className="products-block">
        <div className="products-list">
          {/* {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found..</p>
          )} */}

          {pageProducts.length > 0 ? (
            pageProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found..</p>
          )}
        </div>
        <div className="pages">
          {buttonList.length > 0 &&
            buttonList.map((item, index) => (
              <button
                key={index}
                className="page-number"
                onClick={() => displayPage(item)}
              >
                {item}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import './CSS/Products.css';
import campus_photo from '../Components/Assets/campus.jpg';
import data_product from '../Components/Assets/all_product';
import ProductList from '../Components/ProductList/ProductList';

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats((prevSelectedSubCats) =>
      isChecked
        ? [...prevSelectedSubCats, value]
        : prevSelectedSubCats.filter((item) => item !== value)
    );
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setSearchInput('');
  };

  const filteredProducts = data_product.filter(
    (item) =>
      item.id.toString().includes(searchInput) ||
      item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {data_product.map((item, i) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={setSearchInput}
              />
              <label htmlFor={item.id}>{item.category}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort('asc')}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort('desc')}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="filterItem">
          <div className="searchBar">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by ID or Name"
            />
            <button onClick={setSearchInput}>Search</button>
          </div>
        </div>
        <img className="catImg" src={campus_photo} alt="" height="250" />
        <h2 className="searchTitle">Search Results</h2>
        {showResults && filteredProducts.length === 0 && (
          <p className="noResults">No results found.</p>
        )}
        {data_product.map((item, i) => (
          <div><ProductList key={item.id} /></div>
        ))}
      </div>
    </div>
  );
};

export default Products;
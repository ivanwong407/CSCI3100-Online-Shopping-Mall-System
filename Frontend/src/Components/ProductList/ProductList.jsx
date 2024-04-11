import React, { useState, useContext } from 'react';
import data_product from '../Assets/data';
import Item from '../Item/Item'

const ProductList = ( ) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />
        </div>
        <div className="template_Container">
          {
            data_product 
              .filter((item) => {
                return searchTerm.toLowerCase() === ''
                  ? item
                  : item.name.toLowerCase().includes(searchTerm);
              })
              .map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              })
          }
        </div>
      </div>
    </>
  )
}

export default ProductList;
import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductDetail({ value }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`https://app.elplazas.com/api/v1/product/detail/${value}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [value]);

  return (
    <div>
      <h1>{product.item_desc}</h1>
      <p>{product.price}$</p>
    </div>
  );
}

export default ProductDetail;

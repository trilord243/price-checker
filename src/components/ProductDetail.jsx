import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/download.jfif";
function ProductDetail({ value }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://app.elplazas.com/api/v1/product/detail/${value}`)
      .then((response) => setProduct(response.data))
      .catch((error) => setLoading(false));
  }, [value]);

  return (
    <div className="product-card">
      <h1 className="product-title">
        {loading ? product.item_desc : "Producto no encontrado "}
      </h1>
      <p className="product-price">{loading ? product.price + "$" : ""}</p>
      {/* <img src={logo} alt="imagen" className="product-img" /> */}
    </div>
  );
}

export default ProductDetail;

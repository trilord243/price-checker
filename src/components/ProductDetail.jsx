import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h1>{loading ? product.item_desc : "Producto no encontrado "}</h1>
      <h1>{loading ? product.price + "$" : "Producto no encontrado"}</h1>
    </div>
  );
}

export default ProductDetail;

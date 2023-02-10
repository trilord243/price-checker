import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductDetail({ value = "" }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    axios
      .get("https://app.elplazas.com/api/v1/product/detail/" + value)
      .then((response) => setProduct(response.data)).catch((error) => setLoading(false));


  }, [value]);

  const Iva = product.price * 0.15




  return (
    <div className="product-card none">
      <h1 className="product-title">
        {loading ? product.item_desc : "Producto no encontrado "}
      </h1>

      <p className="product-price"> {loading && product.unit ? product.unit : ""}</p>
      <p className="product-price"  > {loading && !(product.unit == undefined) ? `Precio: ${product.price}Bs` : ""} </p>
      <p className="product-price"> {loading && !(product.unit == undefined) ? `IVA: ${Iva}Bs ` : ""}</p>
      <p className="product-price-total"> {loading && !(product.unit == undefined) ? `Precio total: ${Number(product.price) + Number(Iva)}Bs ` : ""}</p>




    </div >
  );
}

export default ProductDetail;

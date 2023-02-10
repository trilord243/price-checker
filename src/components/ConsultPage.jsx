import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import ProductDetail from "./ProductDetail";

function ConsultPage() {
  const { value, setValue } = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
      setValue("");
    }, 6000);
  }, []);

  return (
    <>
      <ProductDetail value={value} />
    </>
  );
}

export default ConsultPage;

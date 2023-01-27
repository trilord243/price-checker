import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../App";
import "./Hompage.css";
import logo from "./Logoplaza.png";
function Homepage() {
  const { value, setValue } = useContext(MyContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(value);
  };
  console.log(value);

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="iamge" />
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        <h1>Verifique su precio</h1>
        <div className="center">
          <input
            type="text"
            onChange={handleChange}
            value={value}
            className="center"
            placeholder="Ingrese el nombre del producto"
          />
        </div>
        <div className="center">
          <Link to="/Consult">
            <button type="submit">Submit</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Homepage;

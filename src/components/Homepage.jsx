import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../App";

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
    <>
      <h1> Bienvendio al plaza consulta Precio </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={value} />
        <Link to="/Consult">
          <button type="submit">Submit </button>
        </Link>
      </form>
    </>
  );
}

export default Homepage;

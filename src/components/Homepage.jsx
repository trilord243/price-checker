import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../App";
import "./Hompage.css";
import logo from "./Logoplaza.png";
import Footer from "./Footer";

function Homepage() {

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.addEventListener("blur", (event) => {
      event.preventDefault();
      inputRef.current.focus();
    });
  }, []);

  const { value, setValue } = useContext(MyContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="form-f">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="center">
            <input
              autoFocus
              type="text"
              onChange={handleChange}
              value={value}
              className="center"
              placeholder=""
              ref={inputRef}
            />
          </div>
          <div className="center">
            <Link to="/Consult">
              <button type="submit">Submit</button>
            </Link>
          </div>
        </form>
      </div>

      <div className="container bg-container">
        <div className="logo">
          <img src={logo} alt="iamge" />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Homepage;

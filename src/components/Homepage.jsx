import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../App";
import "./Hompage.css";
import logo from "./Logoplaza.png";
import Footer from "./Footer";
import axios from "axios";
import HeroTemplate from "./Hero";

import imagen2 from "../assets/Promo2.png"
import imagen1 from "../assets/Promo1.png"
import imagen3 from "../assets/Promo3.png"

function Homepage() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const images = [
    imagen1, imagen2, imagen3
  ]



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
    if (value === "1234567") {
      navigate("/options");
    } else {
      navigate("/Consult");
    }
  };
  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>


        <HeroTemplate images={images} intervalTime={3000} ></HeroTemplate>
      </div>
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

            <button type="submit">Submit</button>

          </div>
        </form>
      </div>

      <div className="container bg-container">

      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Homepage;

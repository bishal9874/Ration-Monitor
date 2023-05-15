import React from "react";
import './Header.css'
import Login from "../AuthScreens/login/Login";
import { useState } from "react";
import { getToken } from "../../API/localStorage";
const Header = () => {
  const {access_token} = getToken()
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <img
          src="src/assets/png/logo-no-background.png"
          alt="logo"
          width={150}
        />

        <div className="flexCenter h-menu">
          <a href="/">Home</a>
          <a href="#companies">Companies</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a href="/login">Sign in</a>
          
          
          <button className="button">
            <a href="/signup">Sign Up</a>
          </button>
          {access_token ?  <button className="button">
            <a href="">Dashboard</a>
          </button> : " "}
         
        </div>
        
      </div>
    </section>
  );
};

export default Header;


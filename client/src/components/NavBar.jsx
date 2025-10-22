import React from "react";
import { Link } from "react-router";
import '../styles/globals.css';
import '../styles/NavBar.css';

const NavBar = ({ currentMode, onClick }) => {

  return (
    <div className="nav-bar-container">
        <Link to="/">Home</Link>
        <Link to="/tshirts">T-Shirts</Link>
        <Link to="/tshirts/create">Create T-Shirt</Link>
        <button className="toggle-theme-button" onClick={onClick}> {currentMode === "light" ? "Dark Mode" : "Light Mode"}</button>
    </div>
  );
}

export default NavBar;
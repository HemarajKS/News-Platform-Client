import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white sticky top-0 z-10">
      <h1 className="m-0 text-xl">News Platform</h1>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
      </nav>
    </header>
  );
};

export default Header;

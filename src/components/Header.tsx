import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white sticky top-0 z-10">
      <h1 className="m-0 text-xl">News Platform</h1>
      <nav className="flex flex-wrap items-center gap-4">
        <NavLink to={"/"}>Home-Pagination</NavLink>
        <NavLink to={"/home-frontend-filter"}>Home-Frontend Filter</NavLink>
      </nav>
    </header>
  );
};

export default Header;

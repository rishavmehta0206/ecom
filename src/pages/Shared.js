import React from "react";
import { Outlet } from "react-router-dom";
import Category from "../components/Category";
import Navbar from "../components/Navbar.";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Category/>
      <Outlet />
    </div>
  );
};

export default Home;

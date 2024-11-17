/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";
import NavBar from "../components/NavBar/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

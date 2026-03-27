import React from "react";
import Footer from "../../Components/Footer/Footer";
import Hero from "../../Components/Hero/Hero";
import Navbar from "../../Components/Navbar/Navbar";
import "./home.css";
import { auth } from "../../Services/api";

function Home() {
  return (
    <div className="Home_Container">
      <Navbar isAuthenticated={auth.isAuthenticated()} />
      <Hero />
      <Footer />
    </div>
  );
}

export default Home;

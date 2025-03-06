import React from "react";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <h1>Welcome to LHS</h1>
      </div>
    </div>
  );
};

export default Home;

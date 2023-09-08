import React from "react";
import Home from "./Home";
import "./App.css";
import SingleMovie from "./SingleMovie";
import { Routes, Route } from "react-router-dom";


const App = () => {
  return ( 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<SingleMovie />} />
      </Routes>
  );
};

export default App;

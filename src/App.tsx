import React from "react";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

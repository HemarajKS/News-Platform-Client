import React from "react";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

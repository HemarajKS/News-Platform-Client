import React, { useEffect } from "react";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";

const App: React.FC = () => {
  const location = useLocation();

  //On route change scroll to top

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </>
  );
};

export default App;

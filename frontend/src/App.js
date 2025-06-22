// frontend/ongs-connection-main/src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import InstituicaoOngs from "./pages/InstituicaoOngs"; // export default
import DoacaoPage from "./pages/DoacaoPage";
import CreateDoadorPage from "./pages/CreateDoadorPage";
import CreateOngPage from "./pages/CreateOngPage";

import "./App.css";
import "./pages/global.css";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/instituicoes" element={<InstituicaoOngs />} />
        <Route path="/doar" element={<DoacaoPage />} />
        <Route path="/cadastro-doador" element={<CreateDoadorPage />} />
        <Route path="/cadastro-ong" element={<CreateOngPage />} />

        {/* Aliases úteis para facilitar acesso */}
        <Route path="/ongs" element={<InstituicaoOngs />} />
        <Route path="/ongs/nova" element={<CreateOngPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

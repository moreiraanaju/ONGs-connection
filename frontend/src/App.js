// frontend/ongs-connection-main/src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import InstituicaoOngs from "./pages/InstituicaoOngs";
import DoacaoPage from "./pages/DoacaoPage";
import CreateDoadorPage from "./pages/CreateDoadorPage";
import CreateOngPage from "./pages/CreateOngPage";
import PerfilDoadorPage from "./pages/PerfilDoadorPage";
import PerfilOngPage from "./pages/PerfilOngPage";

import "./App.css";
import "./pages/global.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/instituicoes" element={<InstituicaoOngs />} />
          <Route path="/doar" element={<DoacaoPage />} />
          <Route path="/cadastro-doador" element={<CreateDoadorPage />} />
          <Route path="/cadastro-ong" element={<CreateOngPage />} />
          <Route path="/perfil-doador" element={<PerfilDoadorPage />} />
          <Route path="/perfil-ong" element={<PerfilOngPage />} />

          {/* Aliases úteis para facilitar acesso */}
          <Route path="/ongs" element={<InstituicaoOngs />} />
          <Route path="/ongs/nova" element={<CreateOngPage />} />
        </Routes>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import logo from '../assets/conection-logo.png'; 
import './Header.css';

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    console.log('Login bem-sucedido:', userData);
    setIsLoginModalOpen(false); 
    alert(`Bem-vindo(a), ${userData.email || 'Usuário'}!`);
  };

  const handleLogout = () => {
    
    alert('Você foi desconectado.');
    navigate('/'); 
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    
    <header className="top">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo da ONG Connection" className="logo-img" />
          <h1 className="site-title">ONG Connection</h1>
        </div>
        <nav className="menu" aria-label="Navegação principal">
          <Link to="/">Início</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/Instituicoes">Instituições (ONGs)</Link>
          <Link to="/doar">Doe Agora</Link>
          <Link to="/cadastro-doador">Cadastrar Doador</Link>
          <Link to="/cadastro-ong">Cadastrar ONG</Link>

          <button className="btn" onClick={() => setIsLoginModalOpen(true)}>Entrar</button>
        </nav>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}

export default Header;
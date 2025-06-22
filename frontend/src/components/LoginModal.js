import React, { useState } from 'react';
import './LoginModal.css'; 
function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      console.log(`Tentativa de login com: ${email} / ${password}`);
      const simulatedUserData = { email: email, name: 'Usuário Teste' };
      alert('Login simulado bem-sucedido! (Verifique o console)');
      onLoginSuccess(simulatedUserData);
      setEmail('');
      setPassword('');

    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Credenciais inválidas. Tente novamente.');
      
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <form id="login-form" onSubmit={handleSubmit} className="formulario">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
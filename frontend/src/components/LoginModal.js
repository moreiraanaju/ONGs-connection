import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      // Aqui você faria a chamada real para a API de login
      // Por enquanto, vamos simular um login bem-sucedido
      console.log(`Tentativa de login com: ${email} / ${password}`);

      // Simular resposta da API
      const userData = {
        email: email,
        nome: "Usuário Teste",
        tipo: "DOADOR", // ou 'ONG' dependendo do tipo de usuário
        id: Date.now(),
      };

      // Fazer login usando o contexto
      login(userData);

      // Limpar formulário
      setEmail("");
      setPassword("");

      // Fechar modal e notificar sucesso
      onClose();
      onLoginSuccess(userData);

      // Redirecionar para a página de perfil apropriada
      if (userData.tipo === "ONG") {
        navigate("/perfil-ong");
      } else {
        navigate("/perfil-doador");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;

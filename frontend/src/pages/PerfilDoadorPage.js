import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./global.css";

function PerfilDoadorPage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    dataNascimento: "",
    cpf: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Preencher formulário com dados do usuário
    setFormData({
      nome: user.nome || "",
      email: user.email || "",
      telefone: user.telefone || "",
      cidade: user.cidade || "",
      estado: user.estado || "",
      dataNascimento: user.dataNascimento || "",
      cpf: user.cpf || "",
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage("");
  };

  const handleSave = async () => {
    setLoading(true);
    try {
    
      updateUser(formData);
      setIsEditing(false);
      setMessage("Dados atualizados com sucesso!");
    } catch (error) {
      setMessage("Erro ao atualizar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      nome: user.nome || "",
      email: user.email || "",
      telefone: user.telefone || "",
      cidade: user.cidade || "",
      estado: user.estado || "",
      dataNascimento: user.dataNascimento || "",
      cpf: user.cpf || "",
    });
    setMessage("");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="perfil-doador page-container">
      <div className="container">
        <div className="perfil-header">
          <h2>Meu Perfil</h2>
          <div className="perfil-actions">
            {!isEditing ? (
              <button className="btn btn-primary" onClick={handleEdit}>
                Editar Perfil
              </button>
            ) : (
              <div className="edit-actions">
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar"}
                </button>
                <button className="btn" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            )}
            <button className="btn" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`message ${
              message.includes("sucesso") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="perfil-content">
          <div className="perfil-section">
            <h3>Dados Pessoais</h3>
            <div className="form-group">
              <label>Nome Completo:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.nome}</p>
              )}
            </div>

            <div className="form-group">
              <label>E-mail:</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.email}</p>
              )}
            </div>

            <div className="form-group">
              <label>CPF:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.cpf}</p>
              )}
            </div>

            <div className="form-group">
              <label>Telefone:</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.telefone}</p>
              )}
            </div>

            <div className="form-group">
              <label>Data de Nascimento:</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.dataNascimento}</p>
              )}
            </div>

            <div className="form-group">
              <label>Cidade:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.cidade}</p>
              )}
            </div>

            <div className="form-group">
              <label>Estado:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.estado}</p>
              )}
            </div>
          </div>

          <div className="perfil-section">
            <h3>Minhas Doações</h3>
            <p className="perfil-value">Nenhuma doação registrada ainda.</p>
            <a href="/doar" className="btn btn-primary">
              Fazer Primeira Doação
            </a>
          </div>

          <div className="perfil-section">
            <h3>Voluntariado</h3>
            <p className="perfil-value">
              Nenhuma atividade de voluntariado registrada.
            </p>
            <a href="/voluntariado" className="btn btn-primary">
              Encontrar Oportunidades
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilDoadorPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./global.css";

function PerfilOngPage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco_rua: "",
    endereco_numero: "",
    endereco_bairro: "",
    endereco_cidade: "",
    endereco_estado: "",
    endereco_cep: "",
    missao: "",
    areas_atuacao: "",
    data_fundacao: "",
    site: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Preencher formulário com dados da ONG
    setFormData({
      nome: user.nome || "",
      cnpj: user.cnpj || "",
      email: user.email || "",
      telefone: user.telefone || "",
      endereco_rua: user.endereco_rua || "",
      endereco_numero: user.endereco_numero || "",
      endereco_bairro: user.endereco_bairro || "",
      endereco_cidade: user.endereco_cidade || "",
      endereco_estado: user.endereco_estado || "",
      endereco_cep: user.endereco_cep || "",
      missao: user.missao || "",
      areas_atuacao: user.areas_atuacao || "",
      data_fundacao: user.data_fundacao || "",
      site: user.site || "",
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
      // Aqui você faria a chamada para a API para atualizar os dados
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
      cnpj: user.cnpj || "",
      email: user.email || "",
      telefone: user.telefone || "",
      endereco_rua: user.endereco_rua || "",
      endereco_numero: user.endereco_numero || "",
      endereco_bairro: user.endereco_bairro || "",
      endereco_cidade: user.endereco_cidade || "",
      endereco_estado: user.endereco_estado || "",
      endereco_cep: user.endereco_cep || "",
      missao: user.missao || "",
      areas_atuacao: user.areas_atuacao || "",
      data_fundacao: user.data_fundacao || "",
      site: user.site || "",
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
    <div className="perfil-ong page-container">
      <div className="container">
        <div className="perfil-header">
          <h2>Perfil da Instituição</h2>
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
            <h3>Dados Institucionais</h3>

            <div className="form-group">
              <label>Nome da Instituição:</label>
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
              <label>CNPJ:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.cnpj}</p>
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
              <label>Site:</label>
              {isEditing ? (
                <input
                  type="url"
                  name="site"
                  value={formData.site}
                  onChange={handleChange}
                />
              ) : (
                <p className="perfil-value">
                  {user.site ? (
                    <a
                      href={user.site}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.site}
                    </a>
                  ) : (
                    "Não informado"
                  )}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Data de Fundação:</label>
              {isEditing ? (
                <input
                  type="date"
                  name="data_fundacao"
                  value={formData.data_fundacao}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.data_fundacao}</p>
              )}
            </div>
          </div>

          <div className="perfil-section">
            <h3>Endereço</h3>

            <div className="form-group">
              <label>Rua:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="endereco_rua"
                  value={formData.endereco_rua}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.endereco_rua}</p>
              )}
            </div>

            <div className="form-group">
              <label>Número:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="endereco_numero"
                  value={formData.endereco_numero}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.endereco_numero}</p>
              )}
            </div>

            <div className="form-group">
              <label>Bairro:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="endereco_bairro"
                  value={formData.endereco_bairro}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.endereco_bairro}</p>
              )}
            </div>

            <div className="form-group">
              <label>Cidade:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="endereco_cidade"
                  value={formData.endereco_cidade}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.endereco_cidade}</p>
              )}
            </div>

            <div className="form-group">
              <label>Estado:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="endereco_estado"
                  value={formData.endereco_estado}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.endereco_estado}</p>
              )}
            </div>

            <div className="form-group">
              <label>CEP:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="endereco_cep"
                  value={formData.endereco_cep}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="perfil-value">{user.endereco_cep}</p>
              )}
            </div>
          </div>

          <div className="perfil-section">
            <h3>Informações da Instituição</h3>

            <div className="form-group">
              <label>Missão:</label>
              {isEditing ? (
                <textarea
                  name="missao"
                  value={formData.missao}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              ) : (
                <p className="perfil-value">{user.missao}</p>
              )}
            </div>

            <div className="form-group">
              <label>Áreas de Atuação:</label>
              {isEditing ? (
                <textarea
                  name="areas_atuacao"
                  value={formData.areas_atuacao}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              ) : (
                <p className="perfil-value">{user.areas_atuacao}</p>
              )}
            </div>
          </div>

          <div className="perfil-section">
            <h3>Projetos</h3>
            <p className="perfil-value">Nenhum projeto cadastrado ainda.</p>
            <a href="/criar-projeto" className="btn btn-primary">
              Criar Primeiro Projeto
            </a>
          </div>

          <div className="perfil-section">
            <h3>Doações Recebidas</h3>
            <p className="perfil-value">Nenhuma doação recebida ainda.</p>
            <a href="/relatorios" className="btn btn-primary">
              Ver Relatórios
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilOngPage;

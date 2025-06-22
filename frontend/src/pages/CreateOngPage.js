// frontend/ongs-connection-main/src/pages/CreateOngPage.js

import React, { useState } from "react";
import { createOng } from "../api/ongApi"; // Certifique-se que ongApi.js está pronto para receber todos os campos
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import "./Pages.css"; // Estilos gerais das páginas
import './global.css'

function CreateOngPage() {
  const navigate = useNavigate();
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
    areas_atuacao: "", // Pode ser uma string separada por vírgulas, ou um array se o backend aceitar
    data_fundacao: "",
    site: "",
    senha: "",
    confirmar_senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    setError(null); // Limpa erros anteriores

    if (!formData.nome.trim()) {
      setError("O nome da ONG é obrigatório.");
      return false;
    }
    if (!formData.cnpj.trim()) {
      setError("O CNPJ é obrigatório.");
      return false;
    }
    if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(formData.cnpj) && !/^\d{14}$/.test(formData.cnpj)) {
      setError("Formato de CNPJ inválido. Use 14 dígitos ou XX.XXX.XXX/YYYY-ZZ.");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("O e-mail é obrigatório e deve ser válido.");
      return false;
    }
    if (!formData.telefone.trim()) {
      setError("O telefone é obrigatório.");
      return false;
    }
    if (!formData.endereco_rua.trim() || !formData.endereco_numero.trim() || !formData.endereco_bairro.trim() || !formData.endereco_cidade.trim() || !formData.endereco_estado.trim() || !formData.endereco_cep.trim()) {
      setError("Todos os campos de endereço são obrigatórios.");
      return false;
    }
    if (!formData.missao.trim()) {
      setError("A missão da ONG é obrigatória.");
      return false;
    }
    if (!formData.areas_atuacao.trim()) {
        setError("As áreas de atuação são obrigatórias.");
        return false;
    }
    if (!formData.data_fundacao.trim()) {
        setError("A data de fundação é obrigatória.");
        return false;
    }
    if (!formData.senha.trim()) {
      setError("A senha é obrigatória.");
      return false;
    }
    if (formData.senha.length < 6) { // Exemplo de validação de senha
      setError("A senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    if (formData.senha !== formData.confirmar_senha) {
      setError("As senhas não coincidem.");
      return false;
    }
    // Adicione mais validações aqui se necessário (ex: formato de CNPJ, data, etc.)

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Remover 'confirmar_senha' antes de enviar para o backend
      const { confirmar_senha, ...dataToSend } = formData;
      const response = await createOng(dataToSend);
      console.log("ONG cadastrada com sucesso:", response);
      setSuccess(true);
      setError(null);
      alert("ONG cadastrada com sucesso!");
      navigate("/"); // Redireciona para a página inicial ou de sucesso
    } catch (err) {
      console.error("Erro ao cadastrar ONG:", err);
      setError(err.message || "Erro ao cadastrar ONG. Tente novamente.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-ong">
      <div className="container">
        <h2>Cadastro de ONG</h2>
        {error && <ErrorMessage message={error} />}
        {success && (
          <p className="success-message">
            ONG cadastrada com sucesso! Redirecionando...
          </p>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nome">Nome da ONG: <span className="required">*</span></label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cnpj">CNPJ: <span className="required">*</span></label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="XX.XXX.XXX/YYYY-ZZ"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail: <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone: <span className="required">*</span></label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Endereço: <span className="required">*</span></label>
            <input
              type="text"
              name="endereco_rua"
              placeholder="Rua"
              value={formData.endereco_rua}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="endereco_numero"
              placeholder="Número"
              value={formData.endereco_numero}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="endereco_bairro"
              placeholder="Bairro"
              value={formData.endereco_bairro}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="endereco_cidade"
              placeholder="Cidade"
              value={formData.endereco_cidade}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="endereco_estado"
              placeholder="Estado (Ex: SC)"
              value={formData.endereco_estado}
              onChange={handleChange}
              maxLength="2" // Limita a 2 caracteres para a UF
              required
              disabled={loading}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="endereco_cep"
              placeholder="CEP (Ex: 88420-000)"
              value={formData.endereco_cep}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="missao">Missão da ONG: <span className="required">*</span></label>
            <textarea
              id="missao"
              name="missao"
              value={formData.missao}
              onChange={handleChange}
              rows="4"
              required
              disabled={loading}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="areas_atuacao">Áreas de Atuação (separar por vírgulas): <span className="required">*</span></label>
            <input
              type="text"
              id="areas_atuacao"
              name="areas_atuacao"
              value={formData.areas_atuacao}
              onChange={handleChange}
              placeholder="Ex: Educação, Saúde, Meio Ambiente"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="data_fundacao">Data de Fundação: <span className="required">*</span></label>
            <input
              type="date"
              id="data_fundacao"
              name="data_fundacao"
              value={formData.data_fundacao}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="site">Site (Opcional):</label>
            <input
              type="url"
              id="site"
              name="site"
              value={formData.site}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha: <span className="required">*</span></label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmar_senha">Confirmar Senha: <span className="required">*</span></label>
            <input
              type="password"
              id="confirmar_senha"
              name="confirmar_senha"
              value={formData.confirmar_senha}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary" // Usando a classe global de botão
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar ONG"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateOngPage;
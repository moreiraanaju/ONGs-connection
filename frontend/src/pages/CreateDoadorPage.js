// frontend/ongs-connection-main/src/pages/CreateDoadorPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarCPF } from "../utils/validation"; // Importe suas funções de validação
import { createDoador } from "../api/ongApi"; // Importa a função de criação de doador
import './global.css';// Importe o CSS específico

function CreateDoadorPage() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.nome) newErrors.nome = "Nome é obrigatório.";
    if (!formData.email) newErrors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email inválido.";
    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório.";
    else if (!validarCPF(formData.cpf)) newErrors.cpf = "CPF inválido.";
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório.";
    if (!formData.cidade) newErrors.cidade = "Cidade é obrigatória.";
    if (!formData.estado) newErrors.estado = "Estado é obrigatório.";
    if (!formData.dataNascimento)
      newErrors.dataNascimento = "Data de Nascimento é obrigatória.";
    if (!formData.senha) newErrors.senha = "Senha é obrigatória.";
    else if (formData.senha.length < 6)
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
    if (formData.senha !== formData.confirmarSenha)
      newErrors.confirmarSenha = "As senhas não coincidem.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Remove confirmarSenha antes de enviar, pois geralmente não é armazenada no banco de dados
        const { confirmarSenha, ...dataToSend } = formData;
        
        // CORREÇÃO AQUI: Descomentar e chamar a função createDoador
        // O `createDoador` que você importou do `ongApi` é para ONGs.
        // Você precisará de uma função `createDoador` no seu `ongApi.js` (ou `doadorApi.js`)
        // que faça a requisição POST para o endpoint de doadores do seu backend.
        
        // *** IMPORTANTE: Você está importando 'createDoador' de 'ongApi',
        // mas seu `ongApi.js` exporta `createOng` e `getOngs`.
        // Você precisará criar uma função `createDoador` no `ongApi.js`
        // ou criar um novo arquivo como `doadorApi.js` para isso.
        // Abaixo, vou assumir que você a criou no ongApi.js para fins de exemplo. ***

        const response = await createDoador(dataToSend); // CHAMA A FUNÇÃO API AQUI
        console.log("Doador cadastrado com sucesso:", response);
        alert("Cadastro de doador realizado com sucesso!");
        navigate("/perfil-doador"); // Redireciona para a página pessoal ou login
      } catch (err) {
        console.error("Erro ao cadastrar doador:", err);
        // Exibe uma mensagem de erro mais útil para o usuário
        setErrors({ form: err.message || "Erro ao cadastrar doador. Tente novamente." });
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        form: "Por favor, corrija os erros no formulário.",
      }));
    }
  };

  return (
    <div className="cadastro-doador page-container">
      <div className="container">
        <h2>Cadastro de Doador</h2>
        <form id="doador-form" onSubmit={handleSubmit} noValidate>
          {errors.form && <p className="error">{errors.form}</p>}

          <div className="form-group">
            <label htmlFor="nome">
              Nome Completo <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            {errors.nome && <span className="error">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cpf">
              CPF <span className="required">*</span>
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
            {errors.cpf && <span className="error">{errors.cpf}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              E-mail <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">
              Telefone <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
            {errors.telefone && (
              <span className="error">{errors.telefone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="cidade">
              Cidade <span className="required">*</span>
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
            {errors.cidade && <span className="error">{errors.cidade}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="estado">
              Estado <span className="required">*</span>
            </label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            />
            {errors.estado && <span className="error">{errors.estado}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dataNascimento">
              Data de Nascimento <span className="required">*</span>
            </label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
            {errors.dataNascimento && (
              <span className="error">{errors.dataNascimento}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="senha">
              Senha <span className="required">*</span>
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            {errors.senha && <span className="error">{errors.senha}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">
              Confirmar Senha <span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
            />
            {errors.confirmarSenha && (
              <span className="error">{errors.confirmarSenha}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDoadorPage;
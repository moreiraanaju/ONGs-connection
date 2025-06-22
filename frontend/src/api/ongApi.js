// frontend/ongs-connection-main/src/api/ongApi.js

import axios from 'axios';

// =========================================================
//           CONFIGURAÇÃO DA URL BASE DA API
// =========================================================
// ATENÇÃO: Verifique se esta URL corresponde à do seu backend Django
// Geralmente, o backend Django roda em 127.0.0.1:8000
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// =========================================================
//           FUNÇÃO AUXILIAR DE TRATAMENTO DE ERROS
// =========================================================
const handleApiError = (error, operationName = 'operação da API') => {
  if (error.response) {
    // O servidor respondeu com um status diferente de 2xx
    console.error(`Erro na resposta da API durante ${operationName}:`, error.response.data);
    throw new Error(error.response.data.detail || JSON.stringify(error.response.data) || `Erro do servidor durante ${operationName}.`);
  } else if (error.request) {
    // A requisição foi feita, mas nenhuma resposta foi recebida
    console.error(`Erro na requisição da API (sem resposta) durante ${operationName}:`, error.request);
    throw new Error(`Erro de rede: O servidor não respondeu. Certifique-se de que o backend está rodando em ${API_BASE_URL}.`);
  } else {
    // Algo aconteceu na configuração da requisição que disparou um erro
    console.error(`Erro ao configurar a requisição da API durante ${operationName}:`, error.message);
    throw new Error(`Erro ao configurar a requisição da API: ${error.message}`);
  }
};

// =========================================================
//           FUNÇÕES DE INTERAÇÃO COM A API (ONGs)
// =========================================================

/**
 * Cria uma nova ONG no backend.
 * @param {Object} ongData - Os dados da ONG a serem criados.
 * Ex: { nome: 'Minha ONG', cnpj: '...', endereco: '...', missao: '...' }
 * IMPORTANTE: Os nomes dos campos devem corresponder exatamente aos esperados pelo seu Serializer/View no Django.
 * @returns {Promise<Object>} Os dados da ONG criada.
 */
export const createOng = async (ongData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ongs/`, ongData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'criar ONG');
  }
};

/**
 * Busca todas as ONGs cadastradas no backend.
 * @returns {Promise<Array<Object>>} Uma lista de objetos ONG.
 */
export const getOngs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ongs/`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'buscar ONGs');
  }
};

/**
 * Busca uma ONG específica por ID no backend.
 * @param {string | number} id - O ID da ONG a ser buscada.
 * @returns {Promise<Object>} Os dados da ONG.
 */
export const getOngById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ongs/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error, `buscar ONG com ID ${id}`);
  }
};

// =========================================================
//           FUNÇÕES DE INTERAÇÃO COM A API (Doadores)
// =========================================================

/**
 * Cria um novo doador no backend.
 * @param {Object} doadorData - Os dados do doador a serem criados.
 * Ex: { nome: 'Fulano', email: '...', cpf: '...' }
 * IMPORTANTE: Os nomes dos campos devem corresponder exatamente aos esperados pelo seu Serializer/View no Django.
 * @returns {Promise<Object>} Os dados do doador criado.
 */
export const createDoador = async (doadorData) => {
  try {
    // IMPORTANTE: Altere '/doadores/' para o endpoint correto da sua API Django para doadores.
    const response = await axios.post(`${API_BASE_URL}/doadores/`, doadorData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'criar doador');
  }
};

// =========================================================
//           EXEMPLOS DE OUTRAS FUNÇÕES ÚTEIS (Opcional)
// =========================================================

// Exemplo de função para atualizar uma ONG
export const updateOng = async (id, ongData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/ongs/${id}/`, ongData);
    return response.data;
  } catch (error) {
    handleApiError(error, `atualizar ONG com ID ${id}`);
  }
};

// Exemplo de função para deletar uma ONG
export const deleteOng = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/ongs/${id}/`);
    return response.status === 204; // Retorna true se a exclusão for bem-sucedida (No Content)
  } catch (error) {
    handleApiError(error, `deletar ONG com ID ${id}`);
  }
};

// Exemplo de função para fazer login (se você tiver autenticação JWT/Token)
export const loginUser = async (credentials) => {
  try {
    // ATENÇÃO: Ajuste este endpoint para a sua rota de login no Django (ex: /auth/jwt/create/)
    const response = await axios.post(`${API_BASE_URL}/auth/jwt/create/`, credentials);
    return response.data; // Geralmente retorna um token
  } catch (error) {
    handleApiError(error, 'login de usuário');
  }
};

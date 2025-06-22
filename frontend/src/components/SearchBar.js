// frontend/ongs-connection-main/src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (onSearch) { // Sempre notifica o pai, mesmo que o termo seja vazio para limpar resultados
      onSearch(trimmedTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        id="busca-instituicao"
        placeholder="Pesquisar por nome, causa ou localização..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
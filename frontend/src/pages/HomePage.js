// frontend/ongs-connection-main/src/pages/HomePage.js

import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { getOngs } from "../api/ongApi";
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [allOngs, setAllOngs] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Já existe e é crucial

  // useEffect para carregar todas as ONGs quando o componente for montado
  useEffect(() => {
    const fetchAllOngs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getOngs();
        setAllOngs(data);
        setSearchResults(data); // Inicialmente, mostra todas as ONGs
        // Nenhuma busca foi feita ainda, então hasSearched permanece false
      } catch (err) {
        console.error("Erro ao carregar ONGs:", err);
        // Não definimos erro aqui para a carga inicial para evitar a mensagem se não houver busca
        // A seção motivacional cuida do caso de não haver ONGs
      } finally {
        setLoading(false);
      }
    };
    fetchAllOngs();
  }, []);

  const handleSearch = async (term) => {
    setHasSearched(true); // Uma busca foi realizada
    setLoading(true);
    setError(null);
    setNoResults(false);

    if (!term.trim()) {
      // Se o termo de busca for vazio, exibe todas as ONGs e reseta o estado de busca
      setSearchResults(allOngs);
      setNoResults(false);
      setHasSearched(false); // Reinicia o estado de busca para esconder mensagens de busca e mostrar motivacional
      setLoading(false);
      return;
    }

    try {
      const filteredOngs = allOngs.filter((ong) =>
        ong.nome.toLowerCase().includes(term.toLowerCase()) ||
        (ong.causa && ong.causa.toLowerCase().includes(term.toLowerCase())) ||
        (ong.localizacao && ong.localizacao.toLowerCase().includes(term.toLowerCase()))
      );

      if (filteredOngs.length === 0) {
        setNoResults(true);
        setSearchResults([]);
      } else {
        setSearchResults(filteredOngs);
      }
    } catch (err) {
      console.error("Erro ao buscar ONGs:", err);
      setError("Erro ao realizar a busca. Tente novamente mais tarde."); // Mensagem de erro apenas para busca
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <main>
        <section className="hero">
          <div className="container">
            <h2>Conectando Você a Causas Incríveis</h2>
            <p>
              Encontre instituições e projetos sociais que transformam vidas e
              contribua para um futuro melhor.
            </p>
            <div className="cta-buttons">
              <Link to="/ongs" className="btn btn-primary">
                Ver ONGs Cadastradas
              </Link>
              <Link to="/cadastro-ong" className="btn btn-secondary">
                Cadastrar Sua ONG
              </Link>
            </div>
          </div>
        </section>

        <section className="search-section">
          <div className="container">
            <h3>Encontre uma Instituição</h3>
            <SearchBar onSearch={handleSearch} />
            <div id="resultado-busca">
              {/* MODIFICAÇÕES AQUI */}
              {loading && hasSearched && <p className="loading">Buscando instituições...</p>}
              {error && hasSearched && <p className="error">{error}</p>}
              {
                !loading && !error && hasSearched && searchResults.length === 0 && (
                  <p className="no-results">Nenhuma instituição encontrada para o termo informado.</p>
                )
              }

              {/* Exibe os resultados OU todas as ONGs se ainda não houve busca */}
              {(!loading && !error && (searchResults.length > 0 || !hasSearched)) && (
                <div className="resultados-grid">
                  {searchResults.map((ong) => (
                    <div key={ong.id} className="resultado-item">
                      <h3>{ong.nome}</h3>
                      {ong.causa && <p><strong>Causa:</strong> {ong.causa}</p>}
                      {ong.localizacao && <p><strong>Localização:</strong> {ong.localizacao}</p>}
                      <p>{ong.descricao || ong.missao || "Sem descrição disponível."}</p>
                      {ong.site && (
                        <p>
                          <a
                            href={ong.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visitar Site
                          </a>
                        </p>
                      )}
                      {ong.contato && <p>Contato: {ong.contato}</p>}
                      <Link to={`/instituicoes/${ong.id}`} className="btn btn-primary btn-sm">
                        Saiba Mais
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Nova Seção de Texto Motivacional */}
        {/* Esta seção aparece APENAS se não houver carregamento, não houver erro, NÃO HOUVER ONGs e NENHUMA busca foi realizada */}
        {!loading && !error && allOngs.length === 0 && !hasSearched && (
          <section className="motivational-section container">
            <h2>Sua Ajuda Transforma Vidas</h2>
            <p>
              Sua ajuda transforma vidas! Com seu apoio, podemos oferecer um futuro melhor para aqueles
               em necessidade. Junte-se a nós nessa missão de amor e cuidado, e faça a diferença na vida
              de cada pessoa que precisa de ajuda. Unidos, podemos criar um mundo mais justo e compassivo para todos."
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default HomePage;
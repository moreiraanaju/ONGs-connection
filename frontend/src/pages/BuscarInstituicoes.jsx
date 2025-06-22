// pages/BuscarInstituicoes.jsx
import React, { useState, useEffect } from "react";

export default function BuscarInstituicoes() {
  const [termo, setTermo] = useState("");
  const [instituicoes, setInstituicoes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [count, setCount] = useState(0);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (termo) {
      buscarInstituicoes(1);
    }
  }, []);

  const buscarInstituicoes = async (paginaBusca = 1) => {
    setMensagem("Buscando...");
    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/api/instituicoes/?search=${termo}&page=${paginaBusca}`
      );
      const data = await resp.json();

      if (data.results.length === 0) {
        setMensagem("Nenhuma instituição encontrada.");
        setInstituicoes([]);
        return;
      }

      setInstituicoes(data.results);
      setCount(data.count);
      setPagina(paginaBusca);
      setMensagem("");
    } catch (err) {
      setMensagem("Erro ao buscar instituições.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl mb-4">Buscar Instituições</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Digite o nome da instituição"
          className="flex-1 border p-2 rounded-l"
        />
        <button
          onClick={() => buscarInstituicoes(1)}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Buscar
        </button>
      </div>

      {mensagem && <p className="mb-2">{mensagem}</p>}

      {instituicoes.map((inst, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-2 bg-gray-50 shadow-sm"
        >
          <h3 className="text-lg font-bold">{inst.nome}</h3>
          <p>{inst.descricao}</p>
          <p className="text-sm text-gray-600">{inst.endereco}</p>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        {pagina > 1 && (
          <button
            onClick={() => buscarInstituicoes(pagina - 1)}
            className="text-blue-600"
          >
            ← Anterior
          </button>
        )}
        {pagina * 5 < count && (
          <button
            onClick={() => buscarInstituicoes(pagina + 1)}
            className="text-blue-600 ml-auto"
          >
            Próxima →
          </button>
        )}
      </div>
    </div>
  );
}

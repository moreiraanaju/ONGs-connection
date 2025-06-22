import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Instituicoes.css";


import orfanato from '../assets/orfanato1.jpg';
import larIdoso from '../assets/lar-idoso1.jpg';
import meioAmbiente from '../assets/meio-ambiente2.jpg';
import amigosAnimais from '../assets/amigosAnimais.jpg'; 

function InstituicaoOngs() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const instituicoes = [
    {
      id: 1,
      nome: "Orfanato Esperança",
      descricao:
        "Oferece acolhimento, educação e apoio emocional a crianças em situação de vulnerabilidade, garantindo um futuro mais promissor.",
      imagem: orfanato,
    },
    {
      id: 2,
      nome: "Lar São Vicente",
      descricao:
        "Proporciona cuidado, dignidade e qualidade de vida a idosos, com atividades recreativas e assistência médica.",
      imagem: larIdoso,
    },
    {
      id: 3,
      nome: "Projeto Verde Vida",
      descricao:
        "Promove sustentabilidade por meio de reflorestamento, educação ambiental e ações para preservar o meio ambiente.",
      imagem: meioAmbiente,
    },
    {
      id: 4,
      nome: "Amigos Animais",
      descricao:
        "Resgata e cuida de animais abandonados, promovendo adoção responsável e conscientização sobre bem-estar animal.",
      imagem: amigosAnimais,
    },
  ];

  return (
    <main className="instituicoes-page">
      <section className="hero" data-aos="fade-up">
        <div className="container">
          <h1>Instituições Parceiras</h1>
          <p className="hero-subtitle">
            Conheça as organizações que compartilham nossa missão de transformar vidas.
          </p>
        </div>
      </section>

      <section className="instituicoes-content" data-aos="fade-up">
        <div className="container">
          <p className="intro-text">
            Trabalhamos em parceria com instituições dedicadas a causas sociais, ambientais e
            humanitárias. Juntos, promovemos impacto positivo e sustentável nas comunidades que
            atendemos.
          </p>

          <div className="instituicoes-grid">
            {instituicoes.map((ong, index) => (
              <article
                className="instituicao-card"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                key={ong.id}
              >
                <img
                  src={ong.imagem}
                  alt={`Imagem da instituição ${ong.nome}`}
                  className="instituicao-img"
                />
                <h2>{ong.nome}</h2>
                <p>{ong.descricao}</p>
                <a href={`/perfil-ong/${ong.id}`} className="btn btn-primary">
                  Saiba Mais
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default InstituicaoOngs;

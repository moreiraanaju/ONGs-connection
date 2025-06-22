// frontend/ongs-connection-main/src/pages/AboutPage.js
import React from 'react';
import './AboutPage.css'; // Importe o CSS específico
import doacao2Img from '../assets/Doacao2.jpg';
// Importe a imagem diretamente para que o Webpack a processe
// Certifique-se de que Doação2.jpg está em src/assets/

function AboutPage() {
  return (
    <div className="sobre-page">
      <main>
        <section
          className="hero"
          style={{ backgroundImage: `url(${doacao2Img})` }}>
          <div className="container">
            <h1>Sobre a ONG Connection</h1>
            <p className="hero-subtitle">
              Conectando corações e causas para um mundo melhor.
            </p>
          </div>
        </section>

        <section className="sobre-content container">
          <p>
            A ONG Connection nasceu da paixão por transformar vidas e da crença
            de que a solidariedade pode construir pontes onde antes existiam
            apenas lacunas. Somos uma plataforma dedicada a conectar doadores,
            voluntários e instituições sociais de forma transparente e eficaz.
          </p>

          <h2>Nossa Missão</h2>
          <p>
            Facilitar o encontro entre quem quer ajudar e quem precisa de ajuda,
            promovendo o impacto social positivo através da tecnologia.
            Acreditamos que cada pequena ação pode gerar uma grande mudança, e
            nosso papel é simplificar esse processo para todos.
          </p>

          <h2>Nossa Visão</h2>
          <p>
            Ser a maior e mais confiável plataforma de conexão social do Brasil,
            onde a doação e o voluntariado sejam acessíveis, inspiradores e
            parte do dia a dia de milhões de pessoas.
          </p>

          <h2>Nossos Valores</h2>
          <ul>
            <li>
              <strong>Transparência:</strong> Garantimos que cada doação e cada
              hora de voluntariado sejam direcionadas de forma clara e ética.
            </li>
            <li>
              <strong>Compaixão:</strong> Agimos com empatia e respeito por todas
              as vidas que tocamos.
            </li>
            <li>
              <strong>Conexão:</strong> Construímos pontes entre pessoas e causas,
              fortalecendo a comunidade.
            </li>
            <li>
              <strong>Inovação:</strong> Utilizamos a tecnologia para otimizar e
              escalar o impacto social.
            </li>
            <li>
              <strong>Integridade:</strong> Operamos com honestidade e
              responsabilidade em todas as nossas ações.
            </li>
          </ul>

          <h2>Como Funciona</h2>
          <p>
            Através da nossa plataforma, doadores podem explorar diversas
            instituições parceiras, entender suas causas e necessidades, e
            realizar doações financeiras ou de itens de forma segura. Voluntários
            encontram oportunidades para dedicar seu tempo e habilidades. As
            ONGs, por sua vez, têm um canal direto para divulgar suas demandas
            e receber o apoio necessário.
          </p>

          <h2>Junte-se a Nós!</h2>
          <p>
            Seja você um doador, um voluntário ou uma instituição, a ONG
            Connection é o seu parceiro na construção de um futuro mais justo e
            solidário. Faça parte dessa rede de transformação!
          </p>

          <div className="cta-buttons">
            <a href="/cadastro-doador" className="btn btn-primary">Quero Ser Doador</a>
            <a href="/cadastro-ong" className="btn">Cadastrar Minha ONG</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
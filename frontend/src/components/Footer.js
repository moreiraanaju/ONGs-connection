import React from 'react';
import './Footer.css'; 


function Footer() {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="social-icons">
          <h2>Contato</h2>
          <a href="https://wa.me/5548999999999" target="_blank" rel="noopener noreferrer">
            
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="whatsapp-icon" />
          </a>
          <a href="mailto:exemplo@email.com" target="_blank" rel="noopener noreferrer">
            
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="E-mail" />
          </a>
          <a href="https://www.facebook.com/suaPagina" target="_blank" rel="noopener noreferrer">
            
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/suaPagina" target="_blank" rel="noopener noreferrer">
           
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
          </a>
        </div>
        <div className="mapa">
          <h2>Local para Doações</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1531.624794951111!2d-49.81845873719463!3d-27.241517036666324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94df1918a1a3b3fd%3A0x8898b3c6a461b2b!2sAgrol%C3%A2ndia%2C%20SC%2C%2088420-000!5e0!3m2!1spt-BR!2sbr!4v1719012345678!5m2!1spt-BR!2sbr" // Verifique se esta URL está correta e funcional
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização para Doações"
          ></iframe>
          <p>
            Endereço: Cidade Agrolândia, SC, CEP 88420-000, Rua 25 de Julho, 100 - Centro.
          </p>
        </div>
      </div>
      <div className="copy">
        <p>© 2024 ONG Connection. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
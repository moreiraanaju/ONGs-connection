import React, { useState } from 'react';
import './FormularioGenerico.css';

function FormularioGenerico({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    alert('Formulário enviado! (via React)');
    setFormData({ name: '', email: '', message: '' }); 
  };

  return (
    <div id="form-container" className="formulario"> 
      <form id="myForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensagem:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="btn">Enviar</button>
      </form>
    </div>
  );
}

export default FormularioGenerico;
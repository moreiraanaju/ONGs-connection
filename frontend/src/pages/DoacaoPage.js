import React, { useState } from 'react';
import './DoacaoPage.css'; // Importando o CSS específico da página

function DoacaoPage() {
  const [formData, setFormData] = useState({
    ong: '',
    valor: '',
    nomeDoador: '',
    emailDoador: '',
    numeroCartao: '',
    nomeCartao: '',
    validade: '',
    cvv: ''
  });

  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.ong) newErrors.ong = 'Selecione uma ONG.';
    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      newErrors.valor = 'Informe um valor válido.';
    }
    if (!formData.nomeDoador) newErrors.nomeDoador = 'Nome é obrigatório.';
    if (!formData.emailDoador) {
      newErrors.emailDoador = 'Email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailDoador)) {
      newErrors.emailDoador = 'Email inválido.';
    }

    if (metodoPagamento === 'cartao') {
      if (!formData.numeroCartao || !/^\d{16}$/.test(formData.numeroCartao)) {
        newErrors.numeroCartao = 'Informe um número de cartão válido (16 dígitos).';
      }
      if (!formData.nomeCartao) newErrors.nomeCartao = 'Informe o nome no cartão.';
      if (!formData.validade || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.validade)) {
        newErrors.validade = 'Informe a validade no formato MM/AA.';
      }
      if (!formData.cvv || !/^\d{3}$/.test(formData.cvv)) {
        newErrors.cvv = 'Informe o CVV (3 dígitos).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Doação registrada com sucesso!');
      console.log('Dados:', formData, 'Método:', metodoPagamento);
      setFormData({
        ong: '', valor: '', nomeDoador: '', emailDoador: '',
        numeroCartao: '', nomeCartao: '', validade: '', cvv: ''
      });
      setMetodoPagamento('cartao');
    } else {
      setErrors(prev => ({ ...prev, form: 'Por favor, corrija os erros.' }));
    }
  };

  return (
    <div className="doar-page">
      <main className="doacao-content container">
        {/* Removida a seção 'doacao-methods' que continha os cards de doação financeira e voluntariado */}

        <section id="doacao-form-section" className="doacao-form">
          <h2>Faça Sua Doação</h2>
          <form onSubmit={handleSubmit} noValidate>
            {errors.form && <p className="error">{errors.form}</p>}

            <div className="form-group">
              <label htmlFor="ong">Selecione a ONG: <span className="required">*</span></label>
              <select id="ong" name="ong" value={formData.ong} onChange={handleChange} required>
                <option value="">-- Selecione --</option>
                <option value="1">ONG Abrace a Vida</option>
                <option value="2">Instituto Esperança</option>
                <option value="3">Amigos dos Animais</option>
              </select>
              {errors.ong && <span className="error">{errors.ong}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="valor">Valor da Doação (R$): <span className="required">*</span></label>
              <input
                type="number"
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
              />
              {errors.valor && <span className="error">{errors.valor}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="nomeDoador">Seu Nome: <span className="required">*</span></label>
              <input
                type="text"
                id="nomeDoador"
                name="nomeDoador"
                value={formData.nomeDoador}
                onChange={handleChange}
                required
              />
              {errors.nomeDoador && <span className="error">{errors.nomeDoador}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="emailDoador">Seu Email: <span className="required">*</span></label>
              <input
                type="email"
                id="emailDoador"
                name="emailDoador"
                value={formData.emailDoador}
                onChange={handleChange}
                required
              />
              {errors.emailDoador && <span className="error">{errors.emailDoador}</span>}
            </div>

            <div className="form-group">
              <label>Método de Pagamento:</label>
              <div>
                <input
                  type="radio"
                  id="pagamentoCartao"
                  name="metodoPagamento"
                  value="cartao"
                  checked={metodoPagamento === 'cartao'}
                  onChange={() => setMetodoPagamento('cartao')}
                />
                <label htmlFor="pagamentoCartao">Cartão de Crédito</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="pagamentoPix"
                  name="metodoPagamento"
                  value="pix"
                  checked={metodoPagamento === 'pix'}
                  onChange={() => setMetodoPagamento('pix')}
                />
                <label htmlFor="pagamentoPix">PIX</label>
              </div>
            </div>

            {metodoPagamento === 'cartao' && (
              <>
                <div className="form-group">
                  <label htmlFor="numeroCartao">Número do Cartão: <span className="required">*</span></label>
                  <input
                    type="text"
                    id="numeroCartao"
                    name="numeroCartao"
                    maxLength="16"
                    value={formData.numeroCartao}
                    onChange={handleChange}
                    placeholder="Digite os 16 dígitos"
                    required
                  />
                  {errors.numeroCartao && <span className="error">{errors.numeroCartao}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="nomeCartao">Nome no Cartão: <span className="required">*</span></label>
                  <input
                    type="text"
                    id="nomeCartao"
                    name="nomeCartao"
                    value={formData.nomeCartao}
                    onChange={handleChange}
                    placeholder="Ex: JOÃO DA SILVA"
                    required
                  />
                  {errors.nomeCartao && <span className="error">{errors.nomeCartao}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="validade">Validade (MM/AA): <span className="required">*</span></label>
                    <input
                      type="text"
                      id="validade"
                      name="validade"
                      value={formData.validade}
                      onChange={handleChange}
                      placeholder="MM/AA"
                      required
                    />
                    {errors.validade && <span className="error">{errors.validade}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">CVV: <span className="required">*</span></label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      maxLength="3"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="Ex: 123"
                      required
                    />
                    {errors.cvv && <span className="error">{errors.cvv}</span>}
                  </div>
                </div>
              </>
            )}

            {metodoPagamento === 'pix' && (
              <div className="pix-info">
                <p>Chave PIX (CNPJ):</p>
                <strong>12.345.678/0001-90</strong>
                <p>Envie o valor para essa chave e clique em "Confirmar Doação" para finalizar.</p>
              </div>
            )}

            <button type="submit" className="btn-primary">Confirmar Doação</button>
          </form>
        </section>

        <section className="doacao-beneficios">
          <h2>Por que Doar?</h2>
          <ul>
            <li>Ajude a transformar vidas e comunidades.</li>
            <li>Contribua para projetos sociais de impacto comprovado.</li>
            <li>Receba atualizações sobre como sua doação está sendo utilizada.</li>
            <li>Doe com segurança e praticidade.</li>
          </ul>
        </section>
        <section className="impact-section">
          <h2>Nosso Impacto Até Agora</h2>
          <p>Com a ajuda de doadores como você, já alcançamos:</p>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>500+</h3>
              <p>Projetos Apoiados</p>
            </div>
            <div className="stat-card">
              <h3>2000+</h3>
              <p>Vidas Transformadas</p>
            </div>
            <div className="stat-card">
              <h3>10M+</h3>
              <p>Em Doações Coletadas</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoacaoPage;
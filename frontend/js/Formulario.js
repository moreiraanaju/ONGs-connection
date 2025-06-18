// Formulario.js
document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.getElementById('form-container');

  const formHTML = `
    <form id="myForm">
      <label for="name">Nome:</label>
      <input type="text" id="name" name="name" required>
      
      <label for="email">E-mail:</label>
      <input type="email" id="email" name="e-mail" required>
      
      <label for="message">Mensagem:</label>
      <textarea id="message" name="message"></textarea>
      
      <button type="submit">Enviar</button>
    </form>
  `;

  formContainer.innerHTML = formHTML;

  const form = document.getElementById('myForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Formulário enviado!');
  });
});
// Validação de CPF e CNPJ
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
}

function validarDocumento(doc) {
  const numeros = doc.replace(/[^\d]/g, '');
  if (numeros.length === 11) return validarCPF(numeros);
  if (numeros.length === 14) return validarCNPJ(numeros);
  return false;
}

document.getElementById("doador-cpf-cnpj").addEventListener("blur", function () {
  const valor = this.value;
  const valido = validarDocumento(valor);

  const erro = document.getElementById("erro-cpf-cnpj");
  if (!valido) {
    erro.style.display = "block";
  } else {
    erro.style.display = "none";
  }
});

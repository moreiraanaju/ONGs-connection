// script.js

// Busca de Instituições
async function buscarInstituicao() {
  const termo = document.getElementById("busca-instituicao").value.toLowerCase().trim();
  const resultadoDiv = document.getElementById("resultado-busca");
  resultadoDiv.innerHTML = "";

  if (termo === "") {
    resultadoDiv.innerHTML = "<p>Digite o nome da instituição.</p>";
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/instituicoes/`);
    const instituicoes = await res.json();

    const resultados = instituicoes.filter(inst =>
      inst.nome.toLowerCase().includes(termo)
    );

    if (resultados.length === 0) {
      resultadoDiv.innerHTML = "<p>Nenhuma instituição encontrada.</p>";
    } else {
      resultados.forEach(inst => {
        const card = document.createElement("div");
        card.style.border = "1px solid #ccc";
        card.style.padding = "10px";
        card.style.marginBottom = "10px";
        card.style.borderRadius = "5px";
        card.innerHTML = `<strong>${inst.nome}</strong><br><small>${inst.descricao}</small>`;
        resultadoDiv.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar instituições:", error);
    resultadoDiv.innerHTML = "<p>Erro ao buscar instituições.</p>";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS (Animate on Scroll)
  AOS.init({
    once: true,
    duration: 800,
    easing: "ease-out",
  });


  // Dropdown Personalizado para Tipo de Doador
  const dropdownToggle = document.getElementById('doador-tipo-toggle');
  const dropdownMenu = document.getElementById('doador-tipo-menu');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const tipoInput = document.getElementById('doador-tipo');

  dropdownToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
  });

  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      dropdownToggle.textContent = item.textContent;
      tipoInput.value = item.getAttribute('data-value');
      dropdownMenu.classList.remove('show');
    });
  });

  // Fechar o dropdown ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove('show');
    }
  });

  // Mostrar/ocultar formulário de login ao clicar em "Entrar"
  const loginButton = document.querySelector('[data-form="login"]');
  const loginFormContainer = document.getElementById('form-login');
  if (loginButton && loginFormContainer) {
    loginButton.addEventListener('click', () => {
      loginFormContainer.classList.toggle('escondido');
    });
  }

  // Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('senha').value.trim();
      const errorSpan = document.getElementById('login-error');

      if (!email || !password) {
        errorSpan.textContent = 'Preencha todos os campos.';
        return;
      }

      errorSpan.textContent = '';
      alert('Login realizado com sucesso!');
      window.location.href = 'pagina-pessoal.html';
    });
  }

  // Cadastro de Doador
  const doadorForm = document.getElementById('doador-form');
  if (doadorForm) {
    doadorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('doador-nome').value.trim();
      const email = document.getElementById('doador-e-mail').value.trim();
      const tipo = document.getElementById('doador-tipo').value;

      if (!nome || !email || !tipo) {
        alert('Preencha os campos obrigatórios!');
        return;
      }

      alert('Cadastro de doador realizado com sucesso!');
      window.location.href = 'pagina-pessoal.html';
    });
  }

  // Cadastro de ONG
  const ongForm = document.getElementById('ong-form');
  if (ongForm) {
    ongForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('ong-nome').value.trim();
      const cnpj = document.getElementById('ong-cnpj').value.trim();
      const email = document.getElementById('ong-e-mail').value.trim();
      const descricao = document.getElementById('ong-descricao').value.trim();

      if (!nome || !cnpj || !email || !descricao) {
        alert('Preencha os campos obrigatórios!');
        return;
      }

      alert('Cadastro da ONG realizado com sucesso!');
      window.location.href = 'pagina-ong.html';
    });
  }

  // Validação da Senha
  const senhaInput = document.getElementById('senha');
  const senhaError = document.getElementById('senha-error');
  if (senhaInput && senhaError) {
    senhaInput.addEventListener('input', function() {
      const senha = this.value;
      const senhaPattern = /^(?=.*[A-Z])[0-9]{5}$/;

      if (!senhaPattern.test(senha)) {
        senhaError.style.display = 'block';
      } else {
        senhaError.style.display = 'none';
      }
    });
  }
  
  
});
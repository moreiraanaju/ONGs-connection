# 🌱 ONGs Connection - Conexão Solidária

Este projeto tem o objetivo de **conectar ONGs e doadores** de forma **segura, efetiva e simples**, promovendo o engajamento em causas sociais através da tecnologia.

> Projeto desenvolvido como parte do 3º semestre do curso de Análise e Desenvolvimento de Sistemas na UniSENAI.

---

## 🚀 Tecnologias utilizadas

- **Backend:** [Django](https://www.djangoproject.com/) (REST API)
- **Frontend:** [React](https://reactjs.org/)
- **Banco de dados:** SQLite (substituível por MySQL)
- **Outros recursos:** Django Admin, Serializers, Validações customizadas, JWT (futuramente)

---

## 🔧 Funcionalidades principais (MVP)

- Cadastro e autenticação de usuários (ONGs, doadores e administradores)
- Painel com visualização personalizada por tipo de usuário
- CRUD completo via API para:
  - Instituições
  - Doadores
  - Projetos
  - Doações
  - Necessidades
  - Voluntariados
- Validações customizadas de CPF/CNPJ
- Integração futura com o frontend em React

---

## 📁 Organização do projeto

```bash
├── backend/
│   ├── setup/
│   ├── instituicoes/
│   ├── templates/
│   └── db.sqlite3
├── frontend/  ← (em desenvolvimento)
└── README.md

## 📚 Status do desenvolvimento

- ✅ Backend funcional com autenticação e autorização
- ✅ Serializers e validações implementadas
- ✅ Endpoints RESTful criados e testados (GET, POST, PUT, DELETE)
- ⏳ Integração com frontend em andamento
- 🧠 Em paralelo, o projeto também será base para estudos de análise de dados com Django ORM e SQL

## 🤝 Contribuição

Este projeto faz parte de um processo de aprendizado, mas sugestões e contribuições são sempre bem-vindas! 🚀

## 👥 Autores

**Ana Jussara Moreira**  
Estudante de Análise e Desenvolvimento de Sistemas – UniSENAI   
- 🌐 [LinkedIn](https://www.linkedin.com/in/anajussaramoreira/)  
- 📧  ana_j_ferreira@estudante.sesisenai.org.br

**Jociele Siqueira**  
Estudante de Análise e Desenvolvimento de Sistemas – UniSENAI  
- 📧 Jociele Siqueira
jociele_siqueira@estudante.sesisenai.org.br  

**Carlos Azevedo**  
Estudante de Análise e Desenvolvimento de Sistemas – UniSENAI  
- 📧 carlos_p_azevedo@estudante.sesisenai.org.br 
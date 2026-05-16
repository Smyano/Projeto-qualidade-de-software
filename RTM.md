# 📌 RTM - Requirements Traceability Matrix

## Projeto: Bookup

A matriz de rastreabilidade tem como objetivo relacionar os requisitos do sistema com suas respectivas implementações e testes realizados.

---

# 📋 Matriz de Rastreabilidade

| ID | Requisito | Implementação | Teste Relacionado | Status |
|---|---|---|---|---|
| RF-01 | O sistema deve permitir cadastro de usuários | AuthController / AuthService | AuthControllerIntegrationTest / AuthServiceTest | ✅ |
| RF-02 | O sistema deve permitir login de usuários | AuthController / AuthService | AuthControllerIntegrationTest / AuthServiceTest | ✅ |
| RF-03 | O sistema deve validar campos obrigatórios no cadastro | DTOs + Validation | AuthControllerIntegrationTest | ✅ |
| RF-04 | O sistema deve validar email inválido | DTOs + Validation | AuthControllerIntegrationTest | ✅ |
| RF-05 | O sistema deve impedir cadastro de email duplicado | AuthService | AuthServiceTest | ✅ |
| RF-06 | O sistema deve impedir login com senha inválida | AuthService | AuthServiceTest | ✅ |
| RF-07 | O sistema deve permitir cadastrar livros | LivroController / LivroService | LivroControllerIntegrationTest | ✅ |
| RF-08 | O sistema deve listar livros cadastrados | LivroController / LivroService | LivroControllerIntegrationTest | ✅ |
| RF-09 | O sistema deve atualizar livros | LivroController / LivroService | LivroControllerIntegrationTest | ✅ |
| RF-10 | O sistema deve excluir livros | LivroController / LivroService | LivroControllerIntegrationTest | ✅ |
| RF-11 | O sistema deve tratar erros de forma padronizada | GlobalExceptionHandler | AuthServiceTest / Testes de integração | ✅ |
| RF-12 | O sistema deve possuir testes automatizados | JUnit + Mockito + Testcontainers | GitHub Actions | ✅ |
| RF-13 | O sistema deve possuir integração contínua | GitHub Actions | Workflow backend-tests.yml | ✅ |
| RF-14 | O sistema deve possuir cobertura mínima de testes | JaCoCo | Relatório JaCoCo | ✅ |

---

# 🧪 Estratégia de Testes

O projeto utiliza:

- testes unitários;
- testes de integração;
- testes automatizados com MongoDB temporário utilizando Testcontainers;
- validação automatizada via GitHub Actions.

---

# 📊 Cobertura de Testes

Ferramenta utilizada:

- JaCoCo

Cobertura atual:

```text
84%

# 🔄 Integração Contínua

O projeto utiliza GitHub Actions para:

- executar testes automaticamente
- validar build do backend
- gerar cobertura de testes
- garantir qualidade contínua

---

# 🛠 Ferramentas Utilizadas

- Java 17
- Spring Boot
- MongoDB
- React
- Maven
- JUnit 5
- Mockito
- Testcontainers
- JaCoCo
- GitHub Actions

# 👩‍💻 Desenvolvido por

Lucas Serafim
Samira Yano
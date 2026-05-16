# 📊 Diagramas UML de Sequência - Bookup

Este documento apresenta os principais fluxos do sistema Bookup utilizando diagramas de sequência em Mermaid.

---

## 1. Cadastro de Usuário

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend as Frontend React
    participant AuthController
    participant AuthService
    participant UsuarioRepository
    participant MongoDB

    Usuario->>Frontend: Preenche dados de cadastro
    Frontend->>AuthController: POST /auth/register
    AuthController->>AuthService: registrar(request)
    AuthService->>UsuarioRepository: findByEmail(email)
    UsuarioRepository->>MongoDB: Consulta usuário
    MongoDB-->>UsuarioRepository: Retorna resultado
    AuthService->>AuthService: Criptografa senha
    AuthService->>UsuarioRepository: save(usuario)
    UsuarioRepository->>MongoDB: Salva usuário
    MongoDB-->>UsuarioRepository: Usuário salvo
    UsuarioRepository-->>AuthService: Retorna usuário
    AuthService-->>AuthController: Retorna AuthResponse
    AuthController-->>Frontend: 200 OK
    Frontend-->>Usuario: Cadastro realizado
```

---

## 2. Login de Usuário

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend as Frontend React
    participant AuthController
    participant AuthService
    participant UsuarioRepository
    participant MongoDB

    Usuario->>Frontend: Informa email e senha
    Frontend->>AuthController: POST /auth/login
    AuthController->>AuthService: login(request)
    AuthService->>UsuarioRepository: findByEmail(email)
    UsuarioRepository->>MongoDB: Busca usuário
    MongoDB-->>UsuarioRepository: Retorna usuário
    UsuarioRepository-->>AuthService: Usuário encontrado
    AuthService->>AuthService: Valida senha criptografada
    AuthService-->>AuthController: Retorna AuthResponse
    AuthController-->>Frontend: 200 OK
    Frontend->>Frontend: Salva usuário no localStorage
    Frontend-->>Usuario: Redireciona para livros
```

---

## 3. Cadastro de Livro

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend as Frontend React
    participant LivroController
    participant LivroService
    participant LivroRepository
    participant MongoDB

    Usuario->>Frontend: Preenche formulário de livro
    Frontend->>LivroController: POST /livros
    LivroController->>LivroService: criarLivro(livro)
    LivroService->>LivroRepository: save(livro)
    LivroRepository->>MongoDB: Salva livro
    MongoDB-->>LivroRepository: Livro salvo
    LivroRepository-->>LivroService: Retorna livro
    LivroService-->>LivroController: Retorna livro
    LivroController-->>Frontend: 200 OK
    Frontend-->>Usuario: Livro cadastrado na lista
```

---

## 4. Listagem de Livros

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend as Frontend React
    participant LivroController
    participant LivroService
    participant LivroRepository
    participant MongoDB

    Usuario->>Frontend: Acessa tela de livros
    Frontend->>LivroController: GET /livros
    LivroController->>LivroService: listarLivros()
    LivroService->>LivroRepository: findAll()
    LivroRepository->>MongoDB: Consulta livros
    MongoDB-->>LivroRepository: Retorna livros
    LivroRepository-->>LivroService: Lista de livros
    LivroService-->>LivroController: Lista de livros
    LivroController-->>Frontend: 200 OK + livros
    Frontend-->>Usuario: Exibe cards de livros
```

---

## 5. Atualização de Livro

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend as Frontend React
    participant LivroController
    participant LivroService
    participant LivroRepository
    participant MongoDB

    Usuario->>Frontend: Edita dados do livro
    Frontend->>LivroController: PUT /livros/{id}
    LivroController->>LivroService: atualizarLivro(id, livro)
    LivroService->>LivroRepository: save(livroAtualizado)
    LivroRepository->>MongoDB: Atualiza livro
    MongoDB-->>LivroRepository: Livro atualizado
    LivroRepository-->>LivroService: Retorna livro
    LivroService-->>LivroController: Retorna livro atualizado
    LivroController-->>Frontend: 200 OK
    Frontend-->>Usuario: Livro atualizado na tela
```

---

## 6. Exclusão de Livro

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend as Frontend React
    participant LivroController
    participant LivroService
    participant LivroRepository
    participant MongoDB

    Usuario->>Frontend: Clica em excluir livro
    Frontend->>Frontend: Confirma exclusão
    Frontend->>LivroController: DELETE /livros/{id}
    LivroController->>LivroService: excluirLivro(id)
    LivroService->>LivroRepository: deleteById(id)
    LivroRepository->>MongoDB: Remove livro
    MongoDB-->>LivroRepository: Exclusão concluída
    LivroRepository-->>LivroService: Retorno
    LivroService-->>LivroController: Retorno
    LivroController-->>Frontend: 204 No Content
    Frontend-->>Usuario: Remove livro da lista
```

---

# ✅ Observação

Os diagramas representam os principais fluxos de comunicação entre usuário, frontend, backend e banco de dados.
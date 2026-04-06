const API = "http://localhost:8080/livros";

export function listarLivros() {
  return fetch(API).then(res => res.json());
}

export function criarLivro(livro) {
  return fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(livro)
  });
}

export function atualizarLivro(id, livro) {
  return fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(livro)
  });
}

export function excluirLivro(id) {
  return fetch(`${API}/${id}`, {
    method: "DELETE"
  });
}
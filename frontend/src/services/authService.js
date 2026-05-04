const API = "http://localhost:8080/auth";

export function loginUsuario(dados) {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });
}

export function cadastrarUsuario(dados) {
  return fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });
}
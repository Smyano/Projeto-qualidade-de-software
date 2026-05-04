import { createContext, useContext, useState } from "react";
import { loginUsuario } from "../services/authService.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  async function login(email, senha) {
    const resposta = await loginUsuario({ email, senha });

    if (!resposta.ok) {
      throw new Error("Email ou senha inválidos.");
    }

    const usuarioLogado = await resposta.json();

    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
    setUsuario(usuarioLogado);
  }

  function logout() {
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
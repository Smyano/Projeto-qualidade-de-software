import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha email e senha.");
      return;
    }

    login(email);
    navigate("/livros");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #003e64 0%, #0b5c8f 100%)",
        padding: "20px"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "420px",
          padding: "32px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "10px", color: "#003e64" }}>
          Bookup
        </h1>
        <p style={{ marginTop: 0, color: "#6b7280", marginBottom: "24px" }}>
          Entre para acessar sua biblioteca
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "12px" }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ marginBottom: "12px" }}
        />

        {erro && (
          <p
            style={{
              color: "#b91c1c",
              background: "#fee2e2",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "12px"
            }}
          >
            {erro}
          </p>
        )}

        <button type="submit" style={{ width: "100%" }}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { listarLivros } from "../services/livroService.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function CardResumo({ titulo, valor, cor }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "22px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        borderTop: `6px solid ${cor}`
      }}
    >
      <p style={{ margin: 0, color: "#6b7280", fontSize: "15px" }}>{titulo}</p>
      <h2 style={{ margin: "10px 0 0", fontSize: "36px", color: "#111827" }}>
        {valor}
      </h2>
    </div>
  );
}

function Dashboard() {
  const { usuario, logout } = useAuth();
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarLivros();
        setLivros(Array.isArray(data) ? data : []);
        setErro("");
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar os dados do dashboard.");
      }
    }

    carregar();
  }, []);

  const resumo = useMemo(() => {
    return {
      total: livros.length,
      lidos: livros.filter((livro) => livro.status === "Lido").length,
      lendo: livros.filter((livro) => livro.status === "Lendo").length,
      queroLer: livros.filter((livro) => livro.status === "Quero ler").length
    };
  }, [livros]);

  const dadosGrafico = [
    { nome: "Lidos", quantidade: resumo.lidos },
    { nome: "Lendo", quantidade: resumo.lendo },
    { nome: "Quero ler", quantidade: resumo.queroLer }
  ];

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          gap: "12px",
          flexWrap: "wrap"
        }}
      >
        <div>
          <p style={{ margin: 0, color: "#6b7280" }}>
            Usuária: <strong>{usuario?.email}</strong>
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link to="/livros">
            <button>Ir para Livros</button>
          </Link>

          <button onClick={logout} style={{ background: "#dc2626" }}>
            Sair
          </button>
        </div>
      </div>

      <div
        style={{
          marginBottom: "24px",
          padding: "24px 28px",
          borderRadius: "18px",
          background: "linear-gradient(135deg, #003e64 0%, #0b5c8f 100%)",
          color: "white",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
        }}
      >
        <h1 style={{ margin: 0, fontSize: "38px" }}>📊 Dashboard</h1>
        <p style={{ margin: "8px 0 0", opacity: 0.9 }}>
          Visão geral da sua biblioteca pessoal.
        </p>
      </div>

      {erro && (
        <p
          style={{
            color: "#b91c1c",
            background: "#fee2e2",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "16px"
          }}
        >
          {erro}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
          marginBottom: "28px"
        }}
      >
        <CardResumo titulo="Total de livros" valor={resumo.total} cor="#003e64" />
        <CardResumo titulo="Lidos" valor={resumo.lidos} cor="#16a34a" />
        <CardResumo titulo="Lendo" valor={resumo.lendo} cor="#2563eb" />
        <CardResumo titulo="Quero ler" valor={resumo.queroLer} cor="#f59e0b" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "20px"
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h2 style={{ marginTop: 0, color: "#003e64" }}>Livros por status</h2>

          <div style={{ width: "100%", height: "320px" }}>
            <ResponsiveContainer>
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="quantidade" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h2 style={{ marginTop: 0, color: "#003e64" }}>Resumo rápido</h2>

          <div style={{ color: "#374151", lineHeight: "1.8" }}>
            <p style={{ margin: "8px 0" }}>
              Você possui <strong>{resumo.total}</strong> livro(s) cadastrado(s).
            </p>
            <p style={{ margin: "8px 0" }}>
              Já concluiu <strong>{resumo.lidos}</strong> leitura(s).
            </p>
            <p style={{ margin: "8px 0" }}>
              Está lendo <strong>{resumo.lendo}</strong> livro(s) no momento.
            </p>
            <p style={{ margin: "8px 0" }}>
              Ainda pretende ler <strong>{resumo.queroLer}</strong> livro(s).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
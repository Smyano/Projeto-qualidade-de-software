import { useState } from "react";

function LivroCard({ livro, onEdit, onDelete }) {
  const [imagemErro, setImagemErro] = useState(false);

  function corStatus(status) {
    if (status?.toLowerCase() === "lido") return "#16a34a";
    if (status?.toLowerCase() === "lendo") return "#2563eb";
    return "#f59e0b";
  }

  const imagemPadrao =
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop";

  const imagemFinal =
    !livro.capa || imagemErro ? imagemPadrao : livro.capa;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <div
        style={{
          width: "100%",
          height: "240px",
          background: "#e5e7eb"
        }}
      >
        <img
          src={imagemFinal}
          alt={livro.titulo}
          onError={() => setImagemErro(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>

      <div
        style={{
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          flex: 1
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: "12px",
            marginBottom: "10px"
          }}
        >
          <div>
            <h3 style={{ margin: 0, color: "#003e64", fontSize: "22px" }}>
              {livro.titulo}
            </h3>
            <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
              {livro.autor}
            </p>
          </div>

          <span
            style={{
              background: corStatus(livro.status),
              color: "white",
              padding: "6px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "600",
              whiteSpace: "nowrap"
            }}
          >
            {livro.status || "Sem status"}
          </span>
        </div>

        <p style={{ margin: "6px 0", fontSize: "14px" }}>
          <strong>Gênero:</strong> {livro.genero}
        </p>

        <p
          style={{
            margin: "12px 0 6px",
            color: "#374151",
            lineHeight: "1.5"
          }}
        >
          <strong>Descrição:</strong> {livro.descricao || "Sem descrição"}
        </p>

        <p style={{ margin: "6px 0 0", fontSize: "14px" }}>
          <strong>Ano:</strong> {livro.ano}
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
          <button
            onClick={() => onEdit(livro)}
            style={{ background: "#2563eb", flex: 1 }}
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(livro.id)}
            style={{ background: "#dc2626", flex: 1 }}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default LivroCard;
import { useEffect, useState } from "react";
import LivroCard from "../components/LivroCard.jsx";
import {
  listarLivros,
  criarLivro,
  atualizarLivro,
  excluirLivro
} from "../services/livroService.js";

function Livros() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    genero: "",
    ano: "",
    status: "",
    capa: "",
    descricao: ""
  });

  async function carregarLivros() {
    try {
      const data = await listarLivros();
      setLivros(data);
      setErro("");
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os livros.");
    }
  }

  useEffect(() => {
    carregarLivros();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function limparFormulario() {
    setForm({
      titulo: "",
      autor: "",
      genero: "",
      ano: "",
      status: "",
      capa: "",
      descricao: ""
    });
    setEditandoId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editandoId) {
        const res = await atualizarLivro(editandoId, form);
        if (!res.ok) throw new Error("Erro ao editar livro");
      } else {
        const res = await criarLivro(form);
        if (!res.ok) throw new Error("Erro ao criar livro");
      }

      limparFormulario();
      carregarLivros();
    } catch (error) {
      console.error(error);
      setErro(editandoId ? "Erro ao editar livro." : "Erro ao cadastrar livro.");
    }
  }

  async function handleDelete(id) {
    const confirmar = window.confirm("Deseja realmente excluir este livro?");
    if (!confirmar) return;

    try {
      const res = await excluirLivro(id);
      if (!res.ok) throw new Error("Erro ao excluir livro");
      carregarLivros();
    } catch (error) {
      console.error(error);
      setErro("Erro ao excluir livro.");
    }
  }

  function handleEdit(livro) {
    setEditandoId(livro.id);
    setForm({
      titulo: livro.titulo || "",
      autor: livro.autor || "",
      genero: livro.genero || "",
      ano: livro.ano || "",
      status: livro.status || "",
      capa: livro.capa || "",
      descricao: livro.descricao || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
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
        <h1 style={{ margin: 0, fontSize: "38px" }}>📚 Meus Livros</h1>
        <p style={{ margin: "8px 0 0", opacity: 0.9 }}>
          Gerencie sua biblioteca pessoal de forma simples e organizada.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "18px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          marginBottom: "30px"
        }}
      >
        <h2 style={{ marginTop: 0, color: "#003e64", fontSize: "28px" }}>
          {editandoId ? "Editar Livro" : "Adicionar Livro"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            marginTop: "18px"
          }}
        >
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
          />

          <input
            name="autor"
            placeholder="Autor"
            value={form.autor}
            onChange={handleChange}
          />

          <input
            name="genero"
            placeholder="Gênero"
            value={form.genero}
            onChange={handleChange}
          />

          <input
            name="ano"
            placeholder="Ano"
            value={form.ano}
            onChange={handleChange}
          />

          <input
            name="status"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
          />

          <input
            name="capa"
            placeholder="URL da capa"
            value={form.capa}
            onChange={handleChange}
          />

          <textarea
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            style={{ gridColumn: "span 2" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
          <button type="submit">
            {editandoId ? "Salvar Alterações" : "Salvar Livro"}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={limparFormulario}
              style={{ background: "#6b7280" }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

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

      {livros.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
          }}
        >
          <p style={{ margin: 0 }}>Nenhum livro encontrado.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px"
          }}
        >
          {livros.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Livros;
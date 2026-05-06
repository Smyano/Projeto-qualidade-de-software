import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../services/authService.js";

function Cadastro() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (!form.nome || !form.email || !form.senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        try {
            const resposta = await cadastrarUsuario(form);

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar usuário.");
            }

            setSucesso("Cadastro realizado com sucesso!");

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (error) {
            const mensagem = await resposta.text();

            setErro(
                mensagem || "Erro ao cadastrar. Verifique os dados."
            );
        }
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
                    maxWidth: "430px",
                    padding: "32px",
                    borderRadius: "18px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                }}
            >
                <h1 style={{ marginTop: 0, marginBottom: "10px", color: "#003e64" }}>
                    Criar conta
                </h1>

                <p style={{ marginTop: 0, color: "#6b7280", marginBottom: "24px" }}>
                    Cadastre-se para acessar o Bookup.
                </p>

                <input
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                    style={{ marginBottom: "12px" }}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    style={{ marginBottom: "12px" }}
                />

                <input
                    name="senha"
                    type="password"
                    placeholder="Senha"
                    value={form.senha}
                    onChange={handleChange}
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

                {sucesso && (
                    <p
                        style={{
                            color: "#166534",
                            background: "#dcfce7",
                            padding: "10px",
                            borderRadius: "10px",
                            marginBottom: "12px"
                        }}
                    >
                        {sucesso}
                    </p>
                )}

                <button type="submit" style={{ width: "100%", marginBottom: "14px" }}>
                    Cadastrar
                </button>

                <p style={{ margin: 0, textAlign: "center", color: "#6b7280" }}>
                    Já tem conta?{" "}
                    <Link to="/login" style={{ color: "#003e64", fontWeight: "600" }}>
                        Entrar
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Cadastro;
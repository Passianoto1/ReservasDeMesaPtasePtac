import React, { useState } from "react";
import "../css/CadastroPessoa.module.css";


export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    // 🔹 placeholder - integração futura
    try {
      // const res = await api.post("/register", { nome, email, password });
      console.log("Cadastro:", { nome, email, password });
      alert("Usuário cadastrado (simulação).");
    } catch (err) {
      alert("Erro ao cadastrar usuário.");
    }
  }

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
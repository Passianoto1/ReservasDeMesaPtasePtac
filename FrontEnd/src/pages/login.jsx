import React, { useState } from "react";
import "../css/Login.module.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();

    // 🔹 placeholder - será integrado ao backend depois
    try {
      // const res = await api.post("/login", { email, password });
      console.log("Login:", { email, password });
      alert("Login enviado (simulação).");
    } catch (err) {
      alert("Erro ao fazer login.");
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
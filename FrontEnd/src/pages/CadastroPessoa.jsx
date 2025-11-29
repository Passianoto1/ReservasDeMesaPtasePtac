import React, { useState } from "react";
import styles from "../css/CadastroPessoa.module.css"; 
import Header from "./Header";
import Footer from "./Footer";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/usuarios/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          nome, 
          sobrenome, 
          email, 
          rua, 
          numero, 
          bairro, 
          cidade, 
          uf, 
          password 
        }),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar pessoa");

      const dados = await response.json();
      setMensagem(`Pessoa ${dados.nome} cadastrada com sucesso!`);

      setNome("");
      setSobrenome("");
      setEmail("");
      setRua("");
      setNumero("");
      setBairro("");
      setCidade("");
      setUf("");
      setPassword("");
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro ao cadastrar. Tente novamente.");
    }
  }

  return (
    <div className={styles["page-wrapper"]}>
      <Header />

      <div className={styles["cadastro-container"]}>
        <h2>Cadastro</h2>

        <form onSubmit={registerUser} className={styles["form"]}>
          
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} required />

          <div className={styles["input-linha"]}>
            <input type="text" placeholder="Nº" value={numero} onChange={(e) => setNumero(e.target.value)} required />
            <input type="text" placeholder="UF" value={uf} maxLength={2} onChange={(e) => setUf(e.target.value)} required />
          </div>

          <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
          <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />

          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <p>{mensagem}</p>}
      </div>

      <footer className={styles["footer-fix"]}>
        <Footer />
      </footer>
    </div>
  );
}

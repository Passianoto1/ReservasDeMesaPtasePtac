
import React, { useState } from "react";
import styles from "../css/MinhasReservas.module.css";
import Header from "./Header"
import Footer from "./Footer"

export default function MinhasReservas() {
  const [mesa, setMesa] = useState("");
  const [reserva, setReserva] = useState("");
  const [data, setData] = useState("");

  const consultar = () => {
    alert(`Mesa: ${mesa} | Reserva: ${reserva} | Data: ${data}`);
  };

  return (
    <div className={styles["container"]}>
        <Header/>
      <h1 className={styles["titulo"]}>Minhas Reservas</h1>

      <div className={styles["form"]}>
        <div className={styles["campo"]}>
          <label>Nº da mesa</label>
          <input
            type="text"
            value={mesa}
            onChange={(e) => setMesa(e.target.value)}
            className={styles["input"]}
          />
        </div>

        <div className={styles["campo"]}>
          <label>Número da reserva</label>
          <input
            type="text"
            value={reserva}
            onChange={(e) => setReserva(e.target.value)}
            className={styles["input"]}
          />
        </div>

        <div className={styles["campo"]}>
          <label>Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className={styles["input"]}
          />
        </div>

        <button className={styles["botao"]} onClick={consultar}>Consultar</button>
      </div>
      <Footer/>
    </div>
  );
}

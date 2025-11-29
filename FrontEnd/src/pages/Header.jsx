import React from "react";
import styles from "../css/Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles["header"]}>
      <div className={styles["container"]}>
        
        <div className={styles["titleArea"]}>
          <h1 className={styles["title"]}>Padoca do Guspass</h1>
        </div>

        <nav className={styles["nav"]}>
          <ul className={styles["navList"]}>
            <li><Link className={styles["navItem"]} to="/">Home</Link></li>
            <li><Link className={styles["navItem"]} to="/cardapio">Cardápio</Link></li>
            <li><Link className={styles["navItem"]} to="/login">Login</Link></li>
            <li><Link className={styles["navItem"]} to="/cadastro">Cadastro</Link></li>
          </ul>
        </nav>

        <div className={styles["reservasArea"]}>
          <Link className={styles["reservasBtn"]} to="/reservas">
            Minhas Reservas
          </Link>
        </div>

      </div>
    </header>
  );
}

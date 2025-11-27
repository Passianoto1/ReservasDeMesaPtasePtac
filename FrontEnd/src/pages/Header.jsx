import { Link } from "react-router-dom";
import styles from "../css/Header.module.css";

export default function Header(){
    return(
        <header className={styles.header}>
      <div className={styles.container}>

 
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Padoca do Guspass</h1>
        </div>


        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><Link to="/" className={styles.navItem}>Home</Link></li>
            <li><Link to="/cardapio" className={styles.navItem}>Cardápio</Link></li>
            <li><Link to="/login" className={styles.navItem}>Login</Link></li>
            <li><Link to="/CadastroPessoa" className={styles.navItem}>Cadastro</Link></li>
          </ul>
        </nav>

 
        <div className={styles.reservasArea}>
          <Link to="/minhas-reservas" className={styles.reservasBtn}>
            Minhas Reservas
          </Link>
        </div>

      </div>
    </header>
    )
}
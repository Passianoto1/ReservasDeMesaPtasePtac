import styles from "../css/Footer.module.css";


export default function Footer(){
    return(
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>© 2025 Padoca do Guspass — Todos os direitos reservados.</p>
      </div>
    </footer>
    )
}
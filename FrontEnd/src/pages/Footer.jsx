import styles from "../css/Footer.module.css";


export default function Footer(){
    return(
          <footer className={styles.footer}>
  <div className={styles.footerContainer}>
    
    <div className={styles.info}>
      <h3>Padoca do Guspass</h3>
      <p>Rua Fiction, 123 — Bairro Delícia</p>
      <p>Nova Andradina — MS</p>
    </div>

    <div className={styles.social}>
      <p><strong>Contato:</strong> (11) 99999-9999</p>
      <p><strong>Email:</strong> contato@padocadoguspass.com</p>
      <a href="#" className={styles.instagram}>
        Instagram: @padocadoguspass
      </a>
    </div>

  </div>

  <div className={styles.copy}>
    © 2025 Padoca do Guspass — Todos os direitos reservados.
  </div>
</footer>
    )
}
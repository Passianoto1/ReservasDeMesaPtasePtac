import React from "react";
import styles from "../css/Home.module.css";
import Header from "./Header";
import Footer from "./Footer";
import fundoPadoca from "./padocadogusspass.jpg";

export default function Home() {
  return (
    <>
    <div 
      className={styles["home-container"]} 
      style={{ backgroundImage: `url(${fundoPadoca})` }}
    >
      <Header />

      <div className={styles["hero"]}>
        <h1 className={styles["hero-title"]}>Padoca do Guspass</h1>
      </div>
      <div className={styles["content"]}></div>
 
    </div>
         <Footer />
    </>
  );
}

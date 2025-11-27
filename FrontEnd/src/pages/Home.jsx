import React from "react";
import styles from "../css/Home.module.css";
import Header from "./Header";
import Footer from "./Footer";


export default function Home() {
  return (
    <div className={styles["home-container"]}>
      <Header/>

     <Footer/>
    </div>
  );

}
'use client';
import styles from '../../styles/pages/inicio.module.scss';
import GraficoTicketsClient from '../../components/Graficos/GraficoTicketsClient';

export default function Inicio() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col6}>
          <img src="/Logo-geticket.png" className={styles.logo}></img>
          <h1>Bienvenido a <label htmlFor="" className={styles.title}>GeTicket</label></h1>
          <p className={styles.subtitle}>Tu sistema de gestión de tickets rápido y eficiente</p>
        </div>
        <div className={styles.col6}>
          <GraficoTicketsClient />
        </div>
      </div>
    </div>
  )
}
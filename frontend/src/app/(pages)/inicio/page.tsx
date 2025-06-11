'use client';
import styles from '../../styles/pages/inicio.module.scss';
import { FaRocket } from 'react-icons/fa';
import GraficoTicketsClient from '../../components/Graficos/GraficoTicketsClient';

export default function Inicio() {
  return (
    <div className={styles.container}>
      <img src="/Logo-geticket.png" className={styles.logo}></img>
      {/* <FaRocket className={styles.icon} /> */}
      <h1 className={styles.title}>Bienvenido a GeTicket</h1>
      <p className={styles.subtitle}>Tu sistema de gestión de tickets rápido y eficiente</p>
      <GraficoTicketsClient />
    </div>
  );
}

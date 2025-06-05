'use client';
import styles from './inicio.module.scss';
import { FaRocket } from 'react-icons/fa';
import GraficoTicketsClient from '../../components/Graficos/GraficoTicketsClient';

export default function Inicio() {
  return (
    <div className={styles.container}>
      <FaRocket className={styles.icon} />
      <h1 className={styles.title}>Bienvenido a Geticket</h1>
      <p className={styles.subtitle}>Tu sistema de gestión de tickets rápido y eficiente</p>

      {        }
  <GraficoTicketsClient />
    </div>
  );
}

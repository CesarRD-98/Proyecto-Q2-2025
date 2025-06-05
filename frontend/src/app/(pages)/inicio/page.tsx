'use client';
import styles from './inicio.module.scss';
import { FaRocket } from 'react-icons/fa';
import GraficoTicketsClient from '../../components/Graficos/GraficoTicketsClient';

export default function Inicio() {
  return (
    <div className={styles.container}>
<<<<<<< HEAD
      <FaRocket className={styles.icon} />
      <h1 className={styles.title}>Bienvenido a Geticket</h1>
      <p className={styles.subtitle}>Tu sistema de gestión de tickets rápido y eficiente</p>

      {        }
  <GraficoTicketsClient />
=======
      <h1>Bienvenido a Geticket</h1>
      <h5>Probando commit</h5>
      <h2>Grupo #2</h2>
      <h5>Acciones rápidas</h5>
      <div className="">
        <button className='btn btn-secondary' onClick={ () => navegationPage("/inicio")}>Nuevo ticket</button>
        <button className='btn btn-secondary' onClick={ () => navegationPage("/tickets")}>Tickets</button>
        <button className='btn btn-secondary' onClick={ () => navegationPage("/reportes")}>Reportes</button>
      </div>
>>>>>>> origin/develop
    </div>
  );
}

'use client';
import Image from "next/image";
import styles from '../../styles/pages/inicio.module.scss';
import GraficoTicketsClient from '../../components/Graficos/GraficoTicketsClient';
import ProtectedRoute from "@/app/components/protectedRoute/protectedRoute";

export default function Inicio() {
  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col6}>
            <Image
              className={styles.logo}
              src="/Logo-geticket.png"
              alt="Logo GeTicket"
              width={612}
              height={612}
            />
            <h1>Bienvenido a <label htmlFor="" className={styles.title}>GeTicket</label></h1>
            <p className={styles.subtitle}>Tu sistema de gestión de tickets rápido y eficiente</p>
          </div>
          <div className={styles.col6}>
            <GraficoTicketsClient />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
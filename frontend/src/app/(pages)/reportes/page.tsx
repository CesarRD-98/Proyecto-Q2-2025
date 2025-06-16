'use client';
import ProtectedRoute from '@/app/components/protectedRoute/protectedRoute';
import styles from '../../styles/pages/reportes.module.scss';
import { useState } from 'react';
import DateFilter from '@/app/components/dataFilter/dataFilter';
import axios from 'axios';
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { MdAutorenew, MdFormatListBulleted } from "react-icons/md";
import { API_URL } from '@/app/API/api.url';

export default function ReportesPage() {
  const [tickets, setTickets] = useState<Record<string, number>>({});

  const getIcon = (estado: string) => {
    switch (estado) {
      case "pending":
        return <AiOutlineClockCircle size={32} color="#00ADF2" />;
      case "in_progress":
        return <MdAutorenew size={32} color="#EB6C0B" />;
      case "finalized":
        return <AiOutlineCheckCircle size={32} color="#189F27" />;
      case "cancelled":
        return <AiOutlineCloseCircle size={32} color="#D32F2F" />;
      default:
        return <MdFormatListBulleted size={32} color="#666666" />;
    }
  };

  const fetchTicketsByDateRange = async (start: string, end: string) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${API_URL}/reports?from=${start}&to=${end}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.data;
      console.log(data);

      setTickets(data);
      console.log(tickets);

    } catch (error) {
      console.error("Error al obtener tickets:", error);
    }
  };
  return (
    <ProtectedRoute>
      <div style={{ padding: "2rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Reportes</h2>
        <DateFilter onFilter={fetchTicketsByDateRange} />

        <div style={{ marginTop: "2rem", marginInline: "auto", textAlign: 'center' }}>
          <h3>Resultados:</h3>
          {tickets.length === 0 ? (
            <p>No hay tickets en el rango seleccionado.</p>
          ) : (
            <div className={styles.container}>
              {Object.entries(tickets).map(([estado, cantidad]) => (
                <div
                  className={`${styles.card} ${styles[estado.replace(/\s/g, "_")]}`}
                  key={estado}
                >
                  <div className={styles.icon}>{getIcon(estado)}</div>
                  <div className={styles.title}>{estado}</div>
                  <div className={styles.value}>{cantidad}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

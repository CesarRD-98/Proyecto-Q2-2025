'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaListAlt, FaChartBar, FaPlus, FaPaperclip } from 'react-icons/fa';
import NotificacionBell from '../notificacionBell/notificacionBell';
import UserIcon from '../userIcon/userIcon';
import styles from './navbar.module.scss';

export default function Navbar() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fechaCreacion = new Date().toISOString().split('T')[0]; // Fecha actual

    const nuevoTicket = {
      titulo,
      estado,
      prioridad,
      observaciones,
      fecha: fechaCreacion,
      archivoNombre: archivo ? archivo.name : null,
    };

    console.log('Nuevo Ticket:', nuevoTicket);

    // Reset formulario
    setTitulo('');
    setEstado('');
    setPrioridad('');
    setObservaciones('');
    setArchivo(null);

    // Cerrar modal
    setShowModal(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <Link href="/inicio" className={`${styles.navItem} ${pathname === '/inicio' ? styles.active : ''}`}>
            <FaHome style={{ marginRight: '6px' }} />
            Inicio
          </Link>
          <Link href="/tickets" className={`${styles.navItem} ${pathname === '/tickets' ? styles.active : ''}`}>
            <FaListAlt style={{ marginRight: '6px' }} />
            Tickets
          </Link>
          <Link href="/reportes" className={`${styles.navItem} ${pathname === '/reportes' ? styles.active : ''}`}>
            <FaChartBar style={{ marginRight: '6px' }} />
            Reportes
          </Link>
        </div>

        <div className={styles.navRight}>
          <button className={styles.actionBtn} onClick={() => setShowModal(true)}>
            <FaPlus style={{ marginRight: '6px' }} />
            Nuevo Ticket
          </button>
          <NotificacionBell />
          <UserIcon />
        </div>
      </nav>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Crear nuevo ticket</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />

              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              >
                <option value="">Estado</option>
                <option value="Abierto">Abierto</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Escalado">Escalado</option>
                <option value="Reabierto">Reabierto</option>
                <option value="Solucionado">Solucionado</option>
              </select>

              <select
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value)}
                required
              >
                <option value="">Prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>

              <textarea
                placeholder="Observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={3}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', width: '100%' }}
              ></textarea>

              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
                <FaPaperclip style={{ marginRight: '8px' }} />
                Adjuntar archivo
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)}
                />
              </label>

              <div className={styles.modalActions}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setShowModal(false)}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

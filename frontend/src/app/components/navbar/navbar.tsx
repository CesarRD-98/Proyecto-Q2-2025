'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaListAlt, FaChartBar, FaPlus } from 'react-icons/fa';
import NotificacionBell from '../notificacionBell/notificacionBell';
import UserIcon from '../userIcon/userIcon';
import styles from './navbar.module.scss';

export default function Navbar() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

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
<form>
  <input type="text" placeholder="Título" required />

  <select required>
    <option value="">Estado</option>
    <option value="Abierto">Abierto</option>
    <option value="En Progreso">En Progreso</option>
    <option value="Escalado">Escalado</option>
    <option value="Reabierto">Reabierto</option>
    <option value="Solucionado">Solucionado</option>
  </select>

  <select required>
    <option value="">Prioridad</option>
    <option value="Alta">Alta</option>
    <option value="Media">Media</option>
    <option value="Baja">Baja</option>
  </select>

  <input type="date" required />

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

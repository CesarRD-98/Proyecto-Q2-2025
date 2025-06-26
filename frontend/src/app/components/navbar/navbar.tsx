'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaListAlt, FaChartBar, FaPlus, FaUserPlus } from 'react-icons/fa';
import NotificacionBell from '../notificacionBell/notificacionBell';
import UserIcon from '../userIcon/userIcon';
import styles from '../../styles/components/navbar.module.scss';
import CreateTicket from '../createTicket/createTicket';
import CreateUser from '../createUser/createUser';
import { useLoginContext } from '@/app/providers/loginProvider';

export default function Navbar() {
  const pathname = usePathname();

  const { user } = useLoginContext();
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleUser, setIsVisibleUser] = useState(false);
  const [animationClass, setAnimationClass] = useState(styles.fadeIn);
  const [animationClassUser, setAnimationClassUser] = useState(styles.fadeIn);

  useEffect(() => {
    if (showModal) {
      setIsVisible(true); // monta el modal
      setAnimationClass(styles.fadeIn); // animación de entrada
    } else {
      setAnimationClass(styles.fadeOut); // animación de salida
      const timeout = setTimeout(() => setIsVisible(false), 300); // espera antes de desmontar
      return () => clearTimeout(timeout);
    }
  }, [showModal]);

  useEffect(() => {
    if (showUserModal) {
      setIsVisibleUser(true);
      setAnimationClassUser(styles.fadeIn);
    } else {
      setAnimationClassUser(styles.fadeOut);
      const timeout = setTimeout(() => setIsVisibleUser(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [showUserModal]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <Link href="/inicio" className={`${styles.navItem} ${pathname === '/inicio' ? styles.active : ''}`}>
            <FaHome size='20' />
            Inicio
          </Link>
          <Link href="/tickets" className={`${styles.navItem} ${pathname === '/tickets' ? styles.active : ''}`}>
            <FaListAlt size='20' />
            Tickets
          </Link>
          {user?.role !== 'user' && (
            <Link href="/reportes" className={`${styles.navItem} ${pathname === '/reportes' ? styles.active : ''}`}>
              <FaChartBar size='20' />
              Reportes
            </Link>
          )}
        </div>

        <div className={styles.navRight}>
          <button className='btn' onClick={() => setShowModal(true)}>
            <FaPlus style={{ marginRight: '6px' }} />
            Nuevo Ticket
          </button>

          {user?.role === 'admin' && (
            <button className='btn' onClick={() => setShowUserModal(true)} style={{ marginLeft: '8px', backgroundColor: '#0093D0' }}>
              <FaUserPlus style={{ marginRight: '6px' }} />
              Nuevo Usuario
            </button>
          )}
          <li><NotificacionBell /></li>
          <li className={styles.userIcon}> <UserIcon /></li>
        </div>
      </nav>

      {isVisible && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            className={`${styles.modal} ${animationClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.showModal}>
              <h2>Crear nuevo ticket</h2>
              <button type='button' className='btn' onClick={() => setShowModal(false)}>X</button>
            </div>
            <CreateTicket />
          </div>
        </div>
      )}

      {/* Modal de crear usuario */}
      {user?.role === 'admin' && showUserModal && (
        <div className={styles.modalOverlay} onClick={() => setShowUserModal(false)}>
          <div
            className={`${styles.modal} ${animationClassUser}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.showModal}>
              <h2>Crear nuevo usuario</h2>
              <button type='button' className='btn' onClick={() => setShowUserModal(false)}>X</button>
            </div>
            <CreateUser />
          </div>
        </div>
      )}
    </>
  );
}

'use client'
import React from 'react'
import styles from './navbar.module.scss'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import NotificationBell from '../notificacionBell/notificacionBell';


export default function Navbar() {

    const router = useRouter()

    function logout() {
        router.push('/')
    }

    return (
        <nav className={styles.navbar}>
            <div>
                <h3>Geticket - Gestión de Tickets</h3>
            </div>
            <ul>
                <li><a href="/inicio">Tickets</a></li>
                <li><a href="/reportes">Reportes</a></li>
                <li><NotificationBell /></li>
                <li onClick={logout}> Usuario <FontAwesomeIcon icon={faCircleUser} size='xl'/> </li>
            </ul>
        </nav>
    )
}

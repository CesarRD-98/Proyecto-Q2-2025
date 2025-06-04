'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './userIcon.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


export default function UserIcon() {
    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const router = useRouter()

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
                console.log("Click fuera de menu");
            }
        }

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]);

    function logout() {
        router.push('/')
    }

    return (
        <div className={styles.container} ref={menuRef}>
            <div className={styles.iconContainer} onClick={() => setShowMenu(!showMenu)}>
                <FontAwesomeIcon icon={faCircleUser} size="xl" />
            </div>

            {showMenu && (
                <div className={styles.menu}>
                    <h4>Usuario Admin</h4>
                    <ul className={styles.ul}>
                        <li>Pedir cambio de contraseña</li>
                        <li onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión</li>
                    </ul>
                </div>
            )}
        </div>
    )
}

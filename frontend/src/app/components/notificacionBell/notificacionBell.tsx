'use client'
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "./notificacion.module.scss";

export default function NotificationBell() {
    const [showMenu, setShowMenu] = useState(false);
    const [notifications, setNotifications] = useState([
        "Nuevo mensaje de Juan",
        "Actualización del sistema",
        "Recordatorio de reunión a las 3 PM",
        "Nuevo comentario en tu ticket",
    ]);

    const menuRef = useRef<HTMLDivElement>(null);

    // Manejar clics fuera del menú
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

    return (
        <div className={styles.container} ref={menuRef}>
            <div className={styles.iconContainer} onClick={() => setShowMenu(!showMenu)}>
                <FontAwesomeIcon icon={faBell} size="xl" />
                {notifications.length > 0 && (
                    <span className={styles.badge}>{notifications.length}</span>
                )}
            </div>

            {showMenu && (
                <div className={styles.menu}>
                    <h4>Notificaciones</h4>
                    {notifications.length > 0 ? (
                        <ul className={styles.ul}>
                            {notifications.map((notif, index) => (
                                <li key={index}>{notif}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay notificaciones nuevas</p>
                    )}
                </div>
            )}
        </div>
    );
}

'use client'
import React, { useState } from 'react'
import styles from "../../styles/components/loginForm.module.scss";
import { useRouter } from 'next/navigation';

export default function Login() {

    const router = useRouter()

    const [usuario, setUsuario] = useState<string>("")
    const [contrasena, setContrasena] = useState<string>("")
    const [message, setMessage] = useState<string>("")


    function verifyLogin(event: React.FormEvent) {
        event.preventDefault()

        if (usuario === "" || contrasena === "") {
            setMessage("Por favor, ingrese su usuario y contraseña.")
            return
        }

        setMessage("")
        router.push('/inicio')
        // alert('Ups error 404 - Estamos en mantenimiento...')
    }



    return (
        <>
            <div className={styles.containerLogin}>
                <form action="">
                    <h3 className="">Inicio de sesión</h3>
                    <div className={styles.containerLogo}>
                        <img src="/Logo-geticket.png"></img>
                        <h2>GeTicket</h2>
                    </div>
                    <div className={styles.container}>
                        <div>
                            <label className='form-label'>Usuario:</label>
                            <input
                                className='form-control'
                                type="text"
                                placeholder="Ingrese su nombre de usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required />
                        </div>
                        <div>
                            <label className='form-label'>Contraseña:</label>
                            <input
                                className='form-control'
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required />
                        </div>
                        {message !== "" && <p>{message}</p>}
                        <div>
                            <button type='submit' className='btn btn-primary w-100' onClick={(e) => verifyLogin(e)}>Ingresar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

'use client'
import React, { useState } from 'react'
import styles from "./loginForm.module.scss";
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
                    <div className={styles.container}>
                        <div>
                            <input
                                className='form-control'
                                type="text"
                                placeholder="Usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required />
                        </div>
                        <div>
                            <input
                                className='form-control'
                                type="password"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required />
                        </div>
                        {message !== "" && <p>{message}</p>}
                        <div>
                            <button type='submit' className='btn btn-primary' onClick={(e)=> verifyLogin(e)}>Ingresar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

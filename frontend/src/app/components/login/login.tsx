'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import styles from "../../styles/components/loginForm.module.scss";
import { useRouter } from 'next/navigation';
import { useLoginContext } from '@/app/providers/loginProvider';

export default function Login() {

    const router = useRouter()
    const { authUser } = useLoginContext()

    const [correo, setUsuario] = useState<string>("")
    const [contrasena, setContrasena] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const isEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    async function verifyLogin(event: React.FormEvent) {
        event.preventDefault()

        if (correo === "" || contrasena === "") {
            setMessage("Por favor, ingrese su correo y contraseña.")
            return
        }

        if (!isEmail(correo)) return setMessage('Ingrese un correo válido')

        const { success, message, status, role } = await authUser(correo, contrasena)

        if (!success && status === 401) {
            setMessage(message)
            return
        }

        setMessage("")
        if (role === 'admin') router.push('/inicio')
        if (role === 'user') router.push('/tickets')
        if (role === 'technician') router.push('/tickets')
    
    }

    return (
        <>
            <div className={styles.containerLogin}>
                <form action="">
                    <h3 className="">Inicio de sesión</h3>
                    <div className={styles.containerLogo}>
                        <div className="">
                            <Image
                                src="/Logo-geticket.png"
                                alt="Logo GeTicket"
                                width={120}
                                height={120}
                            />
                        </div>
                        <h2>GeTicket</h2>
                    </div>
                    <div className={styles.container}>
                        <div>
                            <label className='form-label'>Correo:</label>
                            <input
                                className='form-control'
                                type="text"
                                placeholder="Ingrese su correo electrónico"
                                value={correo}
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

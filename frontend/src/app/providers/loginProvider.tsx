'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ChildrenModel } from '../models/childrenModel'
import { LoginContext } from '../contexts/loginContext'
import axios from 'axios'
import { User } from '../models/userModel'
import { useRouter } from 'next/navigation'
import { LoginResponse } from '../models/responseLogin'

const _url: string = 'http://localhost:5000'

export default function LoginProvider({ children }: ChildrenModel) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const authUser = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await axios.post(`${_url}/auth/login`, { email, password })

            if (response.status === 201) {
                const { access_token, user } = response.data

                setUser(user)

                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user))

                return { success: true, message: 'Inicio de sesión exitoso', status: 201, role: user.role }
            }

            return { success: false, message: 'Ocurrio un problema al iniciar sesión', status: 400}
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const { status } = error.response
                    if (status === 401) {
                        console.warn('Credenciales inválidas')
                        return { success: false, message: 'Credenciales inválidas', status: 401}
                    }
                }
            }
            return {success: false, message: 'No hubo respuesta del servidor'}
        }
    }

    const logout = () => {
        router.push('/')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <LoginContext.Provider value={{ user, authUser, logout }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => {
    const context = useContext(LoginContext)
    if (!context) {
        throw new Error('UseLoginContext debe usarse dentro de un LoginProvider')
    }
    return context
}

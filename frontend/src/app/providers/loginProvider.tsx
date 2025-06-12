'use client'
import React, { useContext, useState } from 'react'
import { ChildrenModel } from '../models/childrenModel'
import { LoginContext } from '../contexts/loginContext'
import axios from 'axios'
import { User } from '../models/userModel'

const _url: string = 'http://localhost:5000'

export default function LoginProvider({ children }: ChildrenModel) {

    const [token, setToken] = useState<string>('')
    const [user, setUser] = useState<User | null>(null)

    const authUser = async (email: string, password: string): Promise<any> => {
        try {
            const response = await axios.post(`${_url}/auth/login`, { email, password })

            if (response.status === 201) {
                const { access_token, user } = response.data

                setToken(access_token);
                setUser(user)

                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user))

                return ({ success: true, message: 'Inicio de sesion exitoso', status: 201, role: user.role });
            }

            return ({ success: false, message: 'Ocurrio un problema al iniciar sesión', status: 400, role: null })
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const { status } = error.response
                    if (status === 401) {
                        console.warn('Credenciales inválidas')
                        return ({ success: false, message: 'Credenciales inválidas', status: 401, role: null })
                    }
                } else {
                    console.error('No hubo respuesta del servidor')
                }
            }
        }
    }

    return (
        <LoginContext.Provider value={{ token, user, authUser }}>{children}</LoginContext.Provider>
    )
}

export const useLoginContext = () => {
    const context = useContext(LoginContext)
    if (!context) {
        throw new Error('UseLoginContext debe usarse dentro de un LoginProvider')
    }
    return context
}

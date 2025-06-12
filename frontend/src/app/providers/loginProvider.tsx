import React, { useContext, useState } from 'react'
import { ChildrenModel } from '../models/childrenModel'
import { LoginContext } from '../contexts/loginContext'
import axios from 'axios'

const _url: string = 'http://localhost:5000'

export default function LoginProvider({ children }: ChildrenModel) {

    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const authUser = async () => {
        try {
            const response = await axios.post(`${_url}/auth`, { user, password }, {
                headers: {'Content-Type': 'application/json'}
            })

            if (response.status === 200) {
                setToken(response.data.token)
                console.log(response.data);
                // localStorage.setItem('token', token ? token : '')
            }

        } catch (error) {
            console.error('Error al iniciar sesion', error);
        }
    }

    return (
        <LoginContext.Provider value={{ token, authUser }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => {
    const context = useContext(LoginContext)
    if (!context) {
        return new Error('UseLoginContext necesita de un proveedor')
    }
    return context
}

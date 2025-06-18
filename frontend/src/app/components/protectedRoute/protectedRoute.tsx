import { ChildrenModel } from '@/app/models/childrenModel'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ProtectedRoute({ children }: ChildrenModel) {

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) router.push('/')
    }, [])
    return (
        <>{children}</>
    )
}

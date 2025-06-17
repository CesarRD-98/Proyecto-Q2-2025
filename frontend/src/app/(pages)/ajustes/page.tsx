'use client'
import ProtectedRoute from '@/app/components/protectedRoute/protectedRoute'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
        <div className="">Ajustes</div>
    </ProtectedRoute>
  )
}

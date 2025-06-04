'use client'
import React from 'react'
import styles from './inicio.module.scss'
import { useRouter } from 'next/navigation'

export default function page() {

  const router = useRouter()

  function navegationPage(path: string) {
    router.push(path)
  }


  return (
    <div className={styles.container}>
      <h1>Bienvenido a Geticket</h1>
      <h5>Acciones rápidas</h5>
      <div className="">
        <button className='btn btn-secondary' onClick={ () => navegationPage("/inicio")}>Nuevo ticket</button>
        <button className='btn btn-secondary' onClick={ () => navegationPage("/tickets")}>Tickets</button>
        <button className='btn btn-secondary' onClick={ () => navegationPage("/reportes")}>Reportes</button>
      </div>
    </div>
  )
}

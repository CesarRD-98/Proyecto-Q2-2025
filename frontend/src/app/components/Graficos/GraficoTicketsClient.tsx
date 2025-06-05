'use client';
import dynamic from 'next/dynamic';

const Grafico = dynamic(() => import('./GraficoTickets'), { ssr: false });

export default function GraficoTicketsClient() {
  return <Grafico />;
}

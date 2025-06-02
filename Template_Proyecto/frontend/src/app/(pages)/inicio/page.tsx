// app/components/TicketTable.tsx
"use client";
import React from "react";
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';


// se debe crear en models 
interface Ticket{
  id: number;
  titulo: string;
  estado: string;
  prioridad: string;
  fecha: string;
};

// Datos de ejemplo
const data: Ticket[] = [
  { id: 1001, titulo: "Error en login", estado: "Abierto", prioridad: "Alta", fecha: "2025-06-01" },
  { id: 1002, titulo: "No carga perfil", estado: "Cerrado", prioridad: "Media", fecha: "2025-05-30" },
  { id: 1003, titulo: "Nueva funcionalidad", estado: "Pendiente", prioridad: "Baja", fecha: "2025-05-28" },
];

// Columnas definidas para MRT
const columns: MRT_ColumnDef<Ticket>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "titulo", header: "Título" },
  { accessorKey: "estado", header: "Estado" },
  { accessorKey: "prioridad", header: "Prioridad" },
  { accessorKey: "fecha", header: "Fecha" },
];

export default function TicketTable() {
  return <MaterialReactTable columns={columns} data={data} />;
}

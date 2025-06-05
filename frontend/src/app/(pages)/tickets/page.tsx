'use client';

import React from "react";
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

interface Ticket {
    id: number;
    titulo: string;
    estado: string;
    prioridad: string;
    fecha: string;
}

const data: Ticket[] = [
    { id: 1001, titulo: "Error en login", estado: "Abierto", prioridad: "Alta", fecha: "2025-06-01" },
    { id: 1002, titulo: "No carga perfil", estado: "En Progreso", prioridad: "Media", fecha: "2025-05-30" },
    { id: 1003, titulo: "Nueva funcionalidad", estado: "Escalado", prioridad: "Baja", fecha: "2025-05-28" },
    { id: 1004, titulo: "Problema con notificaciones", estado: "Reabierto", prioridad: "Alta", fecha: "2025-05-25" },
    { id: 1005, titulo: "Error en la base de datos", estado: "Solucionado", prioridad: "Alta", fecha: "2025-05-20" },
    { id: 1006, titulo: "Actualización de seguridad", estado: "Abierto", prioridad: "Media", fecha: "2025-05-15" },
    { id: 1007, titulo: "Mejora en la interfaz", estado: "Escalado", prioridad: "Baja", fecha: "2025-05-10" },
    { id: 1008, titulo: "Problema de rendimiento", estado: "Abierto", prioridad: "Alta", fecha: "2025-05-05" },
    { id: 1009, titulo: "Integración con API externa", estado: "En Progreso", prioridad: "Media", fecha: "2025-04-30" },
    { id: 1010, titulo: "Error de validación de formulario", estado: "Solucionado", prioridad: "Baja", fecha: "2025-04-25" },
    { id: 1011, titulo: "Impresora Industrial No IMPRIME", estado: "Abierto", prioridad: "Baja", fecha: "2025-01-03" },
    { id: 1012, titulo: "Falla en Sistema SAP", estado: "Reabierto", prioridad: "Baja", fecha: "2025-04-25" },
    { id: 1013, titulo: "PC de Oficina no Enciende", estado: "En Progreso", prioridad: "Baja", fecha: "2025-02-06" },
    { id: 1014, titulo: "Pinpad no Cobra", estado: "Abierto", prioridad: "Baja", fecha: "2025-07-18" }

];

const handleEdit = (ticket: Ticket) => {
  console.log("Editar:", ticket);
};

const handleDelete = (ticket: Ticket) => {
  console.log("Eliminar:", ticket);
};

const columns: MRT_ColumnDef<Ticket>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "titulo", header: "Título" },
  { accessorKey: "estado", header: "Estado" },
  { accessorKey: "prioridad", header: "Prioridad" },
  { accessorKey: "fecha", header: "Fecha" },
  {
    accessorKey: "acciones",
    header: "Acciones",
    Cell: ({ row }) => (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.3rem 0.7rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onClick={() => handleEdit(row.original)}
        >
          Editar
        </button>
        <button
          style={{
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.3rem 0.7rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onClick={() => handleDelete(row.original)}
        >
          Eliminar
        </button>
      </div>
    ),
  },
];

export default function TicketsPage() {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      muiTableProps={{
        sx: {
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      }}
      muiTableBodyRowProps={{
        hover: true,
        sx: {
          '&:hover': {
            backgroundColor: '#f9f9f9',
          },
        },
      }}
    />
  );
}

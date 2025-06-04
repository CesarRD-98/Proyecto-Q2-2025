"use client";
import React from "react";
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';


// se debe crear en models 
interface Ticket {
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
    { id: 1004, titulo: "Problema con notificaciones", estado: "Abierto", prioridad: "Alta", fecha: "2025-05-25" },
    { id: 1005, titulo: "Error en la base de datos", estado: "Cerrado", prioridad: "Alta", fecha: "2025-05-20" },
    { id: 1006, titulo: "Actualización de seguridad", estado: "Pendiente", prioridad: "Media", fecha: "2025-05-15" },
    { id: 1007, titulo: "Mejora en la interfaz", estado: "Abierto", prioridad: "Baja", fecha: "2025-05-10" },
    { id: 1008, titulo: "Problema de rendimiento", estado: "Cerrado", prioridad: "Alta", fecha: "2025-05-05" },
    { id: 1009, titulo: "Integración con API externa", estado: "Pendiente", prioridad: "Media", fecha: "2025-04-30" },
    { id: 1010, titulo: "Error de validación de formulario", estado: "Abierto", prioridad: "Baja", fecha: "2025-04-25" },
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
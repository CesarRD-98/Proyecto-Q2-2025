'use client';

import React, { useEffect, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('access_token'); // 🔑 Cargar token dinámicamente

      if (!token) {
        console.warn('No se encontró token. Debes iniciar sesión.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/tickets', {
          headers: {
            Authorization: token
          }
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error al cargar tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleEdit = (ticket: Ticket) => {
    console.log('Editar:', ticket);
  };

  const handleDelete = (ticket: Ticket) => {
    console.log('Eliminar:', ticket);
  };

  const columns: MRT_ColumnDef<Ticket>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'title', header: 'Título' },
    { accessorKey: 'description', header: 'Descripción' },
    { accessorKey: 'status', header: 'Estado' },
    {
      accessorKey: 'createdAt',
      header: 'Fecha',
      Cell: ({ cell }) => {
        const fecha = new Date(cell.getValue<string>());
        return fecha.toLocaleDateString();
      },
    },
    {
      accessorKey: 'acciones',
      header: 'Acciones',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.4rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onClick={() => handleEdit(row.original)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            style={{
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.4rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onClick={() => handleDelete(row.original)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Gestión de Tickets</h1>

      <MaterialReactTable
        columns={columns}
        data={tickets}
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
    </div>
  );
}

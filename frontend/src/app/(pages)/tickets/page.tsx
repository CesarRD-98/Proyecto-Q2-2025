'use client';

import React, { useEffect, useState, useContext } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProtectedRoute from '@/app/components/protectedRoute/protectedRoute';
import { LoginContext } from '@/app/contexts/loginContext';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { user } = useContext(LoginContext);
  const [filters, setFilters] = useState<any>({});

  const fetchTickets = async (params: any = {}) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:3000/tickets', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          perPage,
          ...params
        }
      });

      const { data, totalPages, perPage: backendPerPage } = response.data;
      setTickets(data);
      setTotalPages(totalPages);
      setPerPage(backendPerPage);
    } catch (error) {
      console.error('Error al cargar tickets:', error);
    }
  };

  useEffect(() => {
    fetchTickets(filters);
  }, [page]);

  const handleEdit = async (ticket: Ticket) => {
    const { value: newStatus } = await Swal.fire({
      title: 'Editar Status del Ticket',
      input: 'select',
      inputOptions: {
        pending: 'Pending',
        in_progress: 'In Progress',
        finalized: 'Finalized',
        cancelled: 'Cancelled'
      },
      inputValue: ticket.status,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    });

    if (newStatus) {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        await axios.put(
          `http://localhost:3000/tickets/${ticket.id}`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchTickets(filters);
        Swal.fire('¡Actualizado!', 'El status fue actualizado.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el status.', 'error');
      }
    }
  };

  const handleDelete = async (ticket: Ticket) => {
    const confirmResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el ticket.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmResult.isConfirmed) {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        await axios.delete(`http://localhost:3000/tickets/${ticket.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTickets(filters);
        Swal.fire('Eliminado', 'El ticket ha sido eliminado.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el ticket.', 'error');
      }
    }
  };

  const handleFilter = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Filtrar Tickets',
      html:
        '<input id="swal-desc" class="swal2-input" placeholder="Descripción (opcional)">' +
        '<div style="display: flex; justify-content: space-between; gap: 10px; width: 100%;">' +
        '  <div style="display: flex; flex-direction: column; width: 48%;">' +
        '    <label for="swal-from" style="font-size: 12px; margin-bottom: 4px; text-align: left;">Desde</label>' +
        '    <input type="date" id="swal-from" class="swal2-input" style="width: 100%; margin: 0;">' +
        '  </div>' +
        '  <div style="display: flex; flex-direction: column; width: 48%;">' +
        '    <label for="swal-to" style="font-size: 12px; margin-bottom: 4px; text-align: left;">Hasta</label>' +
        '    <input type="date" id="swal-to" class="swal2-input" style="width: 100%; margin: 0;">' +
        '  </div>' +
        '</div>' +
        '<select id="swal-status" class="swal2-input" style="margin-top: 10px;">' +
        '  <option value="">-- Status --</option>' +
        '  <option value="pending">Pending</option>' +
        '  <option value="in_progress">In Progress</option>' +
        '  <option value="finalized">Finalized</option>' +
        '  <option value="cancelled">Cancelled</option>' +
        '</select>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Aplicar Filtro',
      preConfirm: () => {
        return {
          description: (document.getElementById('swal-desc') as HTMLInputElement).value,
          status: (document.getElementById('swal-status') as HTMLSelectElement).value,
          from: (document.getElementById('swal-from') as HTMLInputElement).value,
          to: (document.getElementById('swal-to') as HTMLInputElement).value
        };
      }
    });

    if (formValues) {
      const newFilters: any = {};
      if (formValues.description) newFilters.description = formValues.description;
      if (formValues.status) newFilters.status = formValues.status;
      if (formValues.from) newFilters.from = formValues.from;
      if (formValues.to) newFilters.to = formValues.to;

      setFilters(newFilters);
      setPage(1);
      fetchTickets({ ...newFilters, page: 1 });
    }
  };

  const columns: MRT_ColumnDef<Ticket>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'title', header: 'Título' },
    { accessorKey: 'description', header: 'Descripción' },
    { accessorKey: 'status', header: 'Estado' },
    { accessorKey: 'createdAt', header: 'Fecha de Creación' },
    { accessorKey: 'user.name', header: 'Creado por' },
    {
      header: 'Acciones',
      Cell: ({ row }) => {
        const ticket = row.original;
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => handleEdit(ticket)}
              title="Editar"
            >
              <FontAwesomeIcon icon={faEdit} style={{ color: '#007bff' }} />
            </button>
            <button
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => handleDelete(ticket)}
              title="Eliminar"
            >
              <FontAwesomeIcon icon={faTrash} style={{ color: '#dc3545' }} />
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <ProtectedRoute>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Página de Tickets</h1>
     
        <div style={{ marginBottom: '15px', textAlign: 'right', paddingRight: '20px' }}>
          <button
            onClick={handleFilter}
            style={{
              background: 'linear-gradient(90deg, #007bff, #00bcd4)',
              color: 'white',
              padding: '10px 22px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2910/2910766.png"
              alt="Filtrar"
              style={{ width: '20px', marginRight: '8px' }}
            />
            Filtrar Tickets
          </button>
        </div>
      
      <MaterialReactTable
        columns={columns}
        data={tickets}
        enablePagination
        manualPagination
        rowCount={totalPages * perPage}
        onPaginationChange={({ pageIndex }) => {
          setPage(pageIndex + 1); // MRT usa index desde 0
        }}
        state={{ pagination: { pageIndex: page - 1, pageSize: perPage } }}
        enableGlobalFilter={false}
        enableColumnActions={false}
      />
    </ProtectedRoute>
  );
}

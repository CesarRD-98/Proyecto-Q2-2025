'use client';

import React, { useEffect, useState, useContext } from 'react';
import { MaterialReactTable, MRT_PaginationState, type MRT_ColumnDef } from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProtectedRoute from '@/app/components/protectedRoute/protectedRoute';
import { LoginContext } from '@/app/contexts/loginContext';
import styles from '../../styles/pages/table.module.scss';
import { useGetTickets } from '@/app/providers/getTicketsProvider';
import { useTicketRefresh } from '@/app/providers/ticketRefreshProvider';
import { API_URL } from '@/app/API/api.url';
import { Ticket } from '@/app/models/ticketModel';
import { format } from 'date-fns';
import { notifyFrontend } from '@/app/utils/notificationManager';



export default function TicketsPage() {
  const { getTickets } = useGetTickets()
  const { refresh } = useTicketRefresh()
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [rowCount, setRowCount] = useState(0)
  const { user } = useContext(LoginContext);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })


  const fetchTickets = async (params: any = {}) => {
    const fullParams = {
      ...params,
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize
    };
    
    const { data, total } = await getTickets(fullParams);
    setTickets(data || []);
    setRowCount(total || 0);
  }

  useEffect(() => {
    fetchTickets();
  }, [pagination, refresh]);



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

    if (newStatus && newStatus !== ticket.status) {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        await axios.put(
          `${API_URL}/tickets/${ticket.id}`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchTickets();

        const message = `Ticket "${ticket.title}" actualizado a ${newStatus.replace(/_/g, ' ')}`;
        notifyFrontend(message);
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
        await axios.delete(`${API_URL}/tickets/${ticket.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTickets();
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
        '<input id="swal-desc" class="form-control" placeholder="Descripción (opcional)">' +
        '<div style="display: flex; justify-content: space-between; gap: 10px; width: 100%;">' +
        '  <div style="display: flex; flex-direction: column; width: 48%;">' +
        '    <label for="swal-from" style="font-size: 14px; margin-bottom: 4px; text-align: left;">Desde</label>' +
        '    <input type="date" id="swal-from" class="form-control" style="width: 100%; margin: 0;">' +
        '  </div>' +
        '  <div style="display: flex; flex-direction: column; width: 48%;">' +
        '    <label for="swal-to" style="font-size: 14px; margin-bottom: 4px; text-align: left;">Hasta</label>' +
        '    <input type="date" id="swal-to" class="form-control" style="width: 100%; margin: 0;">' +
        '  </div>' +
        '</div>' +
        '<select id="swal-status" class="form-control" style="margin-top: 10px;">' +
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
      const filters: any = {};
      if (formValues.description) filters.description = formValues.description;
      if (formValues.status) filters.status = formValues.status;
      if (formValues.from) filters.from = formValues.from;
      if (formValues.to) filters.to = formValues.to;
      fetchTickets(filters);
    }
  };

  const handleInfo = async (ticket: Ticket) => {
    const formattedDate = format(new Date(ticket.createdAt), 'dd/MM/yyyy HH:mm');
    const status = ticket.status.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());

    await Swal.fire({
      title: `<strong>Detalles del Ticket #${ticket.id}</strong>`,
      html: `
      <div style="text-align: left; font-size: 15px; padding: 10px; line-height: 1.6;">
        <p><span style="font-weight: bold;">📝 Título:</span> ${ticket.title}</p>
        <p><span style="font-weight: bold;">📄 Descripción:</span> ${ticket.description}</p>
        <p><span style="font-weight: bold;">📌 Estado:</span> 
          <span style="padding: 3px 8px; background-color: #f0f0f0; border-radius: 5px; font-weight: 600;">${status}</span>
        </p>
        <p><span style="font-weight: bold;">🏢 Área:</span> ${ticket.area?.name || 'No asignada'}</p>
        <p><span style="font-weight: bold;">👤 Usuario:</span> ${ticket.user?.name} (<a href="mailto:${ticket.user?.email}" style="text-decoration: none; color: #007bff;">${ticket.user?.email}</a>)</p>
        <p><span style="font-weight: bold;">📅 Fecha de creación:</span> ${formattedDate}</p>
      </div>
    `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
      width: 600
    });
  };


  const columns: MRT_ColumnDef<Ticket>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'title', header: 'Título' },
    { accessorKey: 'description', header: 'Descripción' },
    {
      accessorKey: 'status',
      header: 'Estado',
      Cell: ({ cell }) => {
        const status = cell.getValue<string>();

        return (
          <span className={`${styles.statusBadge} ${styles[status]}`}>
            {status.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
          </span>
        );
      }
    },
    {
      accessorKey: 'createdAt',
      header: 'Fecha de Creación',
      Cell: ({ cell }) => {
        const rawDate = cell.getValue<string>();
        const formattedDate = format(new Date(rawDate), 'dd/MM/yyyy');
        return formattedDate;
      }
    },
    {
      header: 'Acciones',
      Cell: ({ row }) => {
        const ticket = row.original;
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18 }}
              onClick={() => handleInfo(ticket)}
              title="Ver detalles"
            >
              <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#0093D0' }} />
            </button>
            {user?.role !== 'user' && (
              <>
                <button
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18 }}
                  onClick={() => handleEdit(ticket)}
                  title="Editar"
                >
                  <FontAwesomeIcon icon={faEdit} style={{ color: '#189F27' }} />
                </button>
                <button
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16 }}
                  onClick={() => handleDelete(ticket)}
                  title="Eliminar"
                >
                  <FontAwesomeIcon icon={faTrash} style={{ color: '#D32F2F' }} />
                </button>
              </>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <ProtectedRoute>
      <h2 style={{ textAlign: 'center', margin: '22px' }}>Página de Tickets</h2>
      {user?.role === 'admin' || user?.role === 'technician' ? (
        <div style={{ marginLeft: 32 }}>
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
      ) : null}
      <div style={{ padding: '2rem' }}>
        <MaterialReactTable
          columns={columns}
          data={tickets}
          manualPagination
          rowCount={rowCount}
          state={{ pagination }}
          onPaginationChange={setPagination}
          enableGlobalFilter={false}
          enableColumnFilters={false}
        />

      </div>
      <div style={{ marginTop: '2rem' }}></div>

    </ProtectedRoute>
  );
}
'use client';
import { useEffect, useMemo, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LabelProps } from 'recharts';
import styles from '../../styles/components/GraficoTickets.module.scss';
import { useGetTickets } from '@/app/providers/getTicketsProvider';
import { Ticket } from '@/app/models/ticketModel';
import { useLoginContext } from '@/app/providers/loginProvider';

const STATUS_COLORS: Record<string, string> = {
  'Finalized': '#A8D5BA',
  'Cancelled': '#F38181',
  'Pending': '#FAD02C',
  'In progress': '#A1C6EA',
};

const formatStatusName = (status: string) =>
  status.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  if (!percent || percent < 0.08) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius! + (outerRadius! - innerRadius!) * 0.5;
  const x = cx! + radius * Math.cos(-midAngle! * RADIAN);
  const y = cy! + radius * Math.sin(-midAngle! * RADIAN);

  return (
    <text x={x} y={y} fill="#333" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function GraficoTickets() {
  const { getTickets } = useGetTickets();
  const { user } = useLoginContext()
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await getTickets({ all: true });
      setTickets(data || []);
    };
    load();

    const timeout = setTimeout(() => setShowLegend(true), 800);
    return () => clearTimeout(timeout);
  }, [getTickets]);

  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    tickets.forEach(({ status }) => {
      counts[status] = (counts[status] || 0) + 1;
    });

    return Object.entries(counts).map(([status, count]) => ({
      name: formatStatusName(status),
      value: count,
    }));
  }, [tickets]);

  const canViewGraph = user?.role !== 'user'

  return (
    <div className={styles.wrapper}>
      <h3>Estado de tickets</h3>
      {canViewGraph ? (
        <>
          <ResponsiveContainer width={250} height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={65}
                labelLine={false}
                label={renderCustomizedLabel}
                dataKey="value"
                isAnimationActive
                animationDuration={2000}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: '0.8rem' }}
                formatter={(value: number, name: string) => [`${value} tickets`, name]}
              />
            </PieChart>
          </ResponsiveContainer>

          <ul className={`${styles.legend} ${showLegend ? styles.visible : ''}`}>
            {statusData.map((entry, index) => (
              <li key={index}>
                <span
                  className={styles.colorBox}
                  style={{ backgroundColor: STATUS_COLORS[entry.name] }}
                ></span>
                <strong>{entry.name}</strong>: {entry.value}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.message}>
          Este resumen solo está disponible para personal técnico o administradores.
        </p>
      )}

    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../../styles/components/GraficoTickets.module.scss';
import { useGetTickets } from '@/app/providers/getTicketsProvider';
import { Ticket } from '@/app/models/ticketModel';

const COLORS = ['#FAD02C', '#A1C6EA', '#F38181', '#A8D5BA'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    percent > 0.08 && (
      <text x={x} y={y} fill="#333" textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {(percent * 100).toFixed(0)}%
      </text>
    )
  );
};

export default function GraficoTickets() {

  const { getTickets } = useGetTickets()
  const [showLegend, setShowLegend] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    const load = async () => {
      const { data } = await getTickets({ all: true})
      setTickets(data || [])
    }
    load()
    const timeout = setTimeout(() => setShowLegend(true), 800);
    return () => clearTimeout(timeout);
  }, []);


  const statusCount = tickets.reduce<Record<string, number>>((acc, t) => {
    const status = t.status
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  const statusData = Object.entries(statusCount).map(([status, count]) => ({
    name: status.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
    value: count
  }))

  return (
    <div className={styles.wrapper}>
      <h3>Estado de tickets</h3>
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
            isAnimationActive={true}
            animationDuration={1000}
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            <span className={styles.colorBox} style={{ backgroundColor: COLORS[index] }}></span>
            <strong>{entry.name}</strong>: {entry.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

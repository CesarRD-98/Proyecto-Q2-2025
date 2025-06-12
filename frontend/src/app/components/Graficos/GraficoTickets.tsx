'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../../styles/components/GraficoTickets.module.scss';

const data = [
  { name: 'Abierto', value: 5 },
  { name: 'En Progreso', value: 3 },
  { name: 'Escalado', value: 2 },
  { name: 'Reabierto', value: 2 },
  { name: 'Solucionado', value: 2 },
];

// Colores suaves y diferenciables
const COLORS = ['#FAD02C', '#A1C6EA', '#F38181', '#A8D5BA', '#B083AA'];

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
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLegend(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width={250} height={250}>
        <PieChart>
          <Pie
            data={data}
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
            {data.map((entry, index) => (
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
        {data.map((entry, index) => (
          <li key={index}>
            <span className={styles.colorBox} style={{ backgroundColor: COLORS[index] }}></span>
            <strong>{entry.name}</strong>: {entry.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

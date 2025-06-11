'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import styles from '../../styles/components/GraficoTickets.module.scss';

const data = [
  { name: 'Abierto', value: 5 },
  { name: 'En Progreso', value: 3 },
  { name: 'Escalado', value: 2 },
  { name: 'Reabierto', value: 2 },
  { name: 'Solucionado', value: 2 },
];

const COLORS = ['#E3E300', '#00E500', '#E80000', '#ff9d00', '#000080'];

export default function GraficoTickets() {
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLegend(true);
    }, 3300); // animación delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.wrapper}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={true}
          animationBegin={1500}
          animationDuration={1800}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

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

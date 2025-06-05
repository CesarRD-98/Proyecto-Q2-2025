'use client';
import dynamic from 'next/dynamic';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Abierto', value: 29 },
  { name: 'En Progreso', value: 40 },
  { name: 'Escalado', value: 161 },
  { name: 'Reabierto', value: 1 },
  { name: 'Solucionado', value: 1092 },
];

const COLORS = ['#00C49F', '#FF8042', '#FFBB28', '#00BFFF', '#00D664'];

export default function GraficoTickets() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h3>Resumen de Tickets</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive
          animationBegin={2000}         //  espera para iniciar
          animationDuration={2000}      //  animación suave
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

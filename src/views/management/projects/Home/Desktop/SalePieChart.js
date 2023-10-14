import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#D3D2D2', 'url(#colorUv)'];

export default function SalePieChart({ all, some }) {
  const data = [
    { name: 'Group A', value: all - some },
    { name: 'Group B', value: some }
  ];

  return (
    <PieChart width={300} height={200}>
      <defs>
        <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0.08%" stopColor="#00AAB5" stopOpacity={0.9} />
          <stop offset="99.99%" stopColor="#00346D" stopOpacity={0.9} />
        </linearGradient>
      </defs>
      <text
        x={150}
        y={110}
        dy={8}
        textAnchor="middle"
        fill={'#00346D'}
        style={{ fontSize: '40px', fontWeight: 700 }}
      >
        {`${Math.round((some / all) * 100)}%`}
      </text>
      <Pie
        data={data}
        cx={140}
        cy={100}
        innerRadius={55}
        outerRadius={80}
        // fill="#8884d8"
        // paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

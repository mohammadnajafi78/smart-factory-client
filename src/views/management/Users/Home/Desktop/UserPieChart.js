import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 300 },
  { name: 'Group B', value: 400 }
];
const COLORS = ['#D3D2D2', 'url(#colorUv)'];

export default class UserPieChart extends PureComponent {
  render() {
    return (
      <PieChart width={300} height={250} onMouseEnter={this.onPieEnter}>
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
          {'76%'}
        </text>
        <Pie
          data={data}
          cx={140}
          cy={100}
          innerRadius={70}
          outerRadius={100}
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
}

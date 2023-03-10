import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from 'recharts';
import httpService from 'src/utils/httpService';
import MomentEn from 'src/utils/MomentEn';
import { API_BASE_URL } from 'src/utils/urls';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   }
// ];

export default function SaleBarChart2({ data }) {
  return (
    <BarChart
      width={480}
      height={250}
      data={data}
      margin={{
        top: 5,
        right: 10,
        left: 60,
        bottom: 5
      }}
    >
      <defs>
        <linearGradient id="colorUv3" x1="0" y1="1" x2="1" y2="1">
          <stop offset="0.99%" stopColor="#00AAB5" stopOpacity={0.99} />
          <stop offset="99.5%" stopColor="#00346D" stopOpacity={0.9} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="user" />
      <YAxis tick={{ dx: -30 }} domain={[0, 'dataMax + 10']} />
      {/* <Tooltip /> */}
      {/* <Legend /> */}
      <Bar dataKey="count" fill="url(#colorUv3)" barSize={30} />
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
  );
}
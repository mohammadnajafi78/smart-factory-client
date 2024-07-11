import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

// const COLORS = ['#0d3579', 'url(#colorUv)'];
const COLORS = [
  '#0d3579',
  '#5660f3',
  '#ffb000',
  '#517293',
  '#3498db',
  '#a5231b'
];

// const data = [
//   {
//     name: 'Group A',
//     value: 2400
//   },
//   {
//     name: 'Group B',
//     value: 4567
//   },
//   {
//     name: 'Group C',
//     value: 1398
//   },
//   {
//     name: 'Group D',
//     value: 9800
//   },
//   {
//     name: 'Group E',
//     value: 3908
//   },
//   {
//     name: 'Group F',
//     value: 4800
//   }
// ];

export default function UserPieChart({ allUser }) {
  const [data, setData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // const data = [
  //   { name: 'Group A', value: allUser - completed },
  //   { name: 'Group B', value: completed }
  // ];

  useEffect(() => {
    // axios.get('http://171.22.26.55:8000/get_pi_data').then(res => {
    //   if (res.status === 200) {
    //     setData(res.data);
    //     console.log('Res', res);
    //   }
    // });
    fetch('http://82.115.25.219:8000/get_pi_data')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    // <PieChart width={300} height={250}>
    //   <defs>
    //     <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
    //       <stop offset="0.08%" stopColor="#00AAB5" stopOpacity={0.9} />
    //       <stop offset="99.99%" stopColor="#00346D" stopOpacity={0.9} />
    //     </linearGradient>
    //   </defs>
    //   {/* <text
    //     x={150}
    //     y={110}
    //     dy={8}
    //     textAnchor="middle"
    //     fill={'#00346D'}
    //     style={{ fontSize: '40px', fontWeight: 700 }}
    //   >
    //     {`${Math.round((completed / allUser) * 100)}%`}
    //   </text> */}
    //   <Pie
    //     data={data}
    //     cx={140}
    //     cy={100}
    //     innerRadius={70}
    //     outerRadius={100}
    //     // fill="#8884d8"
    //     // paddingAngle={5}
    //     dataKey="value"
    //   >
    //     {data.map((entry, index) => (
    //       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //     ))}
    //   </Pie>
    // </PieChart>
    <PieChart width={730} height={280}>
      <defs>
        <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0.08%" stopColor="#0d3579" stopOpacity={0.9} />
          <stop offset="99.99%" stopColor="#5660f3" stopOpacity={0.9} />
        </linearGradient>
      </defs>
      {/* <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#0d3579"
        label
      /> */}
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        // innerRadius={70}
        outerRadius={100}
        // fill="#8884d8"
        // paddingAngle={5}
        dataKey="value"
        nameKey="name"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend style={{}} />
    </PieChart>
  );
}

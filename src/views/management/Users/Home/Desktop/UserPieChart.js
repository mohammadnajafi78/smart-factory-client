import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

const COLORS = ['#D3D2D2', 'url(#colorUv)'];

export default function UserPieChart({ allUser }) {
  const [completed, setCompleted] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const data = [
    { name: 'Group A', value: allUser - completed },
    { name: 'Group B', value: completed }
  ];

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/management/user/user_count/?profile_is_complete=True`
      )
      .then(res => {
        if (res.status === 200) {
          setCompleted(res.data[0].count);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }, []);

  return (
    <PieChart width={300} height={250}>
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
        {`${Math.round((completed / allUser) * 100)}%`}
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

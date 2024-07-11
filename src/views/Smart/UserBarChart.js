import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import httpService from 'src/utils/httpService';
import MomentEn from 'src/utils/MomentEn';
import { API_BASE_URL } from 'src/utils/urls';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function UserBarChart() {
  // const [data, setData] = useState();
  const { enqueueSnackbar } = useSnackbar();
  // const today = new Date();
  // const yesterday = new Date(today);
  // yesterday.setDate(yesterday.getDate() - 7);

  // const tomorrow = new Date(today);
  // tomorrow.setDate(tomorrow.getDate() + 1);

  // useEffect(() => {
  //   httpService
  //     .get(
  //       `${API_BASE_URL}/api/management/user/user_count/?create_date__lt=${MomentEn(
  //         tomorrow
  //       )}&create_date__gt=${MomentEn(yesterday)}&period=daily`
  //     )
  //     .then(res => {
  //       if (res.status == 200) {
  //         setData(res.data);
  //       }
  //     })
  //     .catch(ex => {
  //       if (ex.response.status === 417) {
  //         enqueueSnackbar(ex.response.data.error, { variant: 'error' });
  //       } else {
  //         enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
  //           variant: 'error'
  //         });
  //       }
  //     });
  // }, []);

  return (
    <BarChart
      width={550}
      height={280}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 30,
        bottom: 5
      }}
    >
      <defs>
        <linearGradient id="colorUv2" x1="0" y1="1" x2="1" y2="1">
          <stop offset="0.5%" stopColor="#0d3579" stopOpacity={0.9} />
          <stop offset="95.93%" stopColor="#5660f3" stopOpacity={0.9} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="uv" />
      <YAxis tick={{ dx: -30 }} domain={[0, 'dataMax + 10']} />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="pv" fill="url(#colorUv2)" barSize={40} />
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
  );
}
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import InputLabel from 'src/components/Desktop/InputLabel';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentEn from 'src/utils/MomentEn';
import SalePieChart from './SalePieChart';
import SaleBarChart from './SaleBarChart';
import SaleBarChart2 from './SaleBarChart2';

export default function HomeDesktop() {
  const [orderCounts, setOrderCounts] = useState(null);
  const [deliveryOrders, setDeliveryOrders] = useState(null);
  const [confirmOrders, setConfirmOrders] = useState(null);
  const [userSend, setUserSend] = useState(null);
  const [userReceived, setUserReceived] = useState(null);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 7);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  function getOrderCounts() {
    httpService
      .get(`${API_BASE_URL}/api/management/project/get_project_count_state`)
      .then(res => {
        if (res.status === 200) {
          console.log('rees', res);
          setOrderCounts(res.data);
        }
      });
  }

  function getLastWeekConfirmOrders() {
    httpService
      .get(
        `${API_BASE_URL}/api/management/project/get_project_count/?create_date__lt=${MomentEn(
          tomorrow
        )}&create_date__gt=${MomentEn(yesterday)}&period=daily`
      )
      .then(res => {
        if (res.status == 200) {
          setDeliveryOrders(res.data);
        }
      });
  }

  function getLastWeekDeliveryOrders() {
    httpService
      .get(
        `${API_BASE_URL}/api/management/project/get_project_count/?create_date__lt=${MomentEn(
          tomorrow
        )}&create_date__gt=${MomentEn(yesterday)}&period=daily`
      )
      .then(res => {
        if (res.status == 200) {
          setConfirmOrders(res.data);
        }
      });
  }

  function getCountUserSend() {
    httpService
      .get(`${API_BASE_URL}/api/management/project/get_project_count_user`)
      .then(res => {
        if (res.status === 200) {
          setUserSend(res.data);
        }
      });
  }

  function getCountUserReceived() {
    httpService
      .get(`${API_BASE_URL}/api/management/project/get_project_count_user`)
      .then(res => {
        if (res.status === 200) {
          setUserReceived(res.data);
        }
      });
  }

  useEffect(() => {
    getOrderCounts();
    getLastWeekConfirmOrders();
    getLastWeekDeliveryOrders();
    getCountUserSend();
    getCountUserReceived();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '20px',
        gap: '16px'
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '40px 20px 20px',

              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            {orderCounts && (
              <SalePieChart
                all={orderCounts.total}
                some={orderCounts.confirmed}
              />
            )}
            <InputLabel style={{ color: '#6685A7' }}>
              پروژه های تایید شده
            </InputLabel>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '40px 20px 20px',

              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            {orderCounts && (
              <SalePieChart
                all={orderCounts.total}
                some={orderCounts.waiting}
              />
            )}
            <InputLabel style={{ color: '#6685A7' }}>
              پروژه های در انتظار تایید
            </InputLabel>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px 20px 20px',
              gap: '33px',
              backgroundColor: 'white',
              borderRadius: '8px',
              minHeight: '280px'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D', fontSize: '40px' }}>
              {orderCounts && orderCounts.total}
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              تعداد کل پروژه های ثبت شده
            </InputLabel>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '20px 30px',

              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            <InputLabelHeader
              style={{
                color: '#00346D',
                fontSize: '16px',
                marginBottom: '20px',
                fontWeight: 700
              }}
            >
              پروژه های ثبت شده هفته گذشته
            </InputLabelHeader>
            <SaleBarChart data={confirmOrders} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '20px 30px',

              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            <InputLabelHeader
              style={{
                color: '#00346D',
                fontSize: '16px',
                marginBottom: '20px',
                fontWeight: 700
              }}
            >
              پروژه های ارسالی به دفتر فروش هفته گذشته
            </InputLabelHeader>
            <SaleBarChart data={deliveryOrders} />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '20px 30px',

              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            <InputLabelHeader
              style={{
                color: '#00346D',
                fontSize: '16px',
                marginBottom: '20px',
                fontWeight: 700
              }}
            >
              کاربران با بیشترین پروژه ثبت شده
            </InputLabelHeader>
            <SaleBarChart2 data={userSend} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '20px 30px',

              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            <InputLabelHeader
              style={{
                color: '#00346D',
                fontSize: '16px',
                marginBottom: '20px',
                fontWeight: 700
              }}
            >
              کاربران با بیشترین پروژه ثبت شده
            </InputLabelHeader>
            <SaleBarChart2 data={userReceived} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

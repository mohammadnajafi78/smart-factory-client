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
import { useSnackbar } from 'notistack';

export default function HomeDesktop() {
  const [orderCounts, setOrderCounts] = useState(null);
  const [deliveryOrders, setDeliveryOrders] = useState(null);
  const [confirmOrders, setConfirmOrders] = useState(null);
  const [userSend, setUserSend] = useState(null);
  const [userReceived, setUserReceived] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 7);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  function getOrderCounts() {
    httpService
      .get(`${API_BASE_URL}/api/management/order/get_order_count_state`)
      .then(res => {
        if (res.status === 200) {
          console.log('rees', res);
          setOrderCounts(res.data);
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
  }

  function getLastWeekConfirmOrders() {
    httpService
      .get(
        `${API_BASE_URL}/api/management/order/get_order_count/?create_date__lt=${MomentEn(
          tomorrow
        )}&create_date__gt=${MomentEn(yesterday)}&period=daily`
      )
      .then(res => {
        if (res.status == 200) {
          setDeliveryOrders(res.data);
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
  }

  function getLastWeekDeliveryOrders() {
    httpService
      .get(
        `${API_BASE_URL}/api/management/order/get_order_count/?create_date__lt=${MomentEn(
          tomorrow
        )}&create_date__gt=${MomentEn(
          yesterday
        )}&period=daily&supply_by=SALE_OFFICE`
      )
      .then(res => {
        if (res.status == 200) {
          setConfirmOrders(res.data);
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
  }

  function getCountUserSend() {
    httpService
      .get(
        `${API_BASE_URL}/api/management/order/get_order_count_user?group=ordered`
      )
      .then(res => {
        if (res.status === 200) {
          setUserSend(res.data);
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
  }

  function getCountUserReceived() {
    httpService
      .get(
        `${API_BASE_URL}/api/management/order/get_order_count_user?group=supplied`
      )
      .then(res => {
        if (res.status === 200) {
          setUserReceived(res.data);
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
              سفارشات تایید شده
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
              سفارشات در انتظار تایید
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
              تعداد کل سفارشات دریافتی
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
              سفارشات ثبت شده هفته گذشته
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
              سفارشات ارسالی به دفتر فروش هفته گذشته
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
              کاربران با بیشترین سفارش ارسالی
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
              کاربران با بیشترین سفارش دریافتی
            </InputLabelHeader>
            <SaleBarChart2 data={userReceived} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

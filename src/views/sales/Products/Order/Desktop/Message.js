import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, Drawer, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import SaleCategory from 'src/assets/img/saleCategory.svg';
import OrderOK from 'src/assets/img/orderOk.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import useSaleOrder from 'src/hooks/useSaleOrder';
import MomentFa from 'src/utils/MomentFa';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function Message(props) {
  const history = useHistory();
  const order = props.location.state;
  const [factor, setFactor] = useState(null);

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/orders/get_pi/?order_num=${props.location.state.order_num}`
      )
      .then(res => {
        if (res.status === 200) {
          setFactor(res.data.files.filter(f => f.subject === 'PI')[0]?.url);
        }
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px',
            justifyContent: 'space-between',
            height: 'inherit',
            width: '500px',
            backgroundColor: 'white',
            borderRadius: '8px'
          }}
        >
          {order && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <img src={OrderOK} style={{ margin: '20px' }} />
              <InputLabelHeader
                style={{ fontSize: '18px', fontWeight: 700, color: '#00346D' }}
              >
                سفارش شما با موفقیت ثبت شد
              </InputLabelHeader>
              <InputLabelHeader
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#00346D',
                  marginTop: '30px'
                }}
              >
                {`${order.final_price} `}
              </InputLabelHeader>
              <Box sx={{ width: '100%', mt: '40px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2
                  }}
                >
                  <InputLabel
                    sx={{
                      color: '#6685A7',
                      fontSize: '16px',
                      fontWeight: '400'
                    }}
                  >
                    شماره سفارش
                  </InputLabel>
                  <InputLabel
                    sx={{
                      color: '#00346D',
                      fontSize: '16px',
                      fontWeight: '400'
                    }}
                  >
                    {order.order_num}
                  </InputLabel>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2
                  }}
                >
                  <InputLabel
                    sx={{
                      color: '#6685A7',
                      fontSize: '16px',
                      fontWeight: '400'
                    }}
                  >
                    تامین کننده
                  </InputLabel>
                  <InputLabel
                    sx={{
                      color: '#00346D',
                      fontSize: '16px',
                      fontWeight: '400'
                    }}
                  >
                    {order.supplier_info.first_name +
                      ' ' +
                      order.supplier_info.last_name}
                  </InputLabel>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2
                  }}
                >
                  <InputLabel
                    sx={{
                      color: '#6685A7',
                      fontSize: '16px',
                      fontWeight: '400'
                    }}
                  >
                    نحوه ارسال
                  </InputLabel>
                  <InputLabel
                    sx={{
                      color: '#00346D',
                      fontSize: '16px',
                      fontWeight: '400'
                    }}
                  >
                    {order.delivery_detail.delivery_type_detail.label}
                  </InputLabel>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2
                  }}
                >
                  <InputLabel
                    sx={{
                      color: '#6685A7',
                      fontSize: '16px',
                      fontWeight: '400'
                    }}
                  >
                    زمان ارسال
                  </InputLabel>
                  <InputLabel
                    sx={{
                      color: '#00346D',
                      fontSize: '16px',
                      fontWeight: '400'
                    }}
                  >
                    {MomentFa(order.delivery_detail.start_date)}
                  </InputLabel>
                </Box>
              </Box>
            </Box>
          )}
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <ConfirmButton disabled={false} variant="outlined" type={'button'}>
              {'اشتراک پیش فاکتور'}
            </ConfirmButton>
            <a
              href={factor}
              download
              style={{ textDecoration: 'none', width: '100%' }}
              target="_blank"
            >
              <ConfirmButton variant="outlined">
                {'دانلود پیش فاکتور'}
              </ConfirmButton>
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
}

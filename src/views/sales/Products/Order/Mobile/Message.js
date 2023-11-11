import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import OrderOK from 'src/assets/img/orderOk.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import { ArrowRight } from 'react-feather';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/orders/get_pi/?order_num=${props.location.state.order_num}`
      )
      .then(res => {
        if (res.status === 200) {
          setFactor(res.data.files.filter(f => f.subject === 'PI')[0]?.url);
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
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px',
          justifyContent: 'space-between',
          height: 'inherit'
        }}
      >
        <Box
          sx={{ display: 'inline-flex' }}
          onClick={() => {
            history.push('/sale/products');
          }}
        >
          <ArrowRight color="#335D8A" width={'15px'} />
          <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
            بازگشت
          </InputLabel>
        </Box>
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
          <ConfirmButton
            disabled={false}
            variant="outlined"
            // onClick={() => {
            //   history.push('/identity');
            // }}
            type={'button'}
          >
            {'اشتراک پیش فاکتور'}
          </ConfirmButton>
          <a
            href={factor}
            download
            target="_blank"
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <ConfirmButton
              variant="outlined"
              // onClick={() => history.push('/sale/products/order/2')}
            >
              {'دانلود پیش فاکتور'}
            </ConfirmButton>
          </a>
        </Box>
      </Box>
    </>
  );
}

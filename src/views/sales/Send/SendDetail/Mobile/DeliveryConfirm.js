import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider
} from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ArrowRight } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Close from 'src/assets/img/close2.svg';
import Done from 'src/assets/img/done2.svg';
import ProductListSelectable from './ProductListSelectable';

export default function DeliveryConfirm(props) {
  const [file, setFile] = useState();
  const [payment, setPayment] = useState(null);
  const [selected, setSelected] = useState(null);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const history = useHistory();
  const data = props.location.state;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // if (selected === 'yes') {
    //   httpService.get(`${API_BASE_URL}/`);
    // }
  }, [selected]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px',
          justifyContent: 'space-between',
          height: 'inherit',
          gap: '10px'
        }}
      >
        <Box>
          <Box
            sx={{ display: 'inline-flex' }}
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowRight color="#335D8A" width={'15px'} />
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              بازگشت
            </InputLabel>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              gap: '10px'
            }}
          >
            <Button
              key={selected + 1}
              sx={{
                background: selected == 'no' ? '#FEEEEC' : '#FFF',
                border: '1px solid #F4777C',
                borderRadius: '8px',
                width: '100%'
              }}
              onClick={() => {
                setSelected('no');
              }}
            >
              <img src={Close} />
              <InputLabel style={{ color: '#F14950' }}>
                ناقص تحویل گرفتم
              </InputLabel>
            </Button>
            <Button
              key={selected + 2}
              sx={{
                background: selected == 'yes' ? '#DDF5F6' : '#FFF',
                border: '1px solid #00AAB5',
                borderRadius: '8px',
                width: '100%'
              }}
              onClick={() => {
                setSelected('yes');
              }}
            >
              <img src={Done} />
              <InputLabel style={{ color: '#00AAB5' }}>تحویل گرفتم</InputLabel>
            </Button>
          </Box>

          <Divider />

          {selected === 'no' && (
            <Box sx={{ mt: 3 }}>
              <InputLabel>سفارشاتی که ناقص بودند را مشخص کنید:</InputLabel>
              <ProductListSelectable orderNum={data.order_num} />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            gap: '10px',
            mb: 2
          }}
        >
          <ConfirmButton
            disabled={false}
            variant="outlined"
            style={{ width: '150px' }}
            onClick={() => {
              history.goBack();
            }}
            type={'button'}
          >
            {'لغو'}
          </ConfirmButton>
          <ConfirmButton
            style={{ width: '150px' }}
            disabled={selected == null}
            loading={isLoading}
            onClick={() => {
              setLoading(true)
              httpService
                .post(`${API_BASE_URL}/api/orders/update_order_state/`, {
                  order_num: data.order_num,
                  order_action: selected === 'yes' ? 'Approve' : 'Reject',
                  state: selected === 'yes' ? 'Complete' : 'Incomplete'
                })
                .then(res => {
                  setLoading(false)
                  if (res.status === 200) {
                    history.push('/sale/send');
                  }
                });
            }}
          >
            {'ثبت'}
          </ConfirmButton>
        </Box>
      </Box>
    </>
  );
}

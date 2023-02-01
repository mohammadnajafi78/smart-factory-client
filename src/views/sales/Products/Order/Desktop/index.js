import React, { useEffect, useState } from 'react';
import Products from './Products';
import Location from './Location';
import Delivery from './Deleivery';
import Message from './Message';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import { ChevronRight } from 'react-feather';
import { useHistory } from 'react-router-dom';
import useSaleOrder from 'src/hooks/useSaleOrder';

export default function OrderMobile(props) {
  const [data, setData] = useState(props.location.pathname.split('/')[4]);
  const history = useHistory();
  const { order, getOrder } = useSaleOrder();

  useEffect(() => {
    setData(props.location.pathname.split('/')[4]);
  });
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      {data == 2 || data == 3 || data == undefined ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginTop: '70px',
            padding: '20px',
            marginLeft: '140px'
          }}
        >
          <Box
            sx={{
              width: '100%',
              padding: '40px 40px 30px',
              backgroundColor: 'white',
              height: '100%'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box
                  sx={{ display: 'inline-flex' }}
                  onClick={() => {
                    history.push('/sale/products/');
                  }}
                >
                  <ChevronRight color="#335D8A" />
                  <InputLabel
                    style={{
                      color: '#335D8A',
                      fontWeight: 400,
                      fontSize: '16px'
                    }}
                  >
                    لیست محصولات
                  </InputLabel>
                </Box>
                <Box>
                  {data == 3 ? <Delivery order={order} /> : <Location />}
                </Box>
              </Grid>
              <Grid item xs={4}>
                {order && <Products order={order} />}
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '70px',
            padding: '20px',
            marginLeft: '140px'
          }}
        >
          <Message {...props} />
        </Box>
      )}
    </>
  );
}

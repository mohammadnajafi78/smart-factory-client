import { Box, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import useSaleSearch from 'src/hooks/useSaleSearch';
import ReceivedList from './ReceivedList';
import { useSnackbar } from 'notistack';

export default function ProductsMobile() {
  const [openCategory, setOpenCategory] = useState();
  const [category, setCategory] = useState();
  const [products, setProducts] = useState(null);
  const { result, searched } = useSaleSearch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .post(`${API_BASE_URL}/api/management/order/get_received_orders/`)
      .then(res => {
        if (res.status === 200) {
          setProducts(res.data);
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
    <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      {products && (
        <ReceivedList products={products} setProducts={setProducts} />
      )}
    </Box>
  );
}

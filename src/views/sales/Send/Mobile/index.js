import { Box, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import useSaleSearch from 'src/hooks/useSaleSearch';
import SendList from './SendList';

export default function ProductsMobile() {
  const [openCategory, setOpenCategory] = useState();
  const [category, setCategory] = useState();
  const [products, setProducts] = useState(null);
  const { result, searched } = useSaleSearch();

  useEffect(() => {
    httpService.post(`${API_BASE_URL}/api/orders/get_orders/`).then(res => {
      if (res.status === 200) {
        setProducts(res.data);
      }
    });
  }, []);

  return (
    <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      {products && <SendList products={products} setProducts={setProducts} />}
    </Box>
  );
}

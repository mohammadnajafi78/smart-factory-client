import { Box, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import useSaleSearch from 'src/hooks/useSaleSearch';
import TripartiteList from './TripartiteList';

export default function TripartiteMobile() {
  const [openCategory, setOpenCategory] = useState();
  const [category, setCategory] = useState();
  const [Tripartite, setTripartite] = useState(null);
  const { result, searched } = useSaleSearch();

  useEffect(() => {
    httpService
      .post(`${API_BASE_URL}/api/orders/get_thirdparty_orders/`)
      .then(res => {
        if (res.status === 200) {
          setTripartite(res.data);
        }
      });
  }, []);

  return (
    <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      {Tripartite && (
        <TripartiteList Tripartite={Tripartite} setTripartite={setTripartite} />
      )}
    </Box>
  );
}

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import FilterButton from 'src/components/Desktop/Button/Filter';
import AwardItem from './ProductItem';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { resolveConfig } from 'prettier';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import ShopProducts from 'src/assets/img/shopProducts.svg';
import ProductItem from './ProductItem';
import useSaleOrder from 'src/hooks/useSaleOrder';
import { useHistory } from 'react-router-dom';
import useSaleSearch from 'src/hooks/useSaleSearch';

export default function ProductsList({ selected, setSelected }) {
  const [all, setAll] = useState(null);
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState('All');
  const { order, getOrder } = useSaleOrder();
  const { products, searched, getProducts } = useSaleSearch();
  const history = useHistory();

  useEffect(() => {
    getOrder();
    // httpService.get(`${API_BASE_URL}/api/products/type/?ref=shop`).then(res => {
    //   if (res.status === 200) {
    //     setAll(res.data);
    //   }
    // });
    getProducts();
  }, []);

  return (
    <Box sx={{ padding: '10px 20px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <InputLabel>
          نتیجه فیلتر {products ? products.length : 0} محصول
        </InputLabel>
        <ConfirmButton
          style={{
            backgroundColor: '#00346D',
            width: '170px',
            boxShadow: '0px -4px 6px rgba(205, 205, 205, 0.25)',
            borderRadius: '8px'
          }}
          onClick={() => history.push('/sale/products/order')}
        >
          <img src={ShopProducts} style={{ marginLeft: '4px' }} />
          <InputLabel style={{ color: 'white', cursor: 'pointer' }}>
            ثبت سفارش
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              margin: '0px 5px',
              background: '#CCD6E2',
              color: '#00346D',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            {order ? order.count : 0}
          </Box>
        </ConfirmButton>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridColumnGap: '15px',
          gridRowGap: '15px',
          width: '100%',
          // padding: '0px 20px',
          overflow: 'auto',
          height: '70vh',
          marginTop: '20px'
        }}
      >
        {/* {searched
          ? result.map((item, key) => {
              return <ProductItem data={item} />;
            })
          : all &&
            all.map((item, key) => {
              return <ProductItem data={item} />;
            })} */}
        {products &&
          products.map((item, key) => {
            return <ProductItem data={item} />;
          })}
      </Box>
    </Box>
  );
}

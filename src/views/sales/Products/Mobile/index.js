import { Box, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CategoryButton from 'src/components/Mobile/Button/Category';
import BasketSale from 'src/assets/img/basketSale.svg';
import ProductsList from './ProductList';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import CategoryDrawer from './CategoryDrawer';
import SubCategoryDrawer from './SubCategoryDrawer';
import useSaleSearch from 'src/hooks/useSaleSearch';
import { useHistory } from 'react-router';
import useSaleOrder from 'src/hooks/useSaleOrder';

export default function ProductsMobile() {
  const [openCategory, setOpenCategory] = useState();
  const [category, setCategory] = useState();
  // const [products, setProducts] = useState(null);
  const { products, searched, getProducts } = useSaleSearch();
  const history = useHistory();
  const { order, getOrder } = useSaleOrder();

  useEffect(() => {
    getProducts();
    getOrder();
    httpService
      .get(`${API_BASE_URL}/api/products/category/get_category_list?ref=shop`)
      .then(res => {
        if (res.status === 200) {
          setCategory(res.data);
        }
      });
  }, []);

  return (
    <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <CategoryButton onClick={() => setOpenCategory(true)}>
            دسته
          </CategoryButton>
          {/* <CategoryButton onClick={() => setSubCategory(true)}>
            زیر دسته
          </CategoryButton> */}
        </Box>
        <CategoryButton onClick={() => history.push('/sale/products/order')}>
          <img
            src={BasketSale}
            style={{ width: '25px', height: '25px', margin: 0 }}
          />
          {order && order.count > 0 && (
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
              {order.count}
            </Box>
          )}
        </CategoryButton>
      </Box>

      {/* {(products || searched) && (
        <ProductsList
          products={searched ? result : products}
          setProducts={setProducts}
        />
      )} */}
      {products && (
        <ProductsList
          products={searched ? result : products}
          // setProducts={setProducts}
        />
      )}

      {category && (
        <CategoryDrawer
          openCategory={openCategory}
          setOpenCategory={setOpenCategory}
          data={category}
          // setProducts={setProducts}
        />
      )}
      {/* {subCategory && (
        <SubCategoryDrawer
          subCategory={subCategory}
          setSubCategory={setSubCategory}
        />
      )} */}
    </Box>
  );
}

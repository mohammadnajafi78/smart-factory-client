import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ProductsMobile from './Mobile';
import ProductsDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Products(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <ProductsMobile /> : <ProductsDesktop />}</>;
}

export default Products;

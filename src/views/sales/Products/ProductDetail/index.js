import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ProductDetailMobile from './Mobile';
import ProductDetailDesktop from './Desktop';

function ProductDetail(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <ProductDetailMobile {...props} />
      ) : (
        <ProductDetailDesktop {...props} />
      )}
    </>
  );
}

export default ProductDetail;

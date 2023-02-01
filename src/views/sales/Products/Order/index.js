import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import OrderMobile from './Mobile';
import OrderDesktop from './Desktop';

function Order(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? <OrderMobile {...props} /> : <OrderDesktop {...props} />}
    </>
  );
}

export default Order;

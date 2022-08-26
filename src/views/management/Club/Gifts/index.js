import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import GiftsDesktop from './Desktop';
import GiftsMobile from './Mobile';

function Gifts(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  // return <>{mobileDevice ? <GiftsMobile /> : <GiftsDesktop />}</>;
  return <GiftsDesktop />;
}

export default Gifts;

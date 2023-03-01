import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ReceivedDesktop from './Desktop';
import ReceivedMobile from './Mobile';

function Received(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <ReceivedDesktop />;
}

export default Received;

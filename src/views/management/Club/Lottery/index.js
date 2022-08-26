import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import LotteryDesktop from './Desktop';
import LotteryMobile from './Mobile';

function Lottery(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  // return <>{mobileDevice ? <LotteryMobile /> : <LotteryDesktop />}</>;
  return <LotteryDesktop />;
}

export default Lottery;

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import SendMobile from './Mobile';
import SendDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Send(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <SendMobile /> : <SendDesktop />}</>;
}

export default Send;

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import RequestMobile from './Mobile';
import RequestDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Request(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <RequestMobile /> : <RequestDesktop />}</>;
}

export default Request;

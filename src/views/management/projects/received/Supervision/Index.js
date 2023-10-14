import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
// import ReceivedMobile from './Mobile';
import Supervision from './Desktop/Index';
import { useParams } from 'react-router-dom';

function Received(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? '<Supervision />' : <Supervision />}</>;
}

export default Received;

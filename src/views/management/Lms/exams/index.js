import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
// import ReceivedMobile from './Mobile';
import Exams from './desktop/Index';
import { useParams } from 'react-router-dom';

function Received(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? '<Mobile Exmas />' : <Exams />}</>;
}

export default Received;

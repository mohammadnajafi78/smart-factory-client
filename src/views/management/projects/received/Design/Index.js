import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
// import ReceivedMobile from './Mobile';
import ReceivedDesignDesktop from './Desktop/Index';
import { useParams } from 'react-router-dom';

function Index(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? '<ReceivedDesignDesktop />' : <ReceivedDesignDesktop />}
    </>
  );
}

export default Index;

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import HomeDesktop from './Desktop';

function Home(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <HomeDesktop />;
}

export default Home;

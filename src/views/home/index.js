import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import HomeMobile from './Mobile';
import HomeDesktop from './Desktop';

function Home(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <HomeMobile /> : <HomeDesktop />}</>;
}

export default Home;

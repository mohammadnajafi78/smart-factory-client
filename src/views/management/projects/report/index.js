import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Report from './Desktop';

function Home(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <Report />;
}

export default Home;

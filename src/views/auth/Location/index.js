import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import LocationMobile from './Mobile';
import LocationDesktop from './Desktop';

function Location() {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <LocationMobile /> : <LocationDesktop />}</>;
}

export default Location;

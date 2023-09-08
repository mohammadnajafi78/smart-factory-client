import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import MapInfoMobile from './Mobile';
import MapInfoDesktop from './Desktop';

function MapInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <MapInfoMobile {...props} />
      ) : (
        <MapInfoDesktop {...props} />
      )}
    </>
  );
}

export default MapInfo;

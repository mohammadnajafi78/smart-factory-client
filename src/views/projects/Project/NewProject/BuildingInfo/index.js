import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import BuildingInfoMobile from './Mobile';
import BuildingInfoDesktop from './Desktop';

function BuildingInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <BuildingInfoMobile {...props} />
      ) : (
        <BuildingInfoDesktop {...props} />
      )}
    </>
  );
}

export default BuildingInfo;

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import TechnicalInfoMobile from './Mobile';
import TechnicalInfoDesktop from './Desktop';

function TechnicalInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <TechnicalInfoMobile {...props} />
      ) : (
        <TechnicalInfoDesktop {...props} />
      )}
    </>
  );
}

export default TechnicalInfo;

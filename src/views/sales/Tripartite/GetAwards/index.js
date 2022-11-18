import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import GetAwardsMobile from './Mobile';
import GetAwardsDesktop from './Desktop';

function GetAwards(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <GetAwardsMobile {...props} />
      ) : (
        <GetAwardsDesktop {...props} />
      )}
    </>
  );
}

export default GetAwards;

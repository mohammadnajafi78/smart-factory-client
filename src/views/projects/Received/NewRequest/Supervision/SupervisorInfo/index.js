import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import SupervisorInfoMobile from './Mobile';
import SupervisorInfoDesktop from './Desktop';

function SupervisorInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <SupervisorInfoMobile {...props} />
      ) : (
        <SupervisorInfoDesktop {...props} />
      )}
    </>
  );
}

export default SupervisorInfo;

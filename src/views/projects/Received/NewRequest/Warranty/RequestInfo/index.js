import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import RequestInfoMobile from './Mobile';
import RequestInfoDesktop from './Desktop';

function RequestInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <RequestInfoMobile {...props} />
      ) : (
        <RequestInfoDesktop {...props} />
      )}
    </>
  );
}

export default RequestInfo;

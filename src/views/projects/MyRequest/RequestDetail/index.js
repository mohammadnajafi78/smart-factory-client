import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import RequestDetailMobile from './Mobile';
import RequestDetailDesktop from './Desktop';

function RequestDetail(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <RequestDetailMobile {...props} />
      ) : (
        <RequestDetailDesktop {...props} />
      )}
    </>
  );
}

export default RequestDetail;

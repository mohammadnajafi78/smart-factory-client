import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import SendDetailMobile from './Mobile';
import SendDetailDesktop from './Desktop';

function SendDetail(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <SendDetailMobile {...props} />
      ) : (
        <SendDetailDesktop {...props} />
      )}
    </>
  );
}

export default SendDetail;

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import RegisterNewRequestMobile from './Mobile';
import RegisterNewRequestDesktop from './Desktop';

function RegisterNewRequest(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <RegisterNewRequestMobile {...props} />
      ) : (
        <RegisterNewRequestDesktop {...props} />
      )}
    </>
  );
}

export default RegisterNewRequest;

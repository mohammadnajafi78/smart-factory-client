import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import LoginOTPMobile from './Mobile';
import LoginOTPDesktop from './Desktop';

function LoginOTP(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <LoginOTPMobile {...props} />
      ) : (
        <LoginOTPDesktop {...props} />
      )}
    </>
  );
}

export default LoginOTP;

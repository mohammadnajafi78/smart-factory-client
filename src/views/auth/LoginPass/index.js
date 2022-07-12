import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import LoginPassMobile from './Mobile';
import LoginPassDesktop from './Desktop';

function LoginPass(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <LoginPassMobile {...props} />
      ) : (
        <LoginPassDesktop {...props} />
      )}
    </>
  );
}

export default LoginPass;

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import LoginMobile from './Mobile';
import LoginDesktop from './Desktop';

function Login(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  console.log('props', props);

  return (
    <>
      {mobileDevice ? <LoginMobile {...props} /> : <LoginDesktop {...props} />}
    </>
  );
}

export default Login;

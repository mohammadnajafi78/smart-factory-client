import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ForgotPasswordMobile from './Mobile';
import ForgotPasswordDesktop from './Desktop';

function ForgotPassword(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ForgotPasswordMobile {...props} />
      ) : (
        <ForgotPasswordDesktop {...props} />
      )}
    </>
  );
}

export default ForgotPassword;

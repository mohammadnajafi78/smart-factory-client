import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import EnterPasswordMobile from './Mobile';
import EnterPasswordDesktop from './Desktop';

function EnterPassword(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <EnterPasswordMobile {...props} />
      ) : (
        <EnterPasswordDesktop {...props} />
      )}
    </>
  );
}

export default EnterPassword;

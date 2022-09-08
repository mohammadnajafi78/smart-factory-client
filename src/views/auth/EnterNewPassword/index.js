import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import EnterNewPasswordMobile from './Mobile';
import EnterNewPasswordDesktop from './Desktop';

function EnterNewPassword(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <EnterNewPasswordMobile {...props} />
      ) : (
        <EnterNewPasswordDesktop {...props} />
      )}
    </>
  );
}

export default EnterNewPassword;

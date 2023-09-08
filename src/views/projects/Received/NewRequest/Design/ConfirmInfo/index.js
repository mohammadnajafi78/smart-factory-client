import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ConfirmInfoMobile from './Mobile';
import ConfirmInfoDesktop from './Desktop';

function ConfirmInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <ConfirmInfoMobile {...props} />
      ) : (
        <ConfirmInfoDesktop {...props} />
      )}
    </>
  );
}

export default ConfirmInfo;

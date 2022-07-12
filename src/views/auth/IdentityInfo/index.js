import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import IdentityInfoMobile from './Mobile';
import IdentityInfoDesktop from './Desktop';

function IdentityInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <IdentityInfoMobile {...props} />
      ) : (
        <IdentityInfoDesktop {...props} />
      )}
    </>
  );
}

export default IdentityInfo;

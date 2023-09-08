import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import MoreInfoMobile from './Mobile';
import MoreInfoDesktop from './Desktop';

function MoreInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <MoreInfoMobile {...props} />
      ) : (
        <MoreInfoDesktop {...props} />
      )}
    </>
  );
}

export default MoreInfo;

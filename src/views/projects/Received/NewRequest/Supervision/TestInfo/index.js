import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import TestInfoMobile from './Mobile';
import TestInfoDesktop from './Desktop';

function TestInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <TestInfoMobile {...props} />
      ) : (
        <TestInfoDesktop {...props} />
      )}
    </>
  );
}

export default TestInfo;

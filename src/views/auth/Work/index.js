import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import WorkMobile from './Mobile';
import WorkDesktop from './Desktop';

function Work(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>{mobileDevice ? <WorkMobile {...props} /> : <WorkDesktop {...props} />}</>
  );
}

export default Work;

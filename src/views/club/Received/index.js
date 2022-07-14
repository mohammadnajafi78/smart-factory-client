import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import CompetitionMobile from './Mobile';
import CompetitionDesktop from './Desktop';

function Competition() {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <CompetitionMobile /> : <CompetitionDesktop />}</>;
}

export default Competition;

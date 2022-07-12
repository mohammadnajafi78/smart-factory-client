import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import NewCompetitionMobile from './Mobile';
import NewCompetitionDesktop from './Desktop';

function NewCompetition() {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>{mobileDevice ? <NewCompetitionMobile /> : <NewCompetitionDesktop />}</>
  );
}

export default NewCompetition;

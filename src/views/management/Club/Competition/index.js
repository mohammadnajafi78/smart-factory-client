import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import CompetitionDesktop from './Desktop';
import CompetitionMobile from './Mobile';

function Competition(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  // return <>{mobileDevice ? <CompetitionMobile /> : <CompetitionDesktop />}</>;
  return <CompetitionDesktop {...props} />;
}

export default Competition;

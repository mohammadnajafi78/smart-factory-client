import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import NewCompetitionMobile from './Mobile';
import NewCompetitionDesktop from './Desktop';

function NewCompetition(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <NewCompetitionMobile {...props} />
      ) : (
        <NewCompetitionDesktop {...props} />
      )}
    </>
  );
}

export default NewCompetition;

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import CompetitionDetailsMobile from './Mobile';
import CompetitionDetailsDesktop from './Desktop';

function CompetitionDetails(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <CompetitionDetailsMobile {...props} />
      ) : (
        <CompetitionDetailsDesktop {...props} />
      )}
    </>
  );
}

export default CompetitionDetails;

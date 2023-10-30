import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
// import ReceivedDetailMobile from './Mobile';
import ReceivedDetailDesktop from './Desktop/Index';

function ReceivedDetails(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        {
          /* <ReceivedDetailMobile {...props} /> */
        }
      ) : (
        <ReceivedDetailDesktop {...props} />
      )}
    </>
  );
}

export default ReceivedDetails;

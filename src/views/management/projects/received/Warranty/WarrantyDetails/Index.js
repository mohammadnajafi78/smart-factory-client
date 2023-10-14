import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
// import ReceivedDetailMobile from './Mobile';
import ReceivedWarrantyDetailDesktop from './Desktop/Index';

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
        <ReceivedWarrantyDetailDesktop {...props} />
      )}
    </>
  );
}

export default ReceivedDetails;

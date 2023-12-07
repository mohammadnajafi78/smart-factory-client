import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
// import ReceivedDetailMobile from './Mobile';
import CourseDetails from './desktop/Index';

function ReceivedDetails(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        {
          /* <CourseDetails {...props} /> */
        }
      ) : (
        <CourseDetails {...props} />
      )}
    </>
  );
}

export default ReceivedDetails;

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
// import ReceivedDetailMobile from './Mobile';
import ExamDetails from './desktop/Index';

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
        <ExamDetails {...props} />
      )}
    </>
  );
}

export default ReceivedDetails;
